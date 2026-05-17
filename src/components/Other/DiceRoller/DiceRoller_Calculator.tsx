"use client";

import { useRef, useState } from "react";
import { btnCalculate, fieldBase } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { CustomSelect } from "@/components/Health-Fitness/shared/CustomSelect";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { rollDice } from "@/components/Other/shared/otherUtils";

const SIDE_OPTIONS = [
  { value: "6", label: "6 (standard)" },
  { value: "4", label: "4" },
  { value: "8", label: "8" },
  { value: "10", label: "10" },
  { value: "12", label: "12" },
  { value: "20", label: "20 (D20)" },
  { value: "100", label: "100" },
];

export function DiceRoller_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [diceCount, setDiceCount] = useState("2");
  const [sides, setSides] = useState("6");
  const [error, setError] = useState<string | null>(null);
  const [rolls, setRolls] = useState<number[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  const run = () => {
    setError(null);
    const out = rollDice(Number(diceCount), Number(sides));
    if (!out.ok) {
      setError(out.error);
      setRolls(null);
      setTotal(null);
      return;
    }
    setRolls(out.rolls);
    setTotal(out.total);
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label
          htmlFor="dice-count"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          Number of dice
        </label>
        <input
          id="dice-count"
          type="number"
          min={1}
          max={20}
          value={diceCount}
          onChange={(e) => setDiceCount(e.target.value)}
          className={`${fieldBase} w-full max-w-[6rem] font-mono`}
        />
      </div>
      <div>
        <label
          htmlFor="dice-sides"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          Sides per die
        </label>
        <CustomSelect
          id="dice-sides"
          value={sides}
          onChange={setSides}
          options={SIDE_OPTIONS}
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Roll dice
      </button>
    </div>
  );

  const resultPanel =
    rolls != null && total != null ? (
      <div className="text-center">
        <p className="text-[13px] text-[#64748b] sm:text-[14px]">Total</p>
        <p className="mt-1 text-5xl font-semibold text-[#d66844]">{total}</p>
        <p className="mt-4 text-[12px] font-medium text-[#64748b]">Individual rolls</p>
        <p className="mt-2 flex flex-wrap justify-center gap-2">
          {rolls.map((r, i) => (
            <span
              key={i}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#E0E0E0] bg-white font-mono text-lg font-semibold text-[#334155] shadow-sm"
            >
              {r}
            </span>
          ))}
        </p>
      </div>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Choose dice and sides, then roll.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />
  );
}
