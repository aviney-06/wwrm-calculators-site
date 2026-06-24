"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { CustomSelect } from "@/components/Health-Fitness/shared/CustomSelect";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import {
  CalculatorEmptyResult,
  CalculatorNumberField,
  CalculatorResultRow,
  calcLabelClass,
} from "@/components/shared/calculatorFields";
import { fmt } from "@/components/Other/shared/measureUtils";

type Unit = "C" | "F";

const A = 17.625;
const B = 243.04;

function comfort(dewC: number): string {
  if (dewC < 10) return "Dry / comfortable";
  if (dewC < 16) return "Comfortable";
  if (dewC < 18) return "Getting sticky";
  if (dewC < 21) return "Humid";
  if (dewC < 24) return "Very humid";
  return "Oppressive";
}

export function DewPoint_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [temp, setTemp] = useState("25");
  const [unit, setUnit] = useState<Unit>("C");
  const [rh, setRh] = useState("60");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ dew: number; comfort: string } | null>(null);

  const run = () => {
    setError(null);
    const t = Number.parseFloat(temp);
    const humidity = Number.parseFloat(rh);
    if (!Number.isFinite(t)) {
      setError("Enter a valid temperature.");
      setResult(null);
      return;
    }
    if (!Number.isFinite(humidity) || humidity <= 0 || humidity > 100) {
      setError("Relative humidity must be between 0 and 100%.");
      setResult(null);
      return;
    }
    const tC = unit === "F" ? ((t - 32) * 5) / 9 : t;
    const gamma = Math.log(humidity / 100) + (A * tC) / (B + tC);
    const dewC = (B * gamma) / (A - gamma);
    const dew = unit === "F" ? (dewC * 9) / 5 + 32 : dewC;
    setResult({ dew, comfort: comfort(dewC) });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CalculatorNumberField
        id="dew-temp"
        label="Air temperature"
        suffix={`°${unit}`}
        step="any"
        value={temp}
        onChange={(e) => setTemp(e.target.value)}
      />
      <div>
        <label htmlFor="dew-unit" className={calcLabelClass}>
          Temperature unit
        </label>
        <CustomSelect<Unit>
          id="dew-unit"
          value={unit}
          onChange={setUnit}
          options={[
            { value: "C", label: "Celsius (°C)" },
            { value: "F", label: "Fahrenheit (°F)" },
          ]}
        />
      </div>
      <CalculatorNumberField
        id="dew-rh"
        label="Relative humidity"
        suffix="%"
        min={0}
        max={100}
        step="any"
        value={rh}
        onChange={(e) => setRh(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate dew point
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="text-center">
      <p className="text-4xl font-semibold text-[#d66844]">
        {fmt(result.dew, 1)}°{unit}
      </p>
      <p className="mt-2 text-[14px] font-medium text-[#334155]">dew point</p>
      <dl className="mt-4 w-full text-left">
        <CalculatorResultRow label="Comfort level" value={result.comfort} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>
      Enter temperature and humidity to find the dew point.
    </CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Uses the Magnus-Tetens approximation, accurate for typical weather
          temperatures.
        </p>
      }
    />
  );
}
