import type { CSSProperties } from "react";

export function LoadingDots({
  className,
  dotClassName,
  sizeClassName = "h-1.5 w-1.5",
  style,
}: {
  className?: string;
  dotClassName?: string;
  sizeClassName?: string;
  style?: CSSProperties;
}) {
  const dotStyle = { backgroundColor: "currentColor" } satisfies CSSProperties;

  return (
    <span
      className={["inline-flex items-center gap-1", className].filter(Boolean).join(" ")}
      style={style}
      aria-hidden="true"
    >
      <span
        className={["inline-block rounded-full opacity-70", sizeClassName, dotClassName]
          .filter(Boolean)
          .join(" ")}
        style={{
          ...dotStyle,
          animation: "medichat-bounce 1.2s infinite",
          animationDelay: "0ms",
        }}
      />
      <span
        className={["inline-block rounded-full opacity-70", sizeClassName, dotClassName]
          .filter(Boolean)
          .join(" ")}
        style={{
          ...dotStyle,
          animation: "medichat-bounce 1.2s infinite",
          animationDelay: "150ms",
        }}
      />
      <span
        className={["inline-block rounded-full opacity-70", sizeClassName, dotClassName]
          .filter(Boolean)
          .join(" ")}
        style={{
          ...dotStyle,
          animation: "medichat-bounce 1.2s infinite",
          animationDelay: "300ms",
        }}
      />
    </span>
  );
}


