import { cn } from "@/lib/utils";

/** Decorative blurred clouds layer. Place inside a relatively-positioned parent. */
export function SkyBackdrop({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <span className="cloud" style={{ width: 360, height: 160, left: "4%", top: "12%" }} />
      <span className="cloud" style={{ width: 280, height: 130, left: "62%", top: "6%" }} />
      <span className="cloud" style={{ width: 420, height: 180, left: "30%", top: "40%" }} />
      <span className="cloud" style={{ width: 240, height: 120, left: "78%", top: "52%" }} />
      <span className="cloud" style={{ width: 300, height: 140, left: "-4%", top: "62%" }} />
    </div>
  );
}
