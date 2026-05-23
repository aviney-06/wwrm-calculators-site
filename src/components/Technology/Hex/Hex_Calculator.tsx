"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import {
  CalculatorEmptyResult,
  CalculatorNumberField,
} from "@/components/shared/calculatorFields";

export function Hex_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [hex, setHex] = useState("FF");
  const [dec, setDec] = useState("255");
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"hexToDec" | "decToHex" | null>(null);
  const [value, setValue] = useState<string | null>(null);

  const toDec = () => {
    setError(null);
    const h = hex.trim().replace(/^0x/i, "");
    if (!/^[0-9a-fA-F]+$/.test(h)) {
      setError("Invalid hexadecimal.");
      setValue(null);
      return;
    }
    setMode("hexToDec");
    setValue(String(Number.parseInt(h, 16)));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const toHex = () => {
    setError(null);
    const n = Number.parseInt(dec, 10);
    if (!Number.isFinite(n) || n < 0) {
      setError("Enter a non-negative integer.");
      setValue(null);
      return;
    }
    setMode("decToHex");
    setValue(n.toString(16).toUpperCase());
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CalculatorNumberField
        id="hex-input"
        label="Hexadecimal"
        type="text"
        autoComplete="off"
        spellCheck={false}
        value={hex}
        onChange={(e) => setHex(e.target.value)}
        placeholder="FF or 0xFF"
      />
      <button type="button" className={btnCalculate} onClick={toDec}>
        Hex → Decimal
      </button>
      <CalculatorNumberField
        id="hex-decimal"
        label="Decimal"
        type="text"
        inputMode="numeric"
        value={dec}
        onChange={(e) => setDec(e.target.value)}
      />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={toHex}>
        Decimal → Hex
      </button>
    </div>
  );

  const result =
    value && mode ? (
      <div className="text-center">
        <p className="text-3xl font-bold text-[#d66844]">{value}</p>
        <p className="mt-2 text-[14px] text-[#334155]">
          {mode === "hexToDec" ? "decimal" : "hexadecimal"}
        </p>
      </div>
    ) : (
      <CalculatorEmptyResult>Convert hex to decimal or decimal to hex.</CalculatorEmptyResult>
    );

  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
