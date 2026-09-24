import Image, { type ImageProps } from "next/image";

import { withBasePath } from "@/config/base-path";

export function ServiceImage(props: ImageProps) {
  const src =
    typeof props.src === "string" ? withBasePath(props.src) : props.src;

  return <Image {...props} src={src} alt={props.alt} />;
}
