"use client";

import { create, all } from "mathjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";

const math = create(all);

const sinOrig = math.sin.bind(math);
const cosOrig = math.cos.bind(math);
const tanOrig = math.tan.bind(math);
const degToRadFactor = math.divide(math.pi, 180);

function formatResult(n: number): string {
  if (!Number.isFinite(n)) return "Error";
  return math.format(n, { precision: 14, lowerExp: -9, upperExp: 9 });
}

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  try {
    const x = math.number(value as Parameters<typeof math.number>[0]);
    if (typeof x === "number" && Number.isFinite(x)) return x;
  } catch {
    /* ignore */
  }
  return null;
}

type AngleMode = "deg" | "rad";

const btnBase =
  "flex h-11 w-full min-w-0 select-none items-center justify-center rounded-md border text-[13px] font-semibold leading-none shadow-sm transition hover:brightness-[1.02] active:scale-[0.98] active:brightness-95 sm:h-12 sm:text-sm md:h-9 md:text-[12px] md:leading-tight";

const btnSci = `${btnBase} border-[#E0E0E0] bg-[#f8fafc] text-[#334155] hover:bg-[#f1f5f9]`;

const btnNum = `${btnBase} border-[#94a3b8] bg-[#64748b] text-white`;

const btnOp = `${btnBase} border-[#64748b] bg-[#475569] text-white`;

const btnEq = `${btnBase} border-[#1d5a85] bg-[#2374ac] text-white`;

const btnAngleOn = `${btnBase} border-[#2374ac] bg-[#e8f2fa] font-bold text-[#2374ac]`;

const btnAngleOff = `${btnBase} border-[#E0E0E0] bg-[#f8fafc] text-[#64748b] hover:bg-[#f1f5f9]`;

export function ScientificCalculator() {
  const [expr, setExpr] = useState("");
  const [lastAns, setLastAns] = useState(0);
  const [memory, setMemory] = useState(0);
  const [angleMode, setAngleMode] = useState<AngleMode>("deg");
  const [freshResult, setFreshResult] = useState(false);
  const [mobileFunctionsOpen, setMobileFunctionsOpen] = useState(false);
  const angleRef = useRef<AngleMode>(angleMode);
  angleRef.current = angleMode;

  useEffect(() => {
    math.import(
      {
        sin: (x: math.MathType) => {
          const arg =
            angleRef.current === "deg"
              ? math.multiply(x, degToRadFactor)
              : x;
          return sinOrig(arg as never);
        },
        cos: (x: math.MathType) => {
          const arg =
            angleRef.current === "deg"
              ? math.multiply(x, degToRadFactor)
              : x;
          return cosOrig(arg as never);
        },
        tan: (x: math.MathType) => {
          const arg =
            angleRef.current === "deg"
              ? math.multiply(x, degToRadFactor)
              : x;
          return tanOrig(arg as never);
        },
      },
      { override: true, silent: true },
    );
  }, []);

  const evaluateRaw = useCallback(
    (s: string): number | null => {
      if (!s.trim() || s === "Error") return null;
      try {
        const r = math.evaluate(s, { ans: lastAns });
        return toNumber(r);
      } catch {
        return null;
      }
    },
    [lastAns],
  );

  const commitResult = useCallback((n: number) => {
    const t = formatResult(n);
    setExpr(t);
    setLastAns(n);
    setFreshResult(true);
  }, []);

  const onEquals = useCallback(() => {
    if (expr === "Error") return;
    const n = evaluateRaw(expr);
    if (n === null) {
      setExpr("Error");
      setFreshResult(false);
      return;
    }
    commitResult(n);
  }, [expr, evaluateRaw, commitResult]);

  const append = useCallback(
    (s: string) => {
      setExpr((prev) => {
        if (prev === "Error") return s;
        if (freshResult && /[\d.]/.test(s)) return s;
        if (freshResult && s === "(") return s;
        if (freshResult && /^[a-z]/.test(s)) return s;
        if (freshResult) return prev + s;
        return prev + s;
      });
      setFreshResult(false);
    },
    [freshResult],
  );

  const backspace = useCallback(() => {
    setExpr((prev) => {
      if (prev === "Error" || freshResult) return "";
      return prev.slice(0, -1);
    });
    setFreshResult(false);
  }, [freshResult]);

  const clearAll = useCallback(() => {
    setExpr("");
    setFreshResult(false);
  }, []);

  const displayText = expr === "" ? "0" : expr;

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="overflow-hidden rounded-md border border-[#E0E0E0] bg-white shadow-sm">
        <div
          className="flex min-h-[3.5rem] items-center justify-end border-b border-[#E0E0E0] bg-[#1e293b] px-4 py-3 font-mono text-lg font-semibold tabular-nums tracking-tight text-white sm:min-h-[4rem] sm:text-xl md:min-h-[2.625rem] md:py-2 md:text-lg md:leading-snug"
          aria-live="polite"
        >
          <span className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-right">
            {displayText}
          </span>
        </div>

        <div className="md:hidden">
          <button
            type="button"
            className="flex w-full items-center justify-between gap-3 border-b border-[#E8ECF0] bg-[#f8fafc] px-4 py-3 text-left transition-colors hover:bg-[#f1f5f9] active:bg-[#eef2f6]"
            aria-expanded={mobileFunctionsOpen}
            aria-controls="scientific-calculator-functions"
            onClick={() => setMobileFunctionsOpen((v) => !v)}
          >
            <span className="text-[13px] font-medium text-[#334155]">
              Scientific functions
            </span>
            <HiChevronDown
              className={`h-5 w-5 shrink-0 text-[#94a3b8] transition-transform duration-200 ease-out ${
                mobileFunctionsOpen ? "-rotate-180" : ""
              }`}
              aria-hidden
            />
          </button>
        </div>

        <div className="p-3 sm:p-4 md:p-4">
          <div className="flex flex-col gap-5 md:flex-row md:gap-0 md:divide-x md:divide-[#E0E0E0]">
            <section
              id="scientific-calculator-functions"
              className={`min-w-0 flex-1 md:pr-5 ${mobileFunctionsOpen ? "block" : "hidden md:block"}`}
            >
              <h2 className="mb-2.5 text-center text-[12px] font-semibold uppercase tracking-wide text-[#64748b] md:mb-1.5 md:text-left">
                Functions
              </h2>
              <div className="grid grid-cols-5 gap-2 md:gap-1.5">
                <button type="button" className={btnSci} onClick={() => append("sin(")}>
                  sin
                </button>
                <button type="button" className={btnSci} onClick={() => append("cos(")}>
                  cos
                </button>
                <button type="button" className={btnSci} onClick={() => append("tan(")}>
                  tan
                </button>
                <button
                  type="button"
                  className={angleMode === "deg" ? btnAngleOn : btnAngleOff}
                  onClick={() => setAngleMode("deg")}
                >
                  Deg
                </button>
                <button
                  type="button"
                  className={angleMode === "rad" ? btnAngleOn : btnAngleOff}
                  onClick={() => setAngleMode("rad")}
                >
                  Rad
                </button>

                <button type="button" className={btnSci} onClick={() => append("asin(")}>
                  sin⁻¹
                </button>
                <button type="button" className={btnSci} onClick={() => append("acos(")}>
                  cos⁻¹
                </button>
                <button type="button" className={btnSci} onClick={() => append("atan(")}>
                  tan⁻¹
                </button>
                <button type="button" className={btnSci} onClick={() => append("pi")}>
                  π
                </button>
                <button type="button" className={btnSci} onClick={() => append("e")}>
                  e
                </button>

                <button type="button" className={btnSci} onClick={() => append("^")}>
                  xʸ
                </button>
                <button type="button" className={btnSci} onClick={() => append("^3")}>
                  x³
                </button>
                <button type="button" className={btnSci} onClick={() => append("^2")}>
                  x²
                </button>
                <button type="button" className={btnSci} onClick={() => append("exp(")}>
                  eˣ
                </button>
                <button type="button" className={btnSci} onClick={() => append("10^(")}>
                  10ˣ
                </button>

                <button
                  type="button"
                  className={btnSci}
                  onClick={() => append("nthRoot(")}
                >
                  ʸ√x
                </button>
                <button type="button" className={btnSci} onClick={() => append("cbrt(")}>
                  ³√x
                </button>
                <button type="button" className={btnSci} onClick={() => append("sqrt(")}>
                  √
                </button>
                <button type="button" className={btnSci} onClick={() => append("log(")}>
                  ln
                </button>
                <button type="button" className={btnSci} onClick={() => append("log10(")}>
                  log
                </button>

                <button type="button" className={btnSci} onClick={() => append("(")}>
                  (
                </button>
                <button type="button" className={btnSci} onClick={() => append(")")}>
                  )
                </button>
                <button
                  type="button"
                  className={btnSci}
                  onClick={() => {
                    const n = evaluateRaw(expr === "Error" ? "" : expr);
                    if (n !== null && n !== 0) commitResult(1 / n);
                    else if (n === 0) setExpr("Error");
                  }}
                >
                  1/x
                </button>
                <button
                  type="button"
                  className={btnSci}
                  onClick={() => {
                    const n = evaluateRaw(expr === "Error" ? "" : expr);
                    if (n !== null) commitResult(n / 100);
                  }}
                >
                  %
                </button>
                <button
                  type="button"
                  className={btnSci}
                  onClick={() => {
                    const n = evaluateRaw(expr === "Error" ? "" : expr);
                    if (n === null) return;
                    const k = Math.round(n);
                    if (Math.abs(k - n) > 1e-9 || k < 0) {
                      setExpr("Error");
                      return;
                    }
                    try {
                      const r = math.factorial(k);
                      const out = toNumber(r);
                      if (out === null) setExpr("Error");
                      else commitResult(out);
                    } catch {
                      setExpr("Error");
                    }
                  }}
                >
                  n!
                </button>
              </div>
            </section>

            <section
              className={`min-w-0 flex-1 md:pl-5 md:border-t-0 md:pt-0 ${
                mobileFunctionsOpen
                  ? "border-t border-[#E0E0E0] pt-5"
                  : "border-t-0 pt-0"
              }`}
            >
              <h2 className="mb-2.5 text-center text-[12px] font-semibold uppercase tracking-wide text-[#64748b] md:mb-1.5 md:text-left">
                Numbers
              </h2>
              <div className="grid grid-cols-5 gap-2 md:gap-1.5">
                <button type="button" className={btnNum} onClick={() => append("7")}>
                  7
                </button>
                <button type="button" className={btnNum} onClick={() => append("8")}>
                  8
                </button>
                <button type="button" className={btnNum} onClick={() => append("9")}>
                  9
                </button>
                <button type="button" className={btnOp} onClick={backspace}>
                  Back
                </button>
                <button type="button" className={btnOp} onClick={clearAll}>
                  AC
                </button>

                <button type="button" className={btnNum} onClick={() => append("4")}>
                  4
                </button>
                <button type="button" className={btnNum} onClick={() => append("5")}>
                  5
                </button>
                <button type="button" className={btnNum} onClick={() => append("6")}>
                  6
                </button>
                <button type="button" className={btnOp} onClick={() => append("*")}>
                  ×
                </button>
                <button type="button" className={btnOp} onClick={() => append("/")}>
                  ÷
                </button>

                <button type="button" className={btnNum} onClick={() => append("1")}>
                  1
                </button>
                <button type="button" className={btnNum} onClick={() => append("2")}>
                  2
                </button>
                <button type="button" className={btnNum} onClick={() => append("3")}>
                  3
                </button>
                <button type="button" className={btnOp} onClick={() => append("-")}>
                  −
                </button>
                <button type="button" className={btnOp} onClick={() => append("+")}>
                  +
                </button>

                <button type="button" className={btnNum} onClick={() => append("0")}>
                  0
                </button>
                <button type="button" className={btnNum} onClick={() => append(".")}>
                  .
                </button>
                <button type="button" className={btnOp} onClick={() => append("E")}>
                  EXP
                </button>
                <button
                  type="button"
                  className={btnOp}
                  onClick={() => {
                    const n = evaluateRaw(expr === "Error" ? "" : expr);
                    if (n !== null) setMemory((m) => m + n);
                  }}
                >
                  M+
                </button>
                <button type="button" className={btnOp} onClick={() => append("ans")}>
                  Ans
                </button>

                <button
                  type="button"
                  className={btnOp}
                  onClick={() => {
                    const n = evaluateRaw(expr === "Error" ? "" : expr);
                    if (n !== null) commitResult(-n);
                  }}
                >
                  ±
                </button>
                <button
                  type="button"
                  className={btnOp}
                  onClick={() => {
                    try {
                      const r = math.random();
                      commitResult(typeof r === "number" ? r : toNumber(r) ?? 0);
                    } catch {
                      setExpr("Error");
                    }
                  }}
                >
                  RND
                </button>
                <button
                  type="button"
                  className={btnOp}
                  onClick={() => {
                    const n = evaluateRaw(expr === "Error" ? "" : expr);
                    if (n !== null) setMemory((m) => m - n);
                  }}
                >
                  M−
                </button>
                <button
                  type="button"
                  className={btnOp}
                  onClick={() => append(String(memory))}
                >
                  MR
                </button>
                <button type="button" className={btnEq} onClick={onEquals}>
                  =
                </button>
              </div>
            </section>
          </div>
        </div>

        <p className="border-t border-[#E8ECF0] bg-[#f8fafc] px-4 py-3 text-center text-[11px] leading-relaxed text-[#64748b] sm:text-[12px] md:py-2">
          Deg / Rad affects sin, cos, and tan. Inverse functions use radians
          (mathjs).
        </p>
      </div>
    </div>
  );
}
