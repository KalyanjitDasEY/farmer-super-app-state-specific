#!/usr/bin/env bash
set -Eeuo pipefail

APP_NAME="${APP_NAME:-raj-kisan-suvidha}"
APP_DIR="${APP_DIR:-$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)}"
DEPLOY_DIR="${DEPLOY_DIR:-/var/www/raj-kisan-suvidha}"
APP_HOST="${APP_HOST:-127.0.0.1}"
PORT="${PORT:-3001}"
HEALTH_PATH="${HEALTH_PATH:-/raj-kisan-suvidha/}"
CLEAN_SOURCE_AFTER_DEPLOY="${CLEAN_SOURCE_AFTER_DEPLOY:-true}"
SOURCE_CLEANUP_DIR="/root/raj-farmer-app"
STAGING_DIR="${DEPLOY_DIR}.staging.$$"
BACKUP_DIR="${DEPLOY_DIR}.previous"
DEPLOY_SWAPPED=false

log() {
	printf '\n[%s] %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*"
}

assert_safe_directory() {
	local directory="$1"

	if [[ "$directory" != /* || "$directory" == "/" ]]; then
		printf 'Unsafe deployment directory: %s\n' "$directory" >&2
		exit 1
	fi
}

cleanup_source_directory() {
	if [[ "$CLEAN_SOURCE_AFTER_DEPLOY" == false ]]; then
		log "Source cleanup is disabled"
		return
	fi

	local source_directory
	local cleanup_directory
	local deployment_directory
	local home_directory="${HOME:-}"

	source_directory="$(realpath -e -- "$APP_DIR")"
	cleanup_directory="$(realpath -m -- "$SOURCE_CLEANUP_DIR")"
	deployment_directory="$(realpath -m -- "$DEPLOY_DIR")"

	assert_safe_directory "$source_directory"
	assert_safe_directory "$cleanup_directory"

	if [[ "$source_directory" != "$cleanup_directory" ]]; then
		printf 'Refusing source cleanup: APP_DIR resolves to %s, expected %s\n' \
			"$source_directory" "$cleanup_directory" >&2
		exit 1
	fi

	if [[ "$source_directory" == "/root" ||
		(-n "$home_directory" && "$source_directory" == "$home_directory") ]]; then
		printf 'Refusing source cleanup of protected directory: %s\n' \
			"$source_directory" >&2
		exit 1
	fi

	if [[ "$deployment_directory" == "$source_directory" ||
		"$deployment_directory" == "$source_directory/"* ]]; then
		printf 'Refusing source cleanup because DEPLOY_DIR is inside APP_DIR: %s\n' \
			"$deployment_directory" >&2
		exit 1
	fi

	log "Removing deployment source files from ${source_directory}"
	cd /
	find "$source_directory" -mindepth 1 -maxdepth 1 -exec rm -rf -- {} +
	printf 'Source cleanup completed: %s\n' "$source_directory"
}

start_or_restart_app() {
	cd "$DEPLOY_DIR"

	if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
		HOSTNAME="$APP_HOST" PORT="$PORT" NODE_ENV=production \
			pm2 restart "$APP_NAME" --update-env
	else
		HOSTNAME="$APP_HOST" PORT="$PORT" NODE_ENV=production \
			pm2 start server.js --name "$APP_NAME" --cwd "$DEPLOY_DIR"
	fi
}

rollback() {
	local exit_code="${1:-1}"

	trap - ERR INT TERM
	set +e
	rm -rf -- "$STAGING_DIR"

	if [[ "$DEPLOY_SWAPPED" == true && -d "$BACKUP_DIR" ]]; then
		log "Deployment failed; restoring the previous release"
		rm -rf -- "$DEPLOY_DIR"
		mv -- "$BACKUP_DIR" "$DEPLOY_DIR"
		start_or_restart_app
		pm2 save
	fi

	exit "$exit_code"
}

trap 'rollback $?' ERR
trap 'rollback 130' INT TERM

assert_safe_directory "$DEPLOY_DIR"
assert_safe_directory "$STAGING_DIR"
assert_safe_directory "$BACKUP_DIR"

if [[ "$HEALTH_PATH" != /* ]]; then
	printf 'HEALTH_PATH must start with a slash: %s\n' "$HEALTH_PATH" >&2
	exit 1
fi

if [[ "$CLEAN_SOURCE_AFTER_DEPLOY" != true &&
	"$CLEAN_SOURCE_AFTER_DEPLOY" != false ]]; then
	printf 'CLEAN_SOURCE_AFTER_DEPLOY must be true or false: %s\n' \
		"$CLEAN_SOURCE_AFTER_DEPLOY" >&2
	exit 1
fi

for command in npm node pm2 curl find realpath; do
	command -v "$command" >/dev/null || {
		printf 'Required command not found: %s\n' "$command" >&2
		exit 1
	}
done

log "Installing dependencies"
cd "$APP_DIR"
npm ci

log "Building the standalone application"
npm run build

test -f .next/standalone/server.js
test -d .next/static
test -d public

log "Staging the release"
rm -rf -- "$STAGING_DIR"
mkdir -p "$STAGING_DIR/.next"
cp -a .next/standalone/. "$STAGING_DIR/"
cp -a .next/static "$STAGING_DIR/.next/"
cp -a public "$STAGING_DIR/"

if [[ -f .env.production ]]; then
	cp -a .env.production "$STAGING_DIR/"
fi

test -f "$STAGING_DIR/server.js"

log "Activating the release"
rm -rf -- "$BACKUP_DIR"
if [[ -d "$DEPLOY_DIR" ]]; then
	mv -- "$DEPLOY_DIR" "$BACKUP_DIR"
fi
mv -- "$STAGING_DIR" "$DEPLOY_DIR"
DEPLOY_SWAPPED=true

log "Starting the PM2 application on ${APP_HOST}:${PORT}"
start_or_restart_app

log "Checking application health"
for attempt in {1..15}; do
	if curl --fail --silent --show-error --max-time 10 \
		"http://${APP_HOST}:${PORT}${HEALTH_PATH}" >/dev/null; then
		pm2 save
		rm -rf -- "$BACKUP_DIR"
		DEPLOY_SWAPPED=false
		trap - ERR INT TERM
		log "Deployment completed successfully"
		cleanup_source_directory
		exit 0
	fi

	if [[ "$attempt" -lt 15 ]]; then
		sleep 2
	fi
done

printf 'Health check failed: http://%s:%s%s\n' \
	"$APP_HOST" "$PORT" "$HEALTH_PATH" >&2
false
