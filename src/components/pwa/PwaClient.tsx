"use client";

import { Download, RefreshCw, X } from "lucide-react";
import { useEffect, useState } from "react";

import { appBasePath, withBasePath } from "@/config/base-path";
import type { Dictionary } from "@/i18n/dictionaries";
import styles from "@/styles/application.module.css";

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaClient({ dictionary }: { dictionary: Dictionary }) {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(
    null,
  );
  const [updateReady, setUpdateReady] = useState<ServiceWorker | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    if (process.env.NODE_ENV !== "production") {
      const clearDevelopmentCaches = async () => {
        const scope = new URL(`${appBasePath || ""}/`, window.location.origin)
          .href;
        const registrations = await navigator.serviceWorker.getRegistrations();
        const unregisterResults = await Promise.all(
          registrations
            .filter((registration) => registration.scope.startsWith(scope))
            .map((registration) => registration.unregister()),
        );
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames
            .filter(
              (cacheName) =>
                cacheName.startsWith("raj-kisan-") ||
                cacheName.startsWith("bihar-kisan-"),
            )
            .map((cacheName) => caches.delete(cacheName)),
        );

        if (
          navigator.serviceWorker.controller &&
          unregisterResults.some(Boolean)
        ) {
          window.location.reload();
        }
      };

      void clearDevelopmentCaches().catch((error: unknown) => {
        console.error("Failed to clear development PWA caches.", error);
      });
      return;
    }

    let registration: ServiceWorkerRegistration | undefined;
    const register = async () => {
      registration = await navigator.serviceWorker.register(
        withBasePath("/sw.js"),
        { scope: `${appBasePath || ""}/` },
      );
      if (registration.waiting) setUpdateReady(registration.waiting);
      registration.addEventListener("updatefound", () => {
        const worker = registration?.installing;
        worker?.addEventListener("statechange", () => {
          if (
            worker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            setUpdateReady(worker);
          }
        });
      });
    };

    const onInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onInstallPrompt);
    void register().catch((error: unknown) => {
      console.error("Failed to register the service worker.", error);
    });
    return () =>
      window.removeEventListener("beforeinstallprompt", onInstallPrompt);
  }, []);

  if (dismissed || (!installPrompt && !updateReady)) return null;

  const install = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  const update = () => {
    if (!updateReady) return;
    updateReady.postMessage({ type: "SKIP_WAITING" });
    window.location.reload();
  };

  return (
    <aside className={styles.pwaPrompt} aria-live="polite">
      <button
        className={styles.iconButton}
        type="button"
        onClick={() => setDismissed(true)}
        aria-label={dictionary["common.close"]}
      >
        <X size={18} />
      </button>
      <strong>
        {updateReady ? dictionary["pwa.update"] : dictionary["pwa.installHint"]}
      </strong>
      <button
        className={styles.button}
        type="button"
        onClick={updateReady ? update : install}
      >
        {updateReady ? <RefreshCw size={18} /> : <Download size={18} />}
        {updateReady ? dictionary["pwa.reload"] : dictionary["pwa.install"]}
      </button>
    </aside>
  );
}
