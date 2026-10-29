import { processSteps } from "@/content/company";

/**
 * Five-step sourcing process. A line fills and each step lights up as the section scrolls
 * (CSS scroll-driven animations — see "Process timeline" in globals.css; no JavaScript).
 */
export function ProcessTimeline() {
  return (
    <div className="process-track relative">
      <div aria-hidden className="absolute top-[27px] right-[10%] left-[10%] hidden h-0.5 rounded-full bg-line lg:block">
        <div className="process-fill-x h-full origin-left rounded-full bg-gradient-to-r from-brand-400 to-brand-600" />
      </div>
      <div aria-hidden className="absolute top-2 bottom-2 left-[27px] w-0.5 rounded-full bg-line lg:hidden">
        <div className="process-fill-y h-full w-full origin-top rounded-full bg-gradient-to-b from-brand-400 to-brand-600" />
      </div>

      <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
        {processSteps.map((s) => (
          <li key={s.step} className="relative flex gap-6 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
            <span className="process-node relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-line bg-white font-mono text-sm font-semibold text-body">
              {s.step}
            </span>
            <div className="lg:mt-7 lg:px-2">
              <h3 className="text-lg font-bold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
