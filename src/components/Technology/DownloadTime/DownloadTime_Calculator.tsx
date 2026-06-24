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

const SIZE_TO_BYTES: Record<string, number> = {
  KB: 1e3,
  MB: 1e6,
  GB: 1e9,
  TB: 1e12,
};

const SPEED_TO_BPS: Record<string, number> = {
  Kbps: 1e3,
  Mbps: 1e6,
  Gbps: 1e9,
  "KB/s": 8e3,
  "MB/s": 8e6,
};

function formatDuration(totalSeconds: number): string {
  if (totalSeconds < 1) return `${(totalSeconds * 1000).toFixed(0)} ms`;
  const s = Math.floor(totalSeconds % 60);
  const m = Math.floor((totalSeconds / 60) % 60);
  const h = Math.floor((totalSeconds / 3600) % 24);
  const d = Math.floor(totalSeconds / 86400);
  const parts: string[] = [];
  if (d) parts.push(`${d}d`);
  if (h) parts.push(`${h}h`);
  if (m) parts.push(`${m}m`);
  if (s || parts.length === 0) parts.push(`${s}s`);
  return parts.join(" ");
}

export function DownloadTime_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [size, setSize] = useState("5");
  const [sizeUnit, setSizeUnit] = useState("GB");
  const [speed, setSpeed] = useState("100");
  const [speedUnit, setSpeedUnit] = useState("Mbps");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    duration: string;
    seconds: string;
  } | null>(null);

  const run = () => {
    setError(null);
    const sz = Number.parseFloat(size);
    const sp = Number.parseFloat(speed);
    if (!Number.isFinite(sz) || sz <= 0) {
      setError("Enter a positive file size.");
      setResult(null);
      return;
    }
    if (!Number.isFinite(sp) || sp <= 0) {
      setError("Enter a positive download speed.");
      setResult(null);
      return;
    }
    const bytes = sz * SIZE_TO_BYTES[sizeUnit]!;
    const bits = bytes * 8;
    const seconds = bits / SPEED_TO_BPS[speedUnit]!;
    setResult({
      duration: formatDuration(seconds),
      seconds: `${seconds.toLocaleString("en-US", { maximumFractionDigits: 1 })} s`,
    });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <CalculatorNumberField id="dt-size" label="File size" min={0} step="any" value={size} onChange={(e) => setSize(e.target.value)} />
        <div>
          <label htmlFor="dt-size-unit" className={calcLabelClass}>Unit</label>
          <CustomSelect<string>
            id="dt-size-unit"
            value={sizeUnit}
            onChange={setSizeUnit}
            options={[
              { value: "KB", label: "KB" },
              { value: "MB", label: "MB" },
              { value: "GB", label: "GB" },
              { value: "TB", label: "TB" },
            ]}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <CalculatorNumberField id="dt-speed" label="Download speed" min={0} step="any" value={speed} onChange={(e) => setSpeed(e.target.value)} />
        <div>
          <label htmlFor="dt-speed-unit" className={calcLabelClass}>Unit</label>
          <CustomSelect<string>
            id="dt-speed-unit"
            value={speedUnit}
            onChange={setSpeedUnit}
            options={[
              { value: "Kbps", label: "Kbps" },
              { value: "Mbps", label: "Mbps" },
              { value: "Gbps", label: "Gbps" },
              { value: "KB/s", label: "KB/s" },
              { value: "MB/s", label: "MB/s" },
            ]}
          />
        </div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate download time
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full max-w-md">
      <p className="mb-2 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {result.duration}
      </p>
      <p className="mb-3 text-center text-[14px] font-medium text-[#334155]">
        estimated download time
      </p>
      <dl>
        <CalculatorResultRow label="In seconds" value={result.seconds} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>
      Enter a file size and speed to estimate download time.
    </CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px]">
          Uses decimal units (1 MB = 1,000,000 bytes) and assumes a steady
          connection. Real speeds vary, so actual times are usually a bit longer.
        </p>
      }
    />
  );
}
