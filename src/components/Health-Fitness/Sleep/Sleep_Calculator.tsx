"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "../shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "../shared/CalculatorTwoPanel";
import { CustomSelect } from "../shared/CustomSelect";
import { FormError } from "../shared/StandardFormRows";

const CYCLE_MIN = 90;
const FALL_ASLEEP_MIN = 15;

type Mode = "wake" | "bed";

function parseTime(hhmm: string): { h: number; m: number } | null {
  const [a, b] = hhmm.split(":").map(Number);
  if (Number.isNaN(a) || Number.isNaN(b)) return null;
  if (a < 0 || a > 23 || b < 0 || b > 59) return null;
  return { h: a, m: b };
}

function addMinutes(d: Date, min: number) {
  return new Date(d.getTime() + min * 60 * 1000);
}

function subMinutes(d: Date, min: number) {
  return new Date(d.getTime() - min * 60 * 1000);
}

function fmtTime(d: Date) {
  return d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function Sleep_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>("wake");
  const [time, setTime] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [lines, setLines] = useState<string[] | null>(null);

  const run = () => {
    setError(null);
    const t = parseTime(time);
    if (!t) {
      setError("Use 24h time like 07:30 or 22:00.");
      setLines(null);
      return;
    }
    const base = new Date();
    base.setHours(t.h, t.m, 0, 0);

    const out: string[] = [];
    if (mode === "wake") {
      const wake = base;
      for (let n = 4; n <= 6; n++) {
        const totalSleepMin = n * CYCLE_MIN + FALL_ASLEEP_MIN;
        const bed = subMinutes(wake, totalSleepMin);
        out.push(
          `${fmtTime(bed)} — about ${n} sleep cycles (${(n * CYCLE_MIN) / 60} h sleep + ${FALL_ASLEEP_MIN} min to fall asleep)`,
        );
      }
    } else {
      const bed = base;
      for (let n = 4; n <= 6; n++) {
        const wake = addMinutes(bed, n * CYCLE_MIN + FALL_ASLEEP_MIN);
        out.push(
          `${fmtTime(wake)} — ${n} full cycles (${(n * CYCLE_MIN) / 60} h) after lying down`,
        );
      }
    }
    setLines(out);
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[12px] leading-snug text-[#64748b]">
        Uses ~{CYCLE_MIN} min sleep cycles and ~{FALL_ASLEEP_MIN} min to fall
        asleep — illustrative only.
      </p>
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          I know my…
        </p>
        <CustomSelect<Mode>
          id="sleep-mode"
          value={mode}
          onChange={setMode}
          options={[
            { value: "wake", label: "Wake-up time (find bedtime)" },
            { value: "bed", label: "Bedtime (find wake times)" },
          ]}
        />
      </div>
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Time
        </p>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="min-h-[44px] w-full max-w-[10rem] rounded border border-[#E0E0E0] bg-white px-3 text-[14px] outline-none focus:border-[#2374ac] focus:ring-2 focus:ring-[#2374ac]/30 sm:min-h-10"
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Suggest sleep times
      </button>
    </div>
  );

  const result =
    lines != null ? (
      <ul className="max-w-[18rem] space-y-2 text-left text-[12px] leading-snug text-[#334155] sm:text-[13px]">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Aligns with 90-minute sleep cycles; everyone&apos;s architecture
        differs.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
