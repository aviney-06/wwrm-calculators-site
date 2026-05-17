"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum, parseNumberList, statsFromList } from "@/components/Maths/shared/mathUtils";

export function MeanMedianMode_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [raw, setRaw] = useState("3, 7, 7, 9, 15");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{ mean: string; median: string; mode: string } | null>(null);

  const run = () => {
    setError(null);
    const vals = parseNumberList(raw);
    if (vals.length === 0) {
      setError("Enter at least one number.");
      setOut(null);
      return;
    }
    const s = statsFromList(vals);
    const modeStr = s.mode.length ? s.mode.map((m) => formatNum(m)).join(", ") : "none";
    setOut({ mean: formatNum(s.mean), median: formatNum(s.median), mode: modeStr });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Numbers</p>
        <textarea
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          rows={4}
          className="w-full rounded border border-[#E0E0E0] bg-white px-3 py-2 text-[14px] text-[#334155] outline-none focus:border-[#2374ac] focus:ring-1 focus:ring-[#2374ac]"
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>Calculate</button>
    </div>
  );

  const result = out != null ? (
    <div className="w-full max-w-[14rem] space-y-2 text-[13px] text-[#334155]">
      <p><span className="font-semibold">Mean:</span> {out.mean}</p>
      <p><span className="font-semibold">Median:</span> {out.median}</p>
      <p><span className="font-semibold">Mode:</span> {out.mode}</p>
    </div>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Enter a data set</p>
  );

  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
