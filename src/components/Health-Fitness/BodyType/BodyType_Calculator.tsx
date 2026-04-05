"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "../shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "../shared/CalculatorTwoPanel";
import { CustomSelect } from "../shared/CustomSelect";

const Q1 = [
  { value: "1", label: "Narrow shoulders / slim frame" },
  { value: "2", label: "Average frame" },
  { value: "3", label: "Broad shoulders / larger frame" },
];
const Q2 = [
  { value: "1", label: "Hard to gain weight" },
  { value: "2", label: "Gain and lose moderately" },
  { value: "3", label: "Gain weight easily" },
];
const Q3 = [
  { value: "1", label: "Naturally lean" },
  { value: "2", label: "Athletic / balanced" },
  { value: "3", label: "Softer / rounder tendency" },
];

function classify(a: number, b: number, c: number) {
  const s = a + b + c;
  if (s <= 5) return "More ectomorph traits (leaner, harder to gain)";
  if (s >= 8) return "More endomorph traits (softer, gains easier)";
  return "Mixed / mesomorph-leaning (balanced build)";
}

export function BodyType_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [q1, setQ1] = useState("2");
  const [q2, setQ2] = useState("2");
  const [q3, setQ3] = useState("2");
  const [label, setLabel] = useState<string | null>(null);

  const run = () => {
    const a = parseInt(q1, 10);
    const b = parseInt(q2, 10);
    const c = parseInt(q3, 10);
    setLabel(classify(a, b, c));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[12px] leading-snug text-[#64748b]">
        Informal somatotype-style quiz — not science-grade; for fun and
        self-reflection.
      </p>
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Frame / shoulders
        </p>
        <CustomSelect id="bt-q1" value={q1} onChange={setQ1} options={Q1} />
      </div>
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Weight change tendency
        </p>
        <CustomSelect id="bt-q2" value={q2} onChange={setQ2} options={Q2} />
      </div>
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Body composition tendency
        </p>
        <CustomSelect id="bt-q3" value={q3} onChange={setQ3} options={Q3} />
      </div>
      <button type="button" className={btnCalculate} onClick={run}>
        See body type summary
      </button>
    </div>
  );

  const result =
    label != null ? (
      <p className="max-w-[16rem] text-center text-[15px] font-medium leading-snug text-[#d66844]">
        {label}
      </p>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Answer all three, then tap the button.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />
  );
}
