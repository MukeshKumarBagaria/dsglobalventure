import type { CSSProperties } from "react";
import worldLand from "@/assets/images/world-land.svg";
import { cn } from "@/lib/utils";

type Point = readonly [number, number];

/** Coordinates share the Miller projection of world-land.svg (1000 × 454 viewBox, latitudes 78°N – 56°S). */
const W = 1000;
const H = 454;
const HUB: Point = [702.5, 225.6]; // west coast of India

/** Decorative trade lanes — `inbound` comets travel towards the hub (sourcing), the rest outwards (supply). */
const ROUTES: { to: Point; inbound?: boolean }[] = [
  { to: [512.5, 120.6] }, // North-west Europe
  { to: [653.1, 208.4], inbound: true }, // Gulf
  { to: [837.5, 189.8], inbound: true }, // East China
  { to: [788.3, 275.7] }, // Singapore Strait
  { to: [586.1, 364.9] }, // Southern Africa
  { to: [235.3, 194.3], inbound: true }, // US Gulf Coast
  { to: [371.4, 347] }, // South-east Brazil
];

/** Land dots that twinkle */
const TWINKLES: Point[] = [
  [776.8, 94.3], [640.3, 224.3], [575.3, 107.3], [588.3, 237.3], [815.8, 204.8], [328.3, 276.3], [191.8, 120.3],
  [731.3, 211.3], [347.8, 341.3], [445.3, 55.3], [477.8, 211.3], [861.3, 328.3], [276.3, 289.3], [601.3, 308.8],
];

/** Spots for the floating tags (sized in cqw so they keep these proportions), clear of the lanes, ports and hub label */
const TAG_SPOTS: Point[] = [[905, 92], [900, 385], [700, 405], [600, 38], [470, 408]];

export type MapTag = { title: string; meta: string };

/** Control point of a quadratic arc from `a` to `b`, bowed upwards in proportion to its length. */
function control([x0, y0]: Point, [x1, y1]: Point): Point {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.hypot(dx, dy);
  const s = dx < 0 ? 1 : -1; // pick the normal that points up the screen
  const lift = Math.min(len * 0.34, 120);
  return [(x0 + x1) / 2 - s * (dy / len) * lift, (y0 + y1) / 2 + s * (dx / len) * lift];
}

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const r1 = (n: number) => +n.toFixed(1);

/**
 * Keyframes that move a comet along the arc using transform only, so the browser runs it on the
 * compositor (stroke-dashoffset animations repaint the SVG on the main thread every frame).
 * Positions use cqw of the map box: 1000 viewBox units = 100cqw.
 */
function cometKeyframes(name: string, from: Point, ctrl: Point, to: Point) {
  const STEPS = 12;
  const TRAVEL = 58; // % of the cycle spent travelling; the rest is a pause
  let frames = "";
  for (let k = 0; k <= STEPS; k++) {
    const t = ease(k / STEPS);
    const u = 1 - t;
    const x = u * u * from[0] + 2 * u * t * ctrl[0] + t * t * to[0];
    const y = u * u * from[1] + 2 * u * t * ctrl[1] + t * t * to[1];
    const angle = (Math.atan2(u * (ctrl[1] - from[1]) + t * (to[1] - ctrl[1]), u * (ctrl[0] - from[0]) + t * (to[0] - ctrl[0])) * 180) / Math.PI;
    const pct = k === STEPS ? `${TRAVEL}%,100%` : `${r1((k / STEPS) * TRAVEL)}%`;
    frames += `${pct}{transform:translate(${r1(x / 10)}cqw,${r1(y / 10)}cqw) rotate(${Math.round(angle)}deg)}`;
  }
  return `@keyframes ${name}{${frames}0%{opacity:0}6%,${TRAVEL - 5}%{opacity:1}${TRAVEL}%,100%{opacity:0}}`;
}

const lanes = ROUTES.map((route, i) => {
  const ctrl = control(HUB, route.to);
  const [from, to] = route.inbound ? [route.to, HUB] : [HUB, route.to];
  return {
    to: route.to,
    d: `M${HUB[0]} ${HUB[1]}Q${r1(ctrl[0])} ${r1(ctrl[1])} ${route.to[0]} ${route.to[1]}`,
    keyframes: cometKeyframes(`map-comet-${i}`, from, ctrl, to),
  };
});
const cometCss = lanes.map((l) => l.keyframes).join("");

const landMask = {
  maskImage: `url(${worldLand.src})`,
  maskSize: "100% 100%",
  WebkitMaskImage: `url(${worldLand.src})`,
  WebkitMaskSize: "100% 100%",
} as CSSProperties;

const at = ([x, y]: Point, extra?: Record<string, string | number>) =>
  ({ left: `${r1(x / 10)}%`, top: `${+((y / H) * 100).toFixed(2)}%`, ...extra }) as CSSProperties;

/**
 * Dotted world map with trade lanes, travelling comets, twinkling land, pulsing ports, rings radiating
 * from the hub and floating tags. Compositor-only motion.
 */
export function WorldMap({ className, hubLabel, tags = [] }: { className?: string; hubLabel?: string; tags?: MapTag[] }) {
  return (
    <div aria-hidden className={cn("pointer-events-none select-none", className)}>
      <style>{cometCss}</style>
      <div className="map-reveal @container relative" style={{ aspectRatio: `${W} / ${H}` }}>
        {/* A dot grid cut to the land by an external, cacheable mask (keeps ~9KB of path data out of the HTML
            and RSC payload; a mask, unlike an <img> or background, is never an LCP candidate). */}
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" style={landMask}>
          <defs>
            <pattern id="map-dot" width="6.5" height="6.5" patternUnits="userSpaceOnUse">
              <circle cx="3.25" cy="3.25" r="1.55" fill="#c4dcff" />
            </pattern>
          </defs>
          <rect width={W} height={H} fill="url(#map-dot)" />
        </svg>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible">
          <defs>
            <radialGradient id="map-hub-glow">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="0.35" stopColor="#8cc4ff" stopOpacity="0.55" />
              <stop offset="1" stopColor="#5b9bf5" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g fill="none" stroke="#9cc8ff" strokeWidth={1.3} strokeOpacity={0.7} strokeLinecap="round">
            {lanes.map((l) => (
              <path key={l.d} d={l.d} />
            ))}
          </g>
          <g fill="#e3eefe">
            {lanes.map((l) => (
              <circle key={l.d} cx={l.to[0]} cy={l.to[1]} r={3.4} />
            ))}
          </g>
          <circle cx={HUB[0]} cy={HUB[1]} r={22} fill="url(#map-hub-glow)" />
          <circle cx={HUB[0]} cy={HUB[1]} r={4.6} fill="#ffffff" />
        </svg>

        {TWINKLES.map((p, i) => (
          <i key={i} className="map-twinkle" style={at(p, { "--d": `${((i * 0.83) % 6).toFixed(2)}s` })} />
        ))}
        {lanes.map((l, i) => (
          <i key={l.d} className="map-ping" style={at(l.to, { "--i": i })} />
        ))}
        {[0, 1, 2].map((i) => (
          <i key={i} className="map-ring" style={at(HUB, { "--i": i })} />
        ))}
        <i className="map-ping map-ping-hub" style={at(HUB)} />
        <i className="map-ping map-ping-hub map-ping-late" style={at(HUB)} />
        {lanes.map((l, i) => (
          <i key={l.d} className="map-comet" style={{ animationName: `map-comet-${i}`, "--i": i } as CSSProperties} />
        ))}

        {hubLabel ? (
          <span
            className="absolute flex translate-x-[-50%] translate-y-2.5 items-center gap-1.5 rounded-full bg-white py-1 pr-2.5 pl-2 font-mono text-[0.58rem] font-semibold tracking-[0.14em] whitespace-nowrap text-ink uppercase shadow-[0_12px_30px_-10px_rgb(4_24_70/0.7)] sm:translate-y-4 sm:gap-2 sm:py-1.5 sm:pr-3.5 sm:pl-2.5 sm:text-[0.68rem] sm:tracking-[0.16em]"
            style={at(HUB)}
          >
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-brand-500 motion-reduce:hidden" />
              <span className="relative size-2 rounded-full bg-brand-600" />
            </span>
            {hubLabel}
          </span>
        ) : null}
        {tags.slice(0, TAG_SPOTS.length).map((t, i) => (
          <span
            key={t.title}
            className="map-tag rounded-[min(0.75rem,1.4cqw)] border border-white/20 bg-[#0c3d93]/85 px-[min(0.75rem,1.4cqw)] py-[min(0.5rem,0.95cqw)] text-center shadow-[0_14px_30px_-14px_rgb(2_16_50/0.9)] max-sm:hidden"
            style={at(TAG_SPOTS[i], { "--i": i })}
          >
            <span className="block font-mono text-[length:min(0.8rem,1.5cqw)] font-semibold whitespace-nowrap text-white">{t.title}</span>
            <span className="mt-0.5 block text-[length:min(0.62rem,1.15cqw)] font-medium tracking-[0.1em] whitespace-nowrap text-brand-200 uppercase">
              {t.meta}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
