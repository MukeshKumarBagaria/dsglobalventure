import type { CSSProperties } from "react";
import { processSteps } from "@/content/company";

/**
 * Five-step sourcing process. As the section scrolls, the line fills with a glowing head on its tip and each step
 * lights up when the line reaches it (CSS scroll-driven animations — see "Process timeline" in globals.css; no
 * JavaScript). `data-draw` only asks the boot script to mark the track `.is-in`, which plays a time-based version
 * in browsers without scroll-driven animations.
 */
export function ProcessTimeline() {
  return (
    <div className="process-track relative" data-draw="">
      <div aria-hidden className="absolute top-[27px] right-[10%] left-[10%] hidden h-0.5 rounded-full bg-line lg:block">
        <div className="process-fill-x h-full origin-left rounded-full bg-gradient-to-r from-brand-400 to-brand-600" />
        <div className="process-head-x absolute inset-0" />
      </div>
      <div aria-hidden className="absolute top-2 bottom-2 left-[27px] w-0.5 rounded-full bg-line lg:hidden">
        <div className="process-fill-y h-full w-full origin-top rounded-full bg-gradient-to-b from-brand-400 to-brand-600" />
        <div className="process-head-y absolute inset-0" />
      </div>

      <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
        {processSteps.map((s, i) => (
          <li
            key={s.step}
            className="relative flex gap-6 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
            style={{ "--i": i } as CSSProperties}
          >
            <span className="process-node relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-brand-600 bg-brand-600 font-mono text-sm font-semibold text-white shadow-[0_0_0_6px_rgb(47_125_237/0.15)]">
              {s.step}
            </span>
            <div className="process-copy lg:mt-7 lg:px-2">
              <h3 className="text-lg font-bold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
