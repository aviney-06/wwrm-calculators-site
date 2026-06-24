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
  CalculatorResultRow,
} from "@/components/shared/calculatorFields";
import { fmt } from "@/components/Other/shared/measureUtils";

export function Tile_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [length, setLength] = useState("12");
  const [width, setWidth] = useState("10");
  const [tileW, setTileW] = useState("12");
  const [tileH, setTileH] = useState("12");
  const [waste, setWaste] = useState("10");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    tiles: number;
    area: number;
    tilesNoWaste: number;
  } | null>(null);

  const run = () => {
    setError(null);
    const l = Number(length);
    const w = Number(width);
    const tw = Number(tileW);
    const th = Number(tileH);
    const ws = Number(waste);
    if (![l, w, tw, th].every((n) => Number.isFinite(n) && n > 0)) {
      setError("Enter positive room dimensions and tile size.");
      setResult(null);
      return;
    }
    if (!Number.isFinite(ws) || ws < 0) {
      setError("Waste must be 0% or more.");
      setResult(null);
      return;
    }
    const areaSqIn = l * w * 144; // room area in square inches
    const tileSqIn = tw * th;
    const tilesNoWaste = Math.ceil(areaSqIn / tileSqIn);
    const tiles = Math.ceil((areaSqIn / tileSqIn) * (1 + ws / 100));
    setResult({ tiles, area: l * w, tilesNoWaste });
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <CalculatorNumberField id="tile-l" label="Room length" suffix="ft" min={0} step="any" value={length} onChange={(e) => setLength(e.target.value)} />
        <CalculatorNumberField id="tile-w" label="Room width" suffix="ft" min={0} step="any" value={width} onChange={(e) => setWidth(e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <CalculatorNumberField id="tile-tw" label="Tile width" suffix="in" min={0} step="any" value={tileW} onChange={(e) => setTileW(e.target.value)} />
        <CalculatorNumberField id="tile-th" label="Tile height" suffix="in" min={0} step="any" value={tileH} onChange={(e) => setTileH(e.target.value)} />
      </div>
      <CalculatorNumberField id="tile-waste" label="Waste allowance" suffix="%" min={0} step="any" value={waste} onChange={(e) => setWaste(e.target.value)} />
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate tiles needed
      </button>
    </div>
  );

  const resultPanel = result ? (
    <div className="w-full">
      <p className="text-center text-[13px] text-[#64748b] sm:text-[14px]">Tiles needed</p>
      <p className="mt-1 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {result.tiles}
      </p>
      <dl className="mt-4 w-full">
        <CalculatorResultRow label="Area to cover" value={`${fmt(result.area)} sq ft`} />
        <CalculatorResultRow label="Tiles without waste" value={String(result.tilesNoWaste)} />
      </dl>
    </div>
  ) : (
    <CalculatorEmptyResult>Enter the room and tile sizes to count tiles.</CalculatorEmptyResult>
  );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          A 10% waste allowance is typical; use more for diagonal layouts or
          complex rooms.
        </p>
      }
    />
  );
}
