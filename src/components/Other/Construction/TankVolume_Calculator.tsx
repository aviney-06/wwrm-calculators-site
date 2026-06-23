"use client";

import { useRef, useState } from "react";
import { btnCalculate, fieldBase } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import {
  CalculatorEmptyResult,
  CalculatorResultRow,
  calcLabelClass,
} from "@/components/shared/calculatorFields";
import { fmt, LITERS_PER_GALLON } from "@/components/Other/shared/measureUtils";

type Shape = "cylinder" | "rectangle";

const CUBIC_IN_PER_GALLON = 231;
const CUBIC_IN_PER_CUBIC_FOOT = 1728;

export function TankVolume_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [shape, setShape] = useState<Shape>("cylinder");
  const [diameter, setDiameter] = useState("24");
  const [length, setLength] = useState("48");
  const [width, setWidth] = useState("24");
  const [height, setHeight] = useState("36");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    gallons: number;
    liters: number;
    cubicFeet: number;
  } | null>(null);

  const run = () => {
    setError(null);
    let cubicInches: number;
    if (shape === "cylinder") {
      const d = Number(diameter);
      const h = Number(height);
      if (![d, h].every((n) => Number.isFinite(n) && n > 0)) {
        setError("Enter a positive diameter and height (in inches).");
        setResult(null);
        return;
      }
      cubicInches = Math.PI * (d / 2) ** 2 * h;
    } else {
      const l = Number(length);
      const w = Number(width);
      const h = Number(height);
      if (![l, w, h].every((n) => Number.isFinite(n) && n > 0)) {
        setError("Enter positive length, width, and height (in inches).");
        setResult(null);
        return;
      }
      cubicInches = l * w * h;
    }
    const gallons = cubicInches / CUBIC_IN_PER_GALLON;
    setResult({
      gallons,
      liters: gallons * LITERS_PER_GALLON,
      cubicFeet: cubicInches / CUBIC_IN_PER_CUBIC_FOOT,
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const numberField = (
    id: string,
    label: string,
    value: string,
    setter: (v: string) => void,
  ) => (
    <div>
      <label htmlFor={id} className={calcLabelClass}>
        {label}
      </label>
      <input
        id={id}
        type="number"
        min={0}
        step="any"
        inputMode="decimal"
        value={value}
        onChange={(e) => setter(e.target.value)}
        className={`${fieldBase} w-full`}
      />
    </div>
  );

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-5">
      <div>
        <label htmlFor="tk-shape" className={calcLabelClass}>
          Tank shape
        </label>
        <select
          id="tk-shape"
          value={shape}
          onChange={(e) => {
            setShape(e.target.value as Shape);
            setResult(null);
            setError(null);
          }}
          className={`${fieldBase} w-full`}
        >
          <option value="cylinder">Cylinder (round)</option>
          <option value="rectangle">Rectangular (box)</option>
        </select>
      </div>
      <p className="text-[13px] text-[#64748b] sm:text-[14px]">All dimensions in inches.</p>
      {shape === "cylinder" ? (
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {numberField("tk-d", "Diameter", diameter, setDiameter)}
          {numberField("tk-h", "Height / length", height, setHeight)}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {numberField("tk-l", "Length", length, setLength)}
          {numberField("tk-w", "Width", width, setWidth)}
          {numberField("tk-rh", "Height", height, setHeight)}
        </div>
      )}
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate tank volume
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">Full capacity</p>
      <p className="mt-1 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {fmt(result.gallons)} gal
      </p>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="Liters" value={fmt(result.liters)} />
        <CalculatorResultRow label="Cubic feet" value={`${fmt(result.cubicFeet)} ft³`} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Choose a shape and enter dimensions.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Gallons are US liquid gallons. Results are the full (100%) tank capacity.
        </p>
      }
    />
  );
}
