import type { SectorIcon as Kind } from "@/content/construction";

/** Gold line drawings for the three client sectors — colour from `currentColor`; thicken the stroke when drawn small. */
export function SectorIcon({ kind, className = "size-14", strokeWidth = 1.3 }: { kind: Kind; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} aria-hidden>
      {kind === "civic" ? (
        <>
          <path d="M6 22 32 8l26 14H6Z" />
          <path d="M9 26h46M9 52h46M5 57h54" />
          {[14, 25, 39, 50].map((x) => (
            <path key={x} d={`M${x} 29v20M${x + 3} 29v20`} />
          ))}
        </>
      ) : kind === "residence" ? (
        <>
          <path d="M6 30 32 10l26 20" />
          <path d="M12 26v28h40V26" />
          <path d="M27 54V40h10v14" />
          <path d="M17 34h7v6h-7zM40 34h7v6h-7z" />
          <path d="M44 16v-6h6v11" />
        </>
      ) : (
        <>
          <path d="M20 58V12l14-6 10 6v46" />
          <path d="M34 6v52M14 58h36" />
          {[18, 26, 34, 42, 50].map((y) => (
            <path key={y} d={`M24 ${y}h6M38 ${y}h3`} />
          ))}
        </>
      )}
    </svg>
  );
}
