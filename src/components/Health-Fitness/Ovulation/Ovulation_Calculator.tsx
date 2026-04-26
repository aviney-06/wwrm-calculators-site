"use client";

import { useState } from "react";
import { btnCalculate, fieldBase } from "../shared/calculatorStyles";
import { FormError } from "../shared/StandardFormRows";

function addDays(d: Date, days: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

function fmt(d: Date) {
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

/** Ovulation ~14 days before next period → LMP + (cycle − 14) */
export function Ovulation_Calculator() {
  const [lmp, setLmp] = useState("");
  const [cycle, setCycle] = useState("28");
  const [error, setError] = useState<string | null>(null);
  const [ovulationStart, setOvulationStart] = useState<Date | null>(null);
  const [ovulationEnd, setOvulationEnd] = useState<Date | null>(null);
  const [fertileStart, setFertileStart] = useState<Date | null>(null);
  const [fertileEnd, setFertileEnd] = useState<Date | null>(null);

  const run = () => {
    setError(null);
    if (!lmp) {
      setError("Select LMP date.");
      setOvulationStart(null);
      setOvulationEnd(null);
      setFertileStart(null);
      setFertileEnd(null);
      return;
    }
    const c = parseInt(cycle, 10);
    if (Number.isNaN(c) || c < 21 || c > 45) {
      setError("Cycle length 21–45 days.");
      setOvulationStart(null);
      setOvulationEnd(null);
      setFertileStart(null);
      setFertileEnd(null);
      return;
    }
    const start = new Date(lmp + "T12:00:00");
    if (Number.isNaN(start.getTime())) {
      setError("Invalid date.");
      setOvulationStart(null);
      setOvulationEnd(null);
      setFertileStart(null);
      setFertileEnd(null);
      return;
    }
    const ov = addDays(start, c - 14);
    setOvulationStart(ov);
    setOvulationEnd(addDays(ov, 1));
    setFertileStart(addDays(ov, -4));
    setFertileEnd(addDays(ov, 2));
  };

  const hasResult =
    ovulationStart != null &&
    ovulationEnd != null &&
    fertileStart != null &&
    fertileEnd != null;

  return (
    <div className="w-full">
      <div className="grid gap-5 md:grid-cols-2 md:gap-8">
        <section className="rounded-lg border border-neutral-3 bg-neutral-2 p-5 sm:p-6 md:p-10">
          <div className="mb-8 flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] text-neutral-2">
              ✿
            </span>
            <h2 className="text-4xl font-semibold text-neutral-1">Parameters</h2>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="ov-lmp"
                className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-1/75"
              >
                First Day of Last Period (LMP)
              </label>
              <input
                id="ov-lmp"
                type="date"
                value={lmp}
                onChange={(e) => setLmp(e.target.value)}
                className={`${fieldBase} w-full`}
              />
            </div>

            <div>
              <label
                htmlFor="ov-cycle"
                className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-1/75"
              >
                Average Cycle Length (Days)
              </label>
              <input
                id="ov-cycle"
                type="number"
                min={21}
                max={45}
                value={cycle}
                onChange={(e) => setCycle(e.target.value)}
                className={`${fieldBase} w-full max-w-[10rem]`}
              />
              <p className="mt-1 text-[11px] italic text-neutral-1/50">
                Typical range: 21-35 days
              </p>
            </div>

            <FormError message={error} />
            <button type="button" className={btnCalculate} onClick={run}>
              Calculate Window
            </button>
          </div>
        </section>

        <section className="rounded-lg border border-neutral-3 bg-neutral-2 p-5 sm:p-6 md:p-10">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-primary">
            Clinical Projection
          </p>

          {hasResult ? (
            <>
              <p className="mt-6 text-[15px] font-semibold text-neutral-1/80">
                Your Next Ovulation
              </p>
              <p className="mt-2 text-2xl font-extrabold leading-none text-neutral-1">
                {fmt(ovulationStart)}-{fmt(ovulationEnd)}
              </p>

              <div className="mt-7 rounded-md border border-neutral-3 bg-neutral-2 p-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-neutral-1">
                    Fertile Window
                  </p>
                  <span className="rounded-full bg-primary-200 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-900">
                    High Chance
                  </span>
                </div>
                <p className="mt-2 text-2xl font-semibold leading-none text-primary">
                  {fmt(fertileStart)}-{fmt(fertileEnd)}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-neutral-1/70">
                  Your peak fertility is expected during this 6-day window based on
                  a {cycle}-day cycle.
                </p>
              </div>

              <div className="mt-8">
                <div className="mb-2 grid grid-cols-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-neutral-1/60">
                  <span>Menstrual</span>
                  <span className="text-center text-primary">Follicular</span>
                  <span className="text-right">Luteal</span>
                </div>
                <div className="relative h-2 overflow-hidden rounded-full bg-neutral-300">
                  <span className="absolute inset-y-0 left-0 w-[22%] bg-[#dcb2b2]" />
                  <span className="absolute inset-y-0 left-[22%] w-[38%] bg-primary" />
                  <span className="absolute inset-y-0 right-0 w-[40%] bg-neutral-400" />
                </div>
                <p className="mt-3 text-center text-[12px] font-medium text-neutral-1/75">
                  <span className="mr-1 text-primary">●</span>
                  Current Phase: Ovulation Impending
                </p>
              </div>
            </>
          ) : (
            <p className="mt-8 max-w-[18rem] text-[13px] leading-relaxed text-neutral-1/65">
              Add your cycle details and calculate to view your projected
              ovulation and fertile window.
            </p>
          )}

          <button
            type="button"
            className="mt-10 inline-flex items-center gap-2 text-xs font-semibold text-secondary hover:underline"
          >
            Detailed Clinical Breakdown
            <span aria-hidden>›</span>
          </button>
        </section>
      </div>

      <p className="mt-5 text-center text-[11px] italic leading-relaxed text-neutral-1/55 sm:mt-8 sm:text-[13px]">
        Clinical Note: This calculator provides estimates based on average
        menstrual cycles. It is not a definitive medical diagnosis or a
        guaranteed form of contraception.
      </p>
    </div>
  );
}
