import { cn } from "@/lib/utils";

export function RetroGrid({
  className,
  angle = 65,
}: {
  className?: string;
  angle?: number;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden [perspective:200px]",
        className,
      )}
      style={{ "--grid-angle": `${angle}deg`, zIndex: 0 } as React.CSSProperties}
    >
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div
          className={cn(
            "animate-grid",
            "[background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw]",
            "[background-image:linear-gradient(to_right,rgba(26,19,73,0.4)_1px,transparent_0),linear-gradient(to_bottom,rgba(26,19,73,0.4)_1px,transparent_0)]",
            "dark:[background-image:linear-gradient(to_right,rgba(255,200,69,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,200,69,0.3)_1px,transparent_0)]",
          )}
        />
      </div>

      {/* Bottom fade to blend with next section */}
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent to-40%" />
    </div>
  );
}
