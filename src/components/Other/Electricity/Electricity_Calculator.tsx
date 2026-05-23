"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import {
  CalculatorEmptyResult,
  CalculatorNumberField,
  CalculatorResultRow,
} from "@/components/shared/calculatorFields";

export function Electricity_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [watts, setWatts] = useState("1500");
  const [hours, setHours] = useState("2");
  const [rate, setRate] = useState("0.15");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{ kwh: string; cost: string } | null>(null);

  const run = () => {
    setError(null);
    const w = Number.parseFloat(watts);
    const h = Number.parseFloat(hours);
    const r = Number.parseFloat(rate);
    if (![w, h, r].every((n) => Number.isFinite(n) && n >= 0)) {
      setError("Enter non-negative watts, hours, and rate.");
      setOut(null);
      return;
    }
    const kwh = (w * h) / 1000;
    setOut({ kwh: formatNum(kwh, 3), cost: formatNum(kwh * r, 2) });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CalculatorNumberField
        id="electricity-watts"
        label="Power"
        suffix="W"
        min={0}
        step="any"
        value={watts}
        onChange={(e) => setWatts(e.target.value)}
      />
      <CalculatorNumberField
        id="electricity-hours"
        label="Hours per day"
        suffix="hr"
        min={0}
        step="any"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />
      <CalculatorNumberField
        id="electricity-rate"
        label="Rate"
        suffix="$/kWh"
        min={0}
        step="any"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate electricity cost
      </button>
    </div>
  );

  const result = out ? (
    <div className="w-full max-w-md">
      <p className="mb-3 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        ${out.cost}
      </p>
      <p className="mb-3 text-center text-[14px] font-medium text-[#334155]">estimated daily cost</p>
      <dl>
        <CalculatorResultRow label="Energy used" value={`${out.kwh} kWh`} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter watts, hours, and rate for kWh and daily cost.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          kWh = (watts × hours) ÷ 1000. Cost = kWh × rate. Actual bills may include fees and tiers.
        </p>
      }
    />
  );
}
