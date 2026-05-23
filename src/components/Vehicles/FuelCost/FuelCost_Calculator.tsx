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
} from "@/components/shared/calculatorFields";

export function FuelCost_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [miles, setMiles] = useState("100");
  const [mpg, setMpg] = useState("25");
  const [price, setPrice] = useState("3.50");
  const [error, setError] = useState<string | null>(null);
  const [cost, setCost] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const m = Number.parseFloat(miles);
    const g = Number.parseFloat(mpg);
    const p = Number.parseFloat(price);
    if (![m, g, p].every((n) => Number.isFinite(n) && n > 0)) {
      setError("Enter positive miles, MPG, and price per gallon.");
      setCost(null);
      return;
    }
    setCost(formatNum((m / g) * p, 2));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CalculatorNumberField
        id="fuelcost-miles"
        label="Distance"
        suffix="mi"
        min={0}
        step="any"
        value={miles}
        onChange={(e) => setMiles(e.target.value)}
      />
      <CalculatorNumberField
        id="fuelcost-mpg"
        label="Fuel economy"
        suffix="MPG"
        min={0}
        step="any"
        value={mpg}
        onChange={(e) => setMpg(e.target.value)}
      />
      <CalculatorNumberField
        id="fuelcost-price"
        label="Price per gallon"
        suffix="$/gal"
        min={0}
        step="any"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate fuel cost
      </button>
    </div>
  );

  const result = cost ? (
    <div className="text-center">
      <p className="text-4xl font-bold text-[#d66844]">${cost}</p>
      <p className="mt-2 text-[14px] text-[#334155]">trip fuel cost</p>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter distance, MPG, and fuel price for trip cost.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Cost = (miles ÷ MPG) × price per gallon.
        </p>
      }
    />
  );
}
