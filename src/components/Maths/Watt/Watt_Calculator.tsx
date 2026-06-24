"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { CustomSelect } from "@/components/Health-Fitness/shared/CustomSelect";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import {
  CalculatorEmptyResult,
  CalculatorNumberField,
  calcLabelClass,
} from "@/components/shared/calculatorFields";

type Mode = "energy" | "electrical";

export function Watt_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>("energy");
  const [energy, setEnergy] = useState("3600");
  const [time, setTime] = useState("60");
  const [voltage, setVoltage] = useState("120");
  const [current, setCurrent] = useState("2");
  const [error, setError] = useState<string | null>(null);
  const [watts, setWatts] = useState<string | null>(null);

  const run = () => {
    setError(null);
    if (mode === "energy") {
      const e = Number.parseFloat(energy);
      const t = Number.parseFloat(time);
      if (!Number.isFinite(e) || !Number.isFinite(t)) {
        setError("Enter valid numbers for energy and time.");
        setWatts(null);
        return;
      }
      if (t <= 0) {
        setError("Time must be greater than 0.");
        setWatts(null);
        return;
      }
      setWatts(formatNum(e / t, 4));
    } else {
      const v = Number.parseFloat(voltage);
      const i = Number.parseFloat(current);
      if (!Number.isFinite(v) || !Number.isFinite(i)) {
        setError("Enter valid numbers for voltage and current.");
        setWatts(null);
        return;
      }
      setWatts(formatNum(v * i, 4));
    }
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label htmlFor="watt-mode" className={calcLabelClass}>
          Calculate from
        </label>
        <CustomSelect<Mode>
          id="watt-mode"
          value={mode}
          onChange={setMode}
          options={[
            { value: "energy", label: "Energy & time (P = E ÷ t)" },
            { value: "electrical", label: "Voltage & current (P = V × I)" },
          ]}
        />
      </div>
      {mode === "energy" ? (
        <>
          <CalculatorNumberField
            id="watt-energy"
            label="Energy"
            suffix="J"
            min={0}
            step="any"
            value={energy}
            onChange={(e) => setEnergy(e.target.value)}
          />
          <CalculatorNumberField
            id="watt-time"
            label="Time"
            suffix="s"
            min={0}
            step="any"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </>
      ) : (
        <>
          <CalculatorNumberField
            id="watt-voltage"
            label="Voltage"
            suffix="V"
            step="any"
            value={voltage}
            onChange={(e) => setVoltage(e.target.value)}
          />
          <CalculatorNumberField
            id="watt-current"
            label="Current"
            suffix="A"
            step="any"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </>
      )}
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate power
      </button>
    </div>
  );

  const result =
    watts != null ? (
      <div className="text-center">
        <p className="text-4xl font-semibold text-[#d66844]">{watts}</p>
        <p className="mt-2 text-[14px] text-[#334155]">watts (W)</p>
        <p className="mt-1 text-[12px] text-[#64748b]">
          = {formatNum(Number(watts) / 1000, 4)} kW
        </p>
      </div>
    ) : (
      <CalculatorEmptyResult>
        Enter values to calculate power in watts.
      </CalculatorEmptyResult>
    );

  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
