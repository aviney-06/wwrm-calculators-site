"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { CustomSelect } from "@/components/Health-Fitness/shared/CustomSelect";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum, gcd } from "@/components/Maths/shared/mathUtils";
import {
  CalculatorEmptyResult,
  CalculatorNumberField,
  CalculatorResultRow,
  calcLabelClass,
} from "@/components/shared/calculatorFields";

type Mode = "simplify" | "resize";

export function AspectRatio_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>("simplify");
  const [width, setWidth] = useState("1920");
  const [height, setHeight] = useState("1080");
  const [ratioW, setRatioW] = useState("16");
  const [ratioH, setRatioH] = useState("9");
  const [newWidth, setNewWidth] = useState("1280");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    headline: string;
    rows: { label: string; value: string }[];
  } | null>(null);

  const run = () => {
    setError(null);
    if (mode === "simplify") {
      const w = Number.parseFloat(width);
      const h = Number.parseFloat(height);
      if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) {
        setError("Enter a positive width and height.");
        setResult(null);
        return;
      }
      const wi = Math.round(w);
      const hi = Math.round(h);
      const g = gcd(wi, hi);
      setResult({
        headline: `${wi / g} : ${hi / g}`,
        rows: [
          { label: "Decimal ratio", value: formatNum(w / h, 4) },
          { label: "Pixels", value: `${wi} × ${hi}` },
        ],
      });
    } else {
      const rw = Number.parseFloat(ratioW);
      const rh = Number.parseFloat(ratioH);
      const nw = Number.parseFloat(newWidth);
      if (
        !Number.isFinite(rw) || !Number.isFinite(rh) || !Number.isFinite(nw) ||
        rw <= 0 || rh <= 0 || nw <= 0
      ) {
        setError("Enter a positive ratio and new width.");
        setResult(null);
        return;
      }
      const nh = (nw * rh) / rw;
      setResult({
        headline: `${formatNum(nw, 2)} × ${formatNum(nh, 2)}`,
        rows: [
          { label: "New height", value: formatNum(nh, 2) },
          { label: "Aspect ratio", value: `${formatNum(rw, 2)} : ${formatNum(rh, 2)}` },
        ],
      });
    }
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label htmlFor="ar-mode" className={calcLabelClass}>
          Mode
        </label>
        <CustomSelect<Mode>
          id="ar-mode"
          value={mode}
          onChange={setMode}
          options={[
            { value: "simplify", label: "Width × height → ratio" },
            { value: "resize", label: "Ratio + width → height" },
          ]}
        />
      </div>
      {mode === "simplify" ? (
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <CalculatorNumberField id="ar-w" label="Width" suffix="px" min={0} step="any" value={width} onChange={(e) => setWidth(e.target.value)} />
          <CalculatorNumberField id="ar-h" label="Height" suffix="px" min={0} step="any" value={height} onChange={(e) => setHeight(e.target.value)} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <CalculatorNumberField id="ar-rw" label="Ratio width" min={0} step="any" value={ratioW} onChange={(e) => setRatioW(e.target.value)} />
            <CalculatorNumberField id="ar-rh" label="Ratio height" min={0} step="any" value={ratioH} onChange={(e) => setRatioH(e.target.value)} />
          </div>
          <CalculatorNumberField id="ar-nw" label="New width" suffix="px" min={0} step="any" value={newWidth} onChange={(e) => setNewWidth(e.target.value)} />
        </>
      )}
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full max-w-md">
      <p className="mb-3 text-center text-3xl font-semibold text-[#d66844]">
        {result.headline}
      </p>
      <dl>
        {result.rows.map((r) => (
          <CalculatorResultRow key={r.label} label={r.label} value={r.value} />
        ))}
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>
      Enter dimensions to find the aspect ratio.
    </CalculatorEmptyResult>
  );

  return <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />;
}
