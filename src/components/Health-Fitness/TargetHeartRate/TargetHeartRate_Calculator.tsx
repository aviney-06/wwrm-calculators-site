"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "../shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "../shared/CalculatorTwoPanel";
import { InputWithSuffix } from "../shared/InputWithSuffix";
import { AgeField, FormError } from "../shared/StandardFormRows";

const ZONES = [
  { label: "Light", lo: 0.5, hi: 0.6 },
  { label: "Moderate", lo: 0.6, hi: 0.7 },
  { label: "Aerobic", lo: 0.7, hi: 0.8 },
  { label: "Hard", lo: 0.8, hi: 0.9 },
  { label: "Maximum", lo: 0.9, hi: 1.0 },
] as const;

function zonePctMax(maxHr: number, lo: number, hi: number) {
  return `${Math.round(maxHr * lo)}–${Math.round(maxHr * hi)}`;
}

function zoneKarvonen(maxHr: number, resting: number, lo: number, hi: number) {
  const reserve = maxHr - resting;
  return `${Math.round(resting + reserve * lo)}–${Math.round(resting + reserve * hi)}`;
}

export function TargetHeartRate_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [age, setAge] = useState("");
  const [resting, setResting] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    maxHr: number;
    restingUsed: number | null;
    rows: { label: string; pctMax: string; karvonen: string | null }[];
  } | null>(null);

  const run = () => {
    setError(null);
    const ageN = parseInt(age, 10);
    if (Number.isNaN(ageN) || ageN < 10 || ageN > 100) {
      setError("Enter age 10–100.");
      setResult(null);
      return;
    }
    const maxHr = 220 - ageN;
    const rRaw = resting.trim();
    let restingUsed: number | null = null;
    if (rRaw !== "") {
      const r = parseInt(rRaw, 10);
      if (Number.isNaN(r) || r < 30 || r > 120) {
        setError("Resting HR optional — use 30–120 or leave blank.");
        setResult(null);
        return;
      }
      if (r >= maxHr) {
        setError("Resting HR should be below estimated max HR.");
        setResult(null);
        return;
      }
      restingUsed = r;
    }

    const rows = ZONES.map(({ label, lo, hi }) => ({
      label,
      pctMax: `${Math.round(lo * 100)}–${Math.round(hi * 100)}% → ${zonePctMax(maxHr, lo, hi)} bpm`,
      karvonen:
        restingUsed != null
          ? `${Math.round(lo * 100)}–${Math.round(hi * 100)}% → ${zoneKarvonen(maxHr, restingUsed, lo, hi)} bpm`
          : null,
    }));

    setResult({ maxHr, restingUsed, rows });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <AgeField
        age={age}
        setAge={setAge}
        id="thr-age"
        ageMin={10}
        ageMax={100}
      />
      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">
          Resting heart rate (optional)
        </p>
        <InputWithSuffix
          type="number"
          min={30}
          max={120}
          value={resting}
          onChange={(e) => setResting(e.target.value)}
          suffix="bpm"
          inputClassName="max-w-[8rem]"
        />
        <p className="mt-1 text-[11px] text-[#94a3b8]">
          If set, Karvonen zones use reserve: (max − resting) × intensity +
          resting.
        </p>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate heart rate zones
      </button>
    </div>
  );

  const resultPanel =
    result != null ? (
      <div className="w-full max-w-[22rem] space-y-3 text-[12px] leading-snug text-[#334155] sm:text-[13px]">
        <p>
          <span className="font-semibold">Est. max HR (220 − age):</span>{" "}
          {result.maxHr} bpm
        </p>
        {result.restingUsed != null ? (
          <p className="text-[11px] text-[#64748b]">
            Karvonen uses resting {result.restingUsed} bpm; % max column ignores
            resting HR.
          </p>
        ) : (
          <p className="text-[11px] text-[#64748b]">
            Add resting HR for Karvonen (heart rate reserve) bpm ranges.
          </p>
        )}
        <ul className="space-y-2 border-t border-[#e2e8f0] pt-2">
          {result.rows.map((row) => (
            <li key={row.label}>
              <p className="font-semibold text-[#1e293b]">{row.label}</p>
              <p className="pl-0 text-[#475569]">% max HR: {row.pctMax}</p>
              {row.karvonen != null ? (
                <p className="pl-0 text-[#475569]">Karvonen: {row.karvonen}</p>
              ) : null}
            </li>
          ))}
        </ul>
        <p className="text-[11px] text-[#64748b]">
          Zones follow common gym-cardiology brackets; medications and training
          shift real targets.
        </p>
      </div>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Training zones from age (and optional resting HR).
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />
  );
}
