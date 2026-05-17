"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import {
  calculateMileage,
  type MileageResult,
} from "@/components/Vehicles/shared/mileageUtils";

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full flex-col gap-0.5 border-b border-[#E8ECF0] py-2 text-left last:border-b-0 sm:flex-row sm:justify-between sm:gap-4">
      <dt className="text-[12px] font-medium text-[#64748b] sm:text-[13px]">
        {label}
      </dt>
      <dd className="font-mono text-[13px] text-[#334155] sm:text-right sm:text-[14px]">
        {value}
      </dd>
    </div>
  );
}

export function Mileage_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [miles, setMiles] = useState("300");
  const [gallons, setGallons] = useState("12");
  const [price, setPrice] = useState("3.50");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MileageResult | null>(null);

  const run = () => {
    setError(null);
    const priceTrim = price.trim();
    const priceVal =
      priceTrim === "" ? undefined : Number(priceTrim);
    if (priceVal !== undefined && (!Number.isFinite(priceVal) || priceVal < 0)) {
      setError("Enter a valid fuel price per gallon.");
      setResult(null);
      return;
    }
    const out = calculateMileage(Number(miles), Number(gallons), priceVal);
    if (!out.ok) {
      setError(out.error);
      setResult(null);
      return;
    }
    setResult(out.data);
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label
          htmlFor="mileage-miles"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          Miles driven
        </label>
        <InputWithSuffix
          id="mileage-miles"
          type="number"
          min={0}
          step="any"
          value={miles}
          onChange={(e) => setMiles(e.target.value)}
          suffix="mi"
          className="w-full min-w-0"
          inputClassName="w-full"
        />
      </div>
      <div>
        <label
          htmlFor="mileage-gallons"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          Gallons used
        </label>
        <InputWithSuffix
          id="mileage-gallons"
          type="number"
          min={0}
          step="any"
          value={gallons}
          onChange={(e) => setGallons(e.target.value)}
          suffix="gal"
          className="w-full min-w-0"
          inputClassName="w-full"
        />
      </div>
      <div>
        <label
          htmlFor="mileage-price"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          Fuel price{" "}
          <span className="font-normal text-[#94a3b8]">(optional)</span>
        </label>
        <InputWithSuffix
          id="mileage-price"
          type="number"
          min={0}
          step="any"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          suffix="$/gal"
          className="w-full min-w-0"
          inputClassName="w-full"
        />
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate mileage
      </button>
    </div>
  );

  const resultPanel =
    result != null ? (
      <div className="w-full max-w-md">
        <p className="mb-3 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
          {formatNum(result.mpg, 2)}
          <span className="ml-1.5 text-[18px] font-medium text-[#334155] sm:text-[20px]">
            MPG
          </span>
        </p>
        <dl>
          <ResultRow
            label="Miles driven"
            value={`${formatNum(result.miles, 1)} mi`}
          />
          <ResultRow
            label="Gallons used"
            value={`${formatNum(result.gallons, 2)} gal`}
          />
          {result.totalFuelCost != null ? (
            <>
              <ResultRow
                label="Total fuel cost"
                value={`$${formatNum(result.totalFuelCost, 2)}`}
              />
              <ResultRow
                label="Cost per mile"
                value={`$${formatNum(result.costPerMile!, 3)}`}
              />
            </>
          ) : null}
        </dl>
      </div>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Enter miles and gallons to calculate fuel economy (MPG).
      </p>
    );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          MPG = miles driven ÷ gallons used. Fuel cost is optional.
        </p>
      }
    />
  );
}
