"use client";

import { useRef, useState } from "react";
import {
  btnCalculate,
  numberFieldClass,
} from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import {
  compareTireSizes,
  type TireCompareResult,
  type TireSpec,
  validateTireSpec,
} from "@/components/Vehicles/shared/tireSizeUtils";

function TireFields({
  title,
  width,
  aspect,
  rim,
  onWidth,
  onAspect,
  onRim,
  idPrefix,
}: {
  title: string;
  width: string;
  aspect: string;
  rim: string;
  onWidth: (v: string) => void;
  onAspect: (v: string) => void;
  onRim: (v: string) => void;
  idPrefix: string;
}) {
  const labelClass =
    "mb-1 text-[12px] font-medium text-[#334155] sm:text-[13px]";
  const inputClass = `${numberFieldClass("w-full min-w-0 font-mono")}`;

  return (
    <fieldset className="rounded-md border border-[#E8ECF0] bg-[#fafbfc] p-3 sm:p-4">
      <legend className="px-1 text-[13px] font-semibold text-[#334155] sm:text-[15px]">
        {title}
      </legend>
      <div className="mt-2 grid grid-cols-3 gap-2 sm:gap-3">
        <div>
          <label htmlFor={`${idPrefix}-width`} className={labelClass}>
            Width (mm)
          </label>
          <input
            id={`${idPrefix}-width`}
            type="number"
            inputMode="numeric"
            value={width}
            onChange={(e) => onWidth(e.target.value)}
            placeholder="265"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-aspect`} className={labelClass}>
            Aspect (%)
          </label>
          <input
            id={`${idPrefix}-aspect`}
            type="number"
            inputMode="numeric"
            value={aspect}
            onChange={(e) => onAspect(e.target.value)}
            placeholder="70"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-rim`} className={labelClass}>
            Rim (in)
          </label>
          <input
            id={`${idPrefix}-rim`}
            type="number"
            inputMode="numeric"
            value={rim}
            onChange={(e) => onRim(e.target.value)}
            placeholder="17"
            className={inputClass}
          />
        </div>
      </div>
      <p className="mt-2 font-mono text-[11px] text-[#94a3b8] sm:text-[12px]">
        e.g. {width}/{aspect}R{rim}
      </p>
    </fieldset>
  );
}

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

function parseSpec(
  width: string,
  aspect: string,
  rim: string,
): { ok: true; spec: TireSpec } | { ok: false; error: string } {
  const spec: TireSpec = {
    widthMm: Number(width),
    aspectRatio: Number(aspect),
    rimInches: Number(rim),
  };
  if (
    [spec.widthMm, spec.aspectRatio, spec.rimInches].some((n) => !Number.isFinite(n))
  ) {
    return { ok: false, error: "Enter valid numbers for width, aspect, and rim." };
  }
  const err = validateTireSpec(spec);
  if (err) return { ok: false, error: err };
  return { ok: true, spec };
}

export function TireSize_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [origW, setOrigW] = useState("265");
  const [origA, setOrigA] = useState("70");
  const [origR, setOrigR] = useState("17");
  const [newW, setNewW] = useState("275");
  const [newA, setNewA] = useState("65");
  const [newR, setNewR] = useState("17");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TireCompareResult | null>(null);

  const run = () => {
    setError(null);
    const o = parseSpec(origW, origA, origR);
    if (!o.ok) {
      setError(`Original tire: ${o.error}`);
      setResult(null);
      return;
    }
    const n = parseSpec(newW, newA, newR);
    if (!n.ok) {
      setError(`New tire: ${n.error}`);
      setResult(null);
      return;
    }
    setResult(compareTireSizes(o.spec, n.spec));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <TireFields
        title="Original tire"
        width={origW}
        aspect={origA}
        rim={origR}
        onWidth={setOrigW}
        onAspect={setOrigA}
        onRim={setOrigR}
        idPrefix="orig"
      />
      <TireFields
        title="New tire"
        width={newW}
        aspect={newA}
        rim={newR}
        onWidth={setNewW}
        onAspect={setNewA}
        onRim={setNewR}
        idPrefix="new"
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Compare tire sizes
      </button>
    </div>
  );

  const resultPanel =
    result != null ? (
      <dl className="w-full max-w-md text-left">
        <ResultRow
          label="Original diameter"
          value={`${formatNum(result.original.diameterInches, 2)} in`}
        />
        <ResultRow
          label="New diameter"
          value={`${formatNum(result.new.diameterInches, 2)} in`}
        />
        <ResultRow
          label="Diameter difference"
          value={`${formatNum(result.diameterDiffInches, 2)} in (${formatNum(result.diameterDiffPercent, 2)}%)`}
        />
        <ResultRow
          label="Speedometer error"
          value={`${formatNum(result.speedometerErrorPercent, 2)}%`}
        />
        <ResultRow
          label="At 60 mph indicated"
          value={`≈ ${formatNum(60 * result.speedFactor, 1)} mph actual`}
        />
        <ResultRow
          label="Original circumference"
          value={`${formatNum(result.original.circumferenceInches, 2)} in`}
        />
        <ResultRow
          label="New circumference"
          value={`${formatNum(result.new.circumferenceInches, 2)} in`}
        />
      </dl>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Enter original and new tire sizes to compare diameter and speedometer
        effect.
      </p>
    );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          Metric tire sizing (e.g. 265/70R17). Actual rolling diameter can vary
          by brand and load.
        </p>
      }
    />
  );
}
