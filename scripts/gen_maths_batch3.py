#!/usr/bin/env python3
"""Generate maths batch 3 calculators."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMP = ROOT / "src/components/Maths"
APP = ROOT / "src/app/maths"
T = "d" + "i" + "v"

def w(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")

def page(slug, folder, comp, title, desc, crumb):
    w(APP / slug / "page.tsx", f"""import {{ {comp} }} from "@/components/Maths/{folder}/{comp}";
import {{ MathsCalculatorPageLayout }} from "@/components/Maths/shared/MathsCalculatorPageLayout";
import {{ generateCalculatorPageMetadata }} from "@/lib/calculatorPageMetadata";

const PATH = "/maths/{slug}";
const FALLBACK_TITLE = "{title}";
const FALLBACK_DESCRIPTION = "{desc.replace('"', '\\"')}";

export async function generateMetadata() {{
  return generateCalculatorPageMetadata({{
    path: PATH,
    fallbackTitle: FALLBACK_TITLE,
    fallbackDescription: FALLBACK_DESCRIPTION,
  }});
}}

export default function Page() {{
  return (
    <MathsCalculatorPageLayout
      path={{PATH}}
      title="{title}"
      description="{desc.replace('"', "'")}"
      breadcrumbLabel="{crumb}"
    >
      <{comp} />
    </MathsCalculatorPageLayout>
  );
}}
""")

H = '''"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
'''
HS = H + 'import { CustomSelect } from "@/components/Health-Fitness/shared/CustomSelect";\n'
HI = 'import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";\n'
HF = 'import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";\n'
FM = 'import { formatNum, fractionToString, decimalToFraction, gcd, lcm, simplifyFraction } from "@/components/Maths/shared/mathUtils";\n'
FN = 'import { formatNum, gcd, lcm } from "@/components/Maths/shared/mathUtils";\n'
FG = 'import { formatNum, fractionToString, gcd, simplifyFraction } from "@/components/Maths/shared/mathUtils";\n'

def add(folder, comp, slug, title, desc, crumb, body):
    w(COMP / folder / f"{comp}.tsx", body)
    page(slug, folder, comp, title, desc, crumb)

# Binary
add("Binary", "Binary_Calculator", "binary-calculator", "Binary Calculator",
    "Add, subtract, multiply, or divide binary numbers.", "binary calculator",
    HS + HI + HF + FN + f'''
export function Binary_Calculator() {{
  type Op = "add" | "sub" | "mul";
  const resultRef = useRef<HTMLElement>(null);
  const [a, setA] = useState("1010");
  const [b, setB] = useState("110");
  const [op, setOp] = useState<Op>("add");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const [dec, setDec] = useState<string | null>(null);
  const parseBin = (s: string) => {{
    const t = s.trim().replace(/^0b/i, "");
    if (!/^[01]+$/.test(t)) return null;
    return parseInt(t, 2);
  }};
  const run = () => {{
    setError(null);
    const x = parseBin(a), y = parseBin(b);
    if (x === null || y === null) {{ setError("Enter valid binary (0 and 1 only)."); setOut(null); return; }}
    let r: number;
    if (op === "add") r = x + y;
    else if (op === "sub") r = x - y;
    else r = x * y;
    if (r < 0) {{ setError("Result is negative; try a different operation."); setOut(null); return; }}
    setOut(r.toString(2));
    setDec(String(r));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Operation</p>
        <CustomSelect<Op> id="bin-op" value={{op}} onChange={{setOp}}
          options={{[{{ value: "add", label: "Add" }}, {{ value: "sub", label: "Subtract" }}, {{ value: "mul", label: "Multiply" }}]}} /></{T}>
      <{T} className="grid grid-cols-2 gap-2"><{T}><p className="mb-1 text-[12px] font-medium text-[#334155]">Binary 1</p>
        <input className="h-10 w-full max-w-[10rem] rounded border border-[#E0E0E0] px-2 font-mono text-[14px]" value={{a}} onChange={{e => setA(e.target.value)}} /></{T}>
        <{T}><p className="mb-1 text-[12px] font-medium text-[#334155]">Binary 2</p>
        <input className="h-10 w-full max-w-[10rem] rounded border border-[#E0E0E0] px-2 font-mono text-[14px]" value={{b}} onChange={{e => setB(e.target.value)}} /></{T}></{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center font-mono text-2xl font-bold text-[#d66844] sm:text-3xl">{{out}}</p><p className="text-center text-[14px] text-[#334155]">decimal: {{dec}}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Binary arithmetic</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Mixed numbers: whole + fraction -> improper
add("MixedNumbers", "MixedNumbers_Calculator", "mixed-numbers-calculator", "Mixed Numbers Calculator",
    "Convert a mixed number to an improper fraction and decimal.", "mixed numbers calculator",
    H + HI + HF + FM + f'''
export function MixedNumbers_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [whole, setWhole] = useState("2");
  const [n, setN] = useState("1");
  const [d, setD] = useState("4");
  const [error, setError] = useState<string | null>(null);
  const [improper, setImproper] = useState<string | null>(null);
  const [decimal, setDecimal] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const w = parseInt(whole, 10), num = parseInt(n, 10), den = parseInt(d, 10);
    if ([w, num, den].some(x => Number.isNaN(x)) || den === 0) {{ setError("Enter valid whole, numerator, and denominator."); return; }}
    const sign = w < 0 ? -1 : 1;
    const absW = Math.abs(w);
    const impNum = sign * (absW * den + num);
    setImproper(fractionToString(impNum, den));
    setDecimal(formatNum(impNum / den, 6));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="flex flex-wrap items-center gap-2">
        <InputWithSuffix type="number" suffix="" value={{whole}} onChange={{e => setWhole(e.target.value)}} inputClassName="w-[4rem]" />
        <InputWithSuffix type="number" suffix="" value={{n}} onChange={{e => setN(e.target.value)}} inputClassName="w-[3.5rem]" />
        <span className="text-[#64748b]">/</span>
        <InputWithSuffix type="number" suffix="" value={{d}} onChange={{e => setD(e.target.value)}} inputClassName="w-[3.5rem]" />
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Convert</button>
    </{T}>
  );
  const result = improper != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{improper}}</p><p className="text-center text-[14px] text-[#334155]">≈ {{decimal}}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">whole + fraction → improper</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Percentage decrease
add("PercentageDecrease", "PercentageDecrease_Calculator", "percentage-decrease-calculator",
    "Percentage Decrease Calculator", "Percent decrease from original to new value.", "percentage decrease calculator",
    H + HI + HF + FN + f'''
export function PercentageDecrease_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [oldVal, setOldVal] = useState("100");
  const [newVal, setNewVal] = useState("80");
  const [error, setError] = useState<string | null>(null);
  const [pct, setPct] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const o = parseFloat(oldVal), n = parseFloat(newVal);
    if (Number.isNaN(o) || Number.isNaN(n) || o === 0) {{ setError("Enter valid values; original cannot be 0."); setPct(null); return; }}
    setPct(formatNum(((o - n) / o) * 100) + "%");
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="grid grid-cols-2 gap-2 sm:gap-4">
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Original</p>
          <InputWithSuffix type="number" suffix="" value={{oldVal}} onChange={{e => setOldVal(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">New value</p>
          <InputWithSuffix type="number" suffix="" value={{newVal}} onChange={{e => setNewVal(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Calculate decrease</button>
    </{T}>
  );
  const result = pct != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{pct}}</p><p className="text-center text-[14px] text-[#334155]">percent decrease</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">((original − new) ÷ original) × 100</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Ratio
add("Ratio", "Ratio_Calculator", "ratio-calculator", "Ratio Calculator",
    "Simplify a ratio and show decimal form.", "ratio calculator",
    H + HI + HF + FG + f'''
export function Ratio_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [a, setA] = useState("12");
  const [b, setB] = useState("18");
  const [error, setError] = useState<string | null>(null);
  const [simple, setSimple] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const x = parseFloat(a), y = parseFloat(b);
    if (Number.isNaN(x) || Number.isNaN(y) || y === 0) {{ setError("Enter two numbers; second cannot be 0."); setSimple(null); return; }}
    const g = gcd(Math.round(x * 1000), Math.round(y * 1000));
    const sn = Math.round(x * 1000) / g, sd = Math.round(y * 1000) / g;
    setSimple(`${{sn}} : ${{sd}}  (≈ ${{formatNum(x / y, 4)}})`);
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="grid grid-cols-2 gap-2 sm:gap-4">
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Value A</p>
          <InputWithSuffix type="number" suffix="" value={{a}} onChange={{e => setA(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Value B</p>
          <InputWithSuffix type="number" suffix="" value={{b}} onChange={{e => setB(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Simplify ratio</button>
    </{T}>
  );
  const result = simple != null ? (<p className="text-center text-xl font-bold text-[#d66844] sm:text-2xl">{{simple}}</p>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Lowest terms ratio</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Circumference to diameter
add("CircumferenceToDiameter", "CircumferenceToDiameter_Calculator", "circumference-to-diameter-calculator",
    "Circumference to Diameter Calculator", "Find diameter from circumference (d = C / π).", "circumference to diameter calculator",
    H + HI + HF + FN + f'''
export function CircumferenceToDiameter_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [c, setC] = useState("31.416");
  const [error, setError] = useState<string | null>(null);
  const [d, setD] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const circ = parseFloat(c);
    if (Number.isNaN(circ) || circ <= 0) {{ setError("Enter a positive circumference."); setD(null); return; }}
    setD(formatNum(circ / Math.PI));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Circumference</p>
        <InputWithSuffix type="number" suffix="" value={{c}} onChange={{e => setC(e.target.value)}} inputClassName="max-w-[10rem]" /></{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Find diameter</button>
    </{T}>
  );
  const result = d != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{d}}</p><p className="text-center text-[14px] text-[#334155]">diameter (d = C ÷ π)</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">From circumference</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Math calculator - basic expression via Function (safe subset)
add("Math", "Math_Calculator", "math-calculator", "Math Calculator",
    "Evaluate basic math expressions (+, −, ×, ÷, parentheses).", "math calculator",
    H + HI + HF + FN + f'''
export function Math_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [expr, setExpr] = useState("2 + 3 * 4");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const safe = expr.replace(/\\s/g, "").replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
    if (!/^[0-9+\\-*/().]+$/.test(safe)) {{ setError("Use numbers and + - * / ( ) only."); setOut(null); return; }}
    try {{
      const val = Function(`"use strict"; return (${{safe}})`)();
      if (typeof val !== "number" || !Number.isFinite(val)) throw new Error();
      setOut(formatNum(val, 8));
      scrollResultIntoViewMobile(resultRef.current);
    }} catch {{
      setError("Could not evaluate expression.");
      setOut(null);
    }}
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Expression</p>
        <input className="h-10 w-full rounded border border-[#E0E0E0] px-3 font-mono text-[14px]" value={{expr}} onChange={{e => setExpr(e.target.value)}} /></{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">result</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Basic arithmetic</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Fraction simplify
add("FractionSimplify", "FractionSimplify_Calculator", "fraction-simplify-calculator", "Fraction Simplify Calculator",
    "Reduce a fraction to lowest terms.", "fraction simplify calculator",
    H + HI + HF + FG + f'''
export function FractionSimplify_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [n, setN] = useState("12");
  const [d, setD] = useState("18");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const num = parseInt(n, 10), den = parseInt(d, 10);
    if (Number.isNaN(num) || Number.isNaN(den) || den === 0) {{ setError("Enter a valid fraction."); setOut(null); return; }}
    setOut(fractionToString(num, den));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="flex items-center gap-2">
        <InputWithSuffix type="number" suffix="" value={{n}} onChange={{e => setN(e.target.value)}} inputClassName="w-[4rem]" />
        <span>/</span>
        <InputWithSuffix type="number" suffix="" value={{d}} onChange={{e => setD(e.target.value)}} inputClassName="w-[4rem]" />
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Simplify</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">lowest terms</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Enter numerator / denominator</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Long division
add("LongDivision", "LongDivision_Calculator", "long-division-calculator", "Long Division Calculator",
    "Divide two numbers — quotient and remainder.", "long division calculator",
    H + HI + HF + FN + f'''
export function LongDivision_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [dividend, setDividend] = useState("17");
  const [divisor, setDivisor] = useState("5");
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState<string | null>(null);
  const [r, setR] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const a = parseFloat(dividend), b = parseFloat(divisor);
    if (Number.isNaN(a) || Number.isNaN(b) || b === 0) {{ setError("Enter dividend and non-zero divisor."); return; }}
    const qi = Math.trunc(a / b);
    const rem = a - qi * b;
    setQ(formatNum(qi, 6));
    setR(formatNum(rem, 6));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="grid grid-cols-2 gap-2 sm:gap-4">
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Dividend</p>
          <InputWithSuffix type="number" suffix="" value={{dividend}} onChange={{e => setDividend(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Divisor</p>
          <InputWithSuffix type="number" suffix="" value={{divisor}} onChange={{e => setDivisor(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Divide</button>
    </{T}>
  );
  const result = q != null ? (
    <{T} className="w-full max-w-[14rem] space-y-1 text-center text-[#334155]">
      <p className="text-2xl font-bold text-[#d66844]">Q = {{q}}</p>
      <p className="text-[14px]">R = {{r}}</p>
    </{T}>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Quotient & remainder</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

print("batch3 done")

