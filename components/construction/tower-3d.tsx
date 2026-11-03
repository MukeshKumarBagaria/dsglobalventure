import type { CSSProperties } from "react";

type Box = { w: number; d: number; h: number; kind: "podium" | "glass" | "crown" };

/** Bottom-up: stone podium, five wide two-storey modules, a setback, four slimmer ones, a brass crown. Units are em. */
const BOXES: Box[] = [
  { w: 17, d: 17, h: 1.4, kind: "podium" },
  ...Array.from({ length: 5 }, () => ({ w: 12, d: 12, h: 3.6, kind: "glass" as const })),
  ...Array.from({ length: 4 }, () => ({ w: 9.6, d: 9.6, h: 3.6, kind: "glass" as const })),
  { w: 7, d: 7, h: 3.4, kind: "crown" },
];

const stacked = BOXES.reduce<(Box & { y: number })[]>((acc, b) => {
  const prev = acc.at(-1);
  return [...acc, { ...b, y: prev ? prev.y + prev.h : 0 }];
}, []);

const vars = (v: Record<string, number | string>) => v as CSSProperties;

/**
 * CSS-3D tower and crane for the DS Construction hero — real 3D transforms, no WebGL or library.
 * Floors drop into place bottom-up once the scene is in view, then it turns slowly; all motion is
 * transform/opacity on the compositor and stops for reduced motion. Styles: `.dsc-scene` in construction.css.
 */
export function Tower3D() {
  return (
    // data-draw: the boot script marks it .is-in when it scrolls into view, which starts the build-up
    <div aria-hidden data-draw="" className="dsc-scene">
      <div className="dsc-glow" />
      <div className="dsc-tilt">
        <div className="dsc-world">
          <div className="dsc-ground" />
          {stacked.map((b, i) => (
            <div
              key={i}
              className={`dsc-box dsc-box-${b.kind}`}
              style={vars({ "--w": b.w, "--d": b.d, "--h": b.h, "--y": b.y, "--i": i })}
            >
              <i className="dsc-face dsc-front" />
              <i className="dsc-face dsc-back" />
              <i className="dsc-face dsc-side dsc-right" />
              <i className="dsc-face dsc-side dsc-left" />
              {i === stacked.length - 1 || b.kind === "podium" ? <i className="dsc-face dsc-top" /> : null}
            </div>
          ))}

          <div className="dsc-crane">
            <i className="dsc-mast" />
            <i className="dsc-mast dsc-mast-side" />
            <div className="dsc-jib">
              <i className="dsc-jib-arm" />
              <i className="dsc-jib-arm dsc-jib-arm-side" />
              <i className="dsc-cable" />
              <i className="dsc-load" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
