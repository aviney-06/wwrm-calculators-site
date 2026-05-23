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
  calcHintClass,
} from "@/components/shared/calculatorFields";

export function OhmsLaw_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("100");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const v = voltage.trim() ? Number.parseFloat(voltage) : NaN;
    const i = current.trim() ? Number.parseFloat(current) : NaN;
    const r = resistance.trim() ? Number.parseFloat(resistance) : NaN;
    const known = [Number.isFinite(v), Number.isFinite(i), Number.isFinite(r)].filter(
      Boolean,
    ).length;
    if (known !== 2) {
      setError("Enter exactly two values; leave the third blank.");
      setOut(null);
      return;
    }
    if (Number.isFinite(v) && Number.isFinite(i)) {
      setOut(`R = ${formatNum(v / i)} Ω`);
    } else if (Number.isFinite(v) && Number.isFinite(r)) {
      setOut(`I = ${formatNum(v / r)} A`);
    } else if (Number.isFinite(i) && Number.isFinite(r)) {
      setOut(`V = ${formatNum(i * r)} V`);
    }
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className={calcHintClass}>V = I × R — fill any two fields.</p>
      <CalculatorNumberField
        id="ohms-voltage"
        label="Voltage"
        optional
        suffix="V"
        step="any"
        value={voltage}
        onChange={(e) => setVoltage(e.target.value)}
        placeholder="leave blank to solve"
      />
      <CalculatorNumberField
        id="ohms-current"
        label="Current"
        optional
        suffix="A"
        step="any"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
        placeholder="leave blank to solve"
      />
      <CalculatorNumberField
        id="ohms-resistance"
        label="Resistance"
        optional
        suffix="Ω"
        step="any"
        value={resistance}
        onChange={(e) => setResistance(e.target.value)}
        placeholder="leave blank to solve"
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Solve Ohm&apos;s law
      </button>
    </div>
  );

  const result = out ? (
    <div className="text-center">
      <p className="text-2xl font-bold text-[#d66844]">{out}</p>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter two of voltage, current, and resistance.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          V = I × R. Leave the unknown value empty; enter exactly two values.
        </p>
      }
    />
  );
}
