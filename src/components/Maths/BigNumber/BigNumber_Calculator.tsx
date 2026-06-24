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

type Op = "add" | "subtract" | "multiply" | "divide" | "power" | "mod";

const parseBig = (s: string): bigint | null => {
  const t = s.trim().replace(/,/g, "");
  if (!/^-?\d+$/.test(t)) return null;
  try {
    return BigInt(t);
  } catch {
    return null;
  }
};

export function BigNumber_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [x, setX] = useState("123456789012345678901234567890");
  const [y, setY] = useState("987654321098765432109876543210");
  const [op, setOp] = useState<Op>("multiply");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    main: string;
    extra?: { label: string; value: string };
    digits: number;
  } | null>(null);

  const run = () => {
    setError(null);
    const a = parseBig(x);
    const b = parseBig(y);
    if (a == null || b == null) {
      setError("Enter whole numbers only (digits, with an optional leading minus sign).");
      setResult(null);
      return;
    }
    let main: string;
    let extra: { label: string; value: string } | undefined;
    switch (op) {
      case "add":
        main = (a + b).toString();
        break;
      case "subtract":
        main = (a - b).toString();
        break;
      case "multiply":
        main = (a * b).toString();
        break;
      case "divide": {
        if (b === BigInt(0)) {
          setError("Cannot divide by zero.");
          setResult(null);
          return;
        }
        main = (a / b).toString();
        extra = { label: "Remainder", value: (a % b).toString() };
        break;
      }
      case "mod": {
        if (b === BigInt(0)) {
          setError("Cannot take a modulus by zero.");
          setResult(null);
          return;
        }
        main = (a % b).toString();
        break;
      }
      case "power": {
        if (b < BigInt(0)) {
          setError("Exponent must be 0 or greater.");
          setResult(null);
          return;
        }
        if (b > BigInt(100000)) {
          setError("Exponent is too large to compute safely (max 100,000).");
          setResult(null);
          return;
        }
        main = (a ** b).toString();
        break;
      }
      default:
        return;
    }
    setResult({
      main,
      extra,
      digits: main.replace("-", "").length,
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CalculatorNumberField
        id="big-x"
        label="First number"
        type="text"
        inputMode="numeric"
        spellCheck={false}
        value={x}
        onChange={(e) => setX(e.target.value)}
      />
      <div>
        <label htmlFor="big-op" className={calcLabelClass}>
          Operation
        </label>
        <CustomSelect<Op>
          id="big-op"
          value={op}
          onChange={setOp}
          options={[
            { value: "add", label: "Add (+)" },
            { value: "subtract", label: "Subtract (−)" },
            { value: "multiply", label: "Multiply (×)" },
            { value: "divide", label: "Divide (÷, integer)" },
            { value: "mod", label: "Modulo (mod)" },
            { value: "power", label: "Power (^)" },
          ]}
        />
      </div>
      <CalculatorNumberField
        id="big-y"
        label={op === "power" ? "Exponent" : "Second number"}
        type="text"
        inputMode="numeric"
        spellCheck={false}
        value={y}
        onChange={(e) => setY(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full max-w-md">
      <p className="mb-2 break-all text-center text-lg font-semibold text-[#d66844] sm:text-xl">
        {result.main}
      </p>
      <dl className="mt-3">
        <CalculatorResultRow label="Number of digits" value={String(result.digits)} />
        {result.extra ? (
          <CalculatorResultRow label={result.extra.label} value={result.extra.value} />
        ) : null}
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>
      Enter two whole numbers and choose an operation.
    </CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px]">
          Exact integer arithmetic with no rounding. Division returns the
          integer quotient and remainder.
        </p>
      }
    />
  );
}
