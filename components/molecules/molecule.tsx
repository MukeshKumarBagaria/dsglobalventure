import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Atom = { x: number; y: number; label?: string };
type Bond = { a: number; b: number; order?: 1 | 2; inner?: [number, number] };
type Structure = { atoms: Atom[]; bonds: Bond[]; brackets?: { x1: number; x2: number; y1: number; y2: number; sub: string } };

// Ring helper — hexagon centred on (cx, cy)
function ring(cx: number, cy: number, r: number): Atom[] {
  return [-90, -30, 30, 90, 150, 210].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return { x: +(cx + r * Math.cos(rad)).toFixed(1), y: +(cy + r * Math.sin(rad)).toFixed(1) };
  });
}

const phenolRing = ring(120, 122, 46);

/** Skeletal structures, viewBox 0 0 240 200 */
const structures: Record<string, Structure> = {
  phenol: {
    atoms: [...phenolRing, { x: 120, y: 34, label: "OH" }],
    bonds: [
      { a: 0, b: 1 },
      { a: 1, b: 2, order: 2, inner: [120, 122] },
      { a: 2, b: 3 },
      { a: 3, b: 4, order: 2, inner: [120, 122] },
      { a: 4, b: 5 },
      { a: 5, b: 0, order: 2, inner: [120, 122] },
      { a: 0, b: 6 },
    ],
  },
  formaldehyde: {
    atoms: [
      { x: 110, y: 100, label: "C" },
      { x: 182, y: 100, label: "O" },
      { x: 66, y: 60, label: "H" },
      { x: 66, y: 140, label: "H" },
    ],
    bonds: [
      { a: 0, b: 1, order: 2 },
      { a: 0, b: 2 },
      { a: 0, b: 3 },
    ],
  },
  methanol: {
    atoms: [
      { x: 98, y: 100, label: "C" },
      { x: 160, y: 100, label: "O" },
      { x: 196, y: 134, label: "H" },
      { x: 50, y: 100, label: "H" },
      { x: 98, y: 52, label: "H" },
      { x: 98, y: 148, label: "H" },
    ],
    bonds: [
      { a: 0, b: 1 },
      { a: 1, b: 2 },
      { a: 0, b: 3 },
      { a: 0, b: 4 },
      { a: 0, b: 5 },
    ],
  },
  acetone: {
    atoms: [
      { x: 120, y: 118 },
      { x: 120, y: 48, label: "O" },
      { x: 62, y: 152, label: "CH₃" },
      { x: 178, y: 152, label: "CH₃" },
    ],
    bonds: [
      { a: 0, b: 1, order: 2 },
      { a: 0, b: 2 },
      { a: 0, b: 3 },
    ],
  },
  paraformaldehyde: {
    atoms: [
      { x: 30, y: 118, label: "HO" },
      { x: 82, y: 88 },
      { x: 128, y: 118, label: "O" },
      { x: 210, y: 92, label: "H" },
    ],
    bonds: [
      { a: 0, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 3 },
    ],
    brackets: { x1: 58, x2: 160, y1: 60, y2: 148, sub: "n" },
  },
  other: {
    atoms: [...ring(92, 100, 34), ...ring(151, 100, 34).slice(0, 4)],
    bonds: [
      { a: 0, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 3 },
      { a: 3, b: 4 },
      { a: 4, b: 5 },
      { a: 5, b: 0 },
      { a: 1, b: 6 },
      { a: 6, b: 7 },
      { a: 7, b: 8 },
      { a: 8, b: 9 },
      { a: 9, b: 2 },
    ],
  },
};

function bondLines(s: Structure, bond: Bond) {
  const p = s.atoms[bond.a];
  const q = s.atoms[bond.b];
  // shorten line ends that touch a labelled atom
  const trim = (from: Atom, to: Atom) => {
    if (!from.label) return { x: from.x, y: from.y };
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.hypot(dx, dy);
    const t = (from.label.length > 1 ? 19 : 14) / len;
    return { x: from.x + dx * t, y: from.y + dy * t };
  };
  const start = trim(p, q);
  const end = trim(q, p);
  const lines = [] as { x1: number; y1: number; x2: number; y2: number }[];

  if (bond.order === 2 && bond.inner) {
    lines.push({ x1: start.x, y1: start.y, x2: end.x, y2: end.y });
    const [cx, cy] = bond.inner;
    const f = 0.76;
    const s1 = { x: cx + (start.x - cx) * f, y: cy + (start.y - cy) * f };
    const e1 = { x: cx + (end.x - cx) * f, y: cy + (end.y - cy) * f };
    // shrink the inner line slightly for an elegant aromatic look
    const mx = (s1.x + e1.x) / 2;
    const my = (s1.y + e1.y) / 2;
    lines.push({
      x1: mx + (s1.x - mx) * 0.8,
      y1: my + (s1.y - my) * 0.8,
      x2: mx + (e1.x - mx) * 0.8,
      y2: my + (e1.y - my) * 0.8,
    });
  } else if (bond.order === 2) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const len = Math.hypot(dx, dy);
    const nx = (-dy / len) * 4.5;
    const ny = (dx / len) * 4.5;
    lines.push({ x1: start.x + nx, y1: start.y + ny, x2: end.x + nx, y2: end.y + ny });
    lines.push({ x1: start.x - nx, y1: start.y - ny, x2: end.x - nx, y2: end.y - ny });
  } else {
    lines.push({ x1: start.x, y1: start.y, x2: end.x, y2: end.y });
  }
  return lines;
}

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

/** Skeletal chemical structure. Bonds draw in via CSS when scrolled into view (no JS). */
export function Molecule({
  name,
  tone = "light",
  className,
  animate = true,
  title,
}: {
  name: string;
  tone?: "dark" | "light";
  className?: string;
  animate?: boolean;
  title?: string;
}) {
  const s = structures[name] ?? structures.other;
  const stroke = tone === "dark" ? "var(--color-brand-300)" : "var(--color-brand-600)";
  const text = tone === "dark" ? "#ffffff" : "var(--color-ink)";
  const atomFill = "#ffffff";
  const lines = s.bonds.flatMap((b) => bondLines(s, b));

  return (
    <svg
      viewBox="0 0 240 200"
      className={cn("h-auto w-full overflow-visible", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      {...(animate ? { "data-draw": "" } : {})}
    >
      {lines.map((l, i) => (
        <line
          key={i}
          className="bond"
          pathLength={1}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke={stroke}
          strokeWidth={2.2}
          strokeLinecap="round"
          style={delay(0.1 + i * 0.08)}
        />
      ))}

      {s.brackets ? (
        <g className="atom" style={delay(0.8)} stroke={stroke} strokeWidth={2} fill="none" strokeLinecap="round">
          <path d={`M${s.brackets.x1 + 8} ${s.brackets.y1} H${s.brackets.x1} V${s.brackets.y2} H${s.brackets.x1 + 8}`} />
          <path d={`M${s.brackets.x2 - 8} ${s.brackets.y1} H${s.brackets.x2} V${s.brackets.y2} H${s.brackets.x2 - 8}`} />
          <text
            x={s.brackets.x2 + 6}
            y={s.brackets.y2 + 6}
            fill={text}
            stroke="none"
            fontSize={16}
            fontStyle="italic"
            fontFamily="var(--font-mono)"
          >
            {s.brackets.sub}
          </text>
        </g>
      ) : null}

      {s.atoms.map((atom, i) =>
        atom.label ? (
          <g key={i} className="atom" style={delay(0.45 + i * 0.06)}>
            <circle cx={atom.x} cy={atom.y} r={atom.label.length > 1 ? 18 : 13} fill={atomFill} stroke={stroke} strokeWidth={1.4} />
            <text
              x={atom.x}
              y={atom.y}
              fill={text}
              fontSize={atom.label.length > 2 ? 11 : 13}
              fontWeight={600}
              fontFamily="var(--font-mono)"
              textAnchor="middle"
              dominantBaseline="central"
            >
              {atom.label}
            </text>
          </g>
        ) : (
          <circle key={i} className="atom" cx={atom.x} cy={atom.y} r={3.4} fill={stroke} style={delay(0.35 + i * 0.05)} />
        ),
      )}
    </svg>
  );
}
