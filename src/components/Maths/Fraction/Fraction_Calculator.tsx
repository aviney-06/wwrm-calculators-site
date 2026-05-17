"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { CustomSelect } from "@/components/Health-Fitness/shared/CustomSelect";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { fractionToString } from "@/components/Maths/shared/mathUtils";

type Op = "add" | "sub" | "mul" | "div";

function parseIntField(v: string) {
  const n = parseInt(v, 10);
  return Number.isNaN(n) ? null : n;
}

export function Fraction_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [n1, setN1] = useState("1");
  const [d1, setD1] = useState("2");
  const [n2, setN2] = useState("1");
  const [d2, setD2] = useState("3");
  const [op, setOp] = useState<Op>("add");
  const [error, setError] = useState<string | null>(null);
  const [frac, setFrac] = useState<string | null>(null);
  const [decimal, setDecimal] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const a = parseIntField(n1);
    const b = parseIntField(d1);
    const c = parseIntField(n2);
    const e = parseIntField(d2);
    if ([a, b, c, e].some((x) => x === null)) {
      setError("Enter whole numbers for numerators and denominators.");
      setFrac(null);
      return;
    }
    if (b === 0 || e === 0) {
      setError("Denominators cannot be zero.");
      setFrac(null);
      return;
    }
    let num: number;
    let den: number;
    if (op === "add") {
      num = a! * e! + c! * b!;
      den = b! * e!;
    } else if (op === "sub") {
      num = a! * e! - c! * b!;
      den = b! * e!;
    } else if (op === "mul") {
      num = a! * c!;
      den = b! * e!;
    } else {
      if (c === 0) {
        setError("Cannot divide by zero.");
        setFrac(null);
        return;
      }
      num = a! * e!;
      den = b! * c!;
    }
    setFrac(fractionToString(num, den));
    setDecimal(String(Number((num / den).toFixed(6))));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Operation</p>
        <CustomSelect<Op>
          id="frac-op"
          value={op}
          onChange={setOp}
          options={[
            { value: "add", label: "Add (+)" },
            { value: "sub", label: "Subtract (−)" },
            { value: "mul", label: "Multiply (×)" },
            { value: "div", label: "Divide (÷)" },
          ]}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div>
          <p className="mb-1 text-[12px] font-medium text-[#334155]">Fraction 1</p>
          <div className="flex items-center gap-1">
            <InputWithSuffix suffix="" type="number" value={n1} onChange={(e) => setN1(e.target.value)} inputClassName="w-[3.5rem]" />
            <span className="text-[#64748b]">/</span>
            <InputWithSuffix suffix="" type="number" value={d1} onChange={(e) => setD1(e.target.value)} inputClassName="w-[3.5rem]" />
          </div>
        </div>
        <div>
          <p className="mb-1 text-[12px] font-medium text-[#334155]">Fraction 2</p>
          <div className="flex items-center gap-1">
            <InputWithSuffix suffix="" type="number" value={n2} onChange={(e) => setN2(e.target.value)} inputClassName="w-[3.5rem]" />
            <span className="text-[#64748b]">/</span>
            <InputWithSuffix suffix="" type="number" value={d2} onChange={(e) => setD2(e.target.value)} inputClassName="w-[3.5rem]" />
          </div>
        </div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>Calculate</button>
    </div>
  );

  const result =
    frac != null ? (
      <>
        <p className="text-center text-3xl font-bold text-[#d66844]">{frac}</p>
        <p className="text-center text-[14px] text-[#334155]">≈ {decimal}</p>
      </>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Enter two fractions and an operation.
      </p>
    );

  return (
    <CalculatorTwoPanel
      form={form}
      result={result}
      resultRef={resultRef}
      disclaimer={null}
    />
  );
}
