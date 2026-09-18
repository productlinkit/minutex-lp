"use client";

import Spline from "@splinetool/react-spline/next";
import type { Application } from "@splinetool/runtime";

export default function SplineInner({
  scene,
  className,
  zoom,
  onReady,
}: {
  scene: string;
  className?: string;
  /** Camera zoom: 1 = base, < 1 zooms out so more of the device is visible. */
  zoom?: number;
  /** Runs once the scene has loaded, before the first redraw. */
  onReady?: (app: Application) => void;
}) {
  return (
    <Spline
      scene={scene}
      className={className}
      onLoad={(app: Application) => {
        if (zoom) app.setZoom(zoom);
        onReady?.(app);

        // Remove the "Built with Spline" watermark. It isn't a DOM node — the
        // runtime paints it into the WebGL canvas via a "logo overlay" render
        // pass — so CSS can't hide it. We disable that pass directly, then
        // force a redraw because the scene renders on demand. Wrapped in
        // try/catch since this touches Spline's internal renderer API.
        try {
          const internal = app as unknown as {
            _renderer?: { pipeline?: { setWatermark?: (t: unknown) => void } };
            requestRender?: () => void;
          };
          internal._renderer?.pipeline?.setWatermark?.(null);
          internal.requestRender?.();
        } catch {
          /* internal API unavailable on this Spline version — ignore */
        }
      }}
    />
  );
}
