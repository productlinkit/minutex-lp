import { cn } from "@/lib/utils";

export function PhoneFrame({
  children,
  className,
  screenClassName,
}: {
  children: React.ReactNode;
  className?: string;
  screenClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-[268px] rounded-[2.6rem] bg-gradient-to-b from-white to-[#e8eef7] p-[10px] shadow-phone",
        className
      )}
    >
      <div className="absolute inset-0 rounded-[2.6rem] ring-1 ring-black/5" />
      <div
        className={cn(
          "relative aspect-[9/19.2] overflow-hidden rounded-[2.05rem] bg-white",
          screenClassName
        )}
      >
        {/* dynamic island */}
        <div className="absolute left-1/2 top-2.5 z-20 h-6 w-[88px] -translate-x-1/2 rounded-full bg-ink/90" />
        {children}
      </div>
    </div>
  );
}
