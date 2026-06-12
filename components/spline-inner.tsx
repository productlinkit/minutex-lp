"use client";

import Spline from "@splinetool/react-spline/next";
import type { Application } from "@splinetool/runtime";

export default function SplineInner({
  scene,
  className,
  zoom,
}: {
  scene: string;
  className?: string;
  /** Camera zoom: 1 = base, < 1 zooms out so more of the device is visible. */
  zoom?: number;
}) {
  return (
    <Spline
      scene={scene}
      className={className}
      onLoad={(app: Application) => {
        if (zoom) app.setZoom(zoom);
      }}
    />
  );
}
