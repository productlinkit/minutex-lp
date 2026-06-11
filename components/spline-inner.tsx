"use client";

import Spline from "@splinetool/react-spline/next";

export default function SplineInner({
  scene,
  className,
}: {
  scene: string;
  className?: string;
}) {
  return <Spline scene={scene} className={className} />;
}
