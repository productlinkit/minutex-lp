"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";

// Dynamically import a LOCAL wrapper (not the package path directly) so webpack
// code-splits the heavy Spline runtime out of the initial bundle.
const SplineInner = dynamic(() => import("./spline-inner"), {
  ssr: false,
  loading: () => <Spinner />,
});

function Spinner() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-brand/30 border-t-brand" />
    </div>
  );
}

/** Falls back gracefully (e.g. when WebGL is unavailable) instead of crashing. */
class SplineBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    /* swallow — the gradient backdrop is shown instead */
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function SplineDevice({ className }: { className?: string }) {
  return (
    <SplineBoundary fallback={null}>
      <SplineInner
        scene="https://prod.spline.design/qi0HJUmDijmJFzTC/scene.splinecode"
        className={className}
        zoom={3.2}
      />
    </SplineBoundary>
  );
}
