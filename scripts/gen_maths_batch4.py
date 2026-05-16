#!/usr/bin/env python3
"""Generate maths batch 4 calculators."""
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

def alias_page(slug, folder, comp, title, desc, crumb):
    page(slug, folder, comp, title, desc, crumb)

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
FN = 'import { formatNum, gcd, lcm, lcmList, combinations, primeFactors } from "@/components/Maths/shared/mathUtils";\n'
FM = 'import { formatNum, fractionToString, gcd, lcm, lcmList, combinations, primeFactors } from "@/components/Maths/shared/mathUtils";\n'

def add(folder, comp, slug, title, desc, crumb, body):
    w(COMP / folder / f"{comp}.tsx", body)
    page(slug, folder, comp, title, desc, crumb)

# Square roots
add("SquareRoots", "SquareRoots_Calculator", "square-roots-calculator", "Square Roots Calculator",
    "Square root and other roots of a number.", "square roots calculator",
    HS + HI + HF + FN + f'''
export function SquareRoots_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [n, setN] = useState("144");
  const [error, setError] = useState<string | null>(null);
  const [sqrtOut, setSqrtOut] = useState<string | null>(null);
  const [cbrtOut, setCbrtOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const x = parseFloat(n);
    if (Number.isNaN(x)) {{ setError("Enter a valid number."); setSqrtOut(null); setCbrtOut(null); return; }}
    if (x < 0) {{ setError("Square root requires a non-negative number."); setSqrtOut(null); setCbrtOut(null); return; }}
    setSqrtOut(formatNum(Math.sqrt(x), 8));
    setCbrtOut(formatNum(Math.cbrt(x), 8));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Number</p>
        <InputWithSuffix type="number" suffix="" value={{n}} onChange={{e => setN(e.target.value)}} inputClassName="max-w-[10rem]" /></{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = sqrtOut != null ? (
    <{T} className="space-y-1 text-center">
      <p className="text-2xl font-bold text-[#d66844]">√x = {{sqrtOut}}</p>
      <p className="text-[14px] text-[#334155]">∛x = {{cbrtOut}}</p>
    </{T}>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Square & cube root</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Kinetic energy KE = 0.5 m v^2
add("Kinetic", "Kinetic_Calculator", "kinetic-energy-calculator", "Kinetic Energy Calculator",
    "Kinetic energy from mass and velocity (KE = ½mv²).", "kinetic energy calculator",
    H + HI + HF + FN + f'''
export function Kinetic_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [mass, setMass] = useState("10");
  const [velocity, setVelocity] = useState("5");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const m = parseFloat(mass), v = parseFloat(velocity);
    if (Number.isNaN(m) || Number.isNaN(v) || m < 0) {{ setError("Enter non-negative mass and velocity."); setOut(null); return; }}
    setOut(formatNum(0.5 * m * v * v));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="grid grid-cols-2 gap-2 sm:gap-4">
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155]">Mass (kg)</p>
          <InputWithSuffix type="number" suffix="" value={{mass}} onChange={{e => setMass(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155]">Velocity (m/s)</p>
          <InputWithSuffix type="number" suffix="" value={{velocity}} onChange={{e => setVelocity(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}} J</p><p className="text-center text-[14px] text-[#334155]">KE = ½mv²</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Kinetic energy</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Roofing: footprint L×W with pitch rise per 12 run
add("Roofing", "Roofing_Calculator", "roofing-calculator", "Roofing Calculator",
    "Estimate roof area from footprint and pitch.", "roofing calculator",
    H + HI + HF + FN + f'''
export function Roofing_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [length, setLength] = useState("40");
  const [width, setWidth] = useState("30");
  const [pitch, setPitch] = useState("6");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const l = parseFloat(length), w = parseFloat(width), p = parseFloat(pitch);
    if ([l, w, p].some(v => Number.isNaN(v)) || l <= 0 || w <= 0 || p < 0) {{
      setError("Enter positive length, width, and pitch (rise per 12 in run).");
      setOut(null);
      return;
    }}
    const factor = Math.sqrt(1 + (p / 12) ** 2);
    setOut(formatNum(l * w * factor));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="grid grid-cols-2 gap-2 sm:gap-4">
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155]">Length (ft)</p>
          <InputWithSuffix type="number" suffix="" value={{length}} onChange={{e => setLength(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155]">Width (ft)</p>
          <InputWithSuffix type="number" suffix="" value={{width}} onChange={{e => setWidth(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
      </{T}>
      <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155]">Pitch (rise / 12 run)</p>
        <InputWithSuffix type="number" suffix="/12" value={{pitch}} onChange={{e => setPitch(e.target.value)}} inputClassName="max-w-[8rem]" /></{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Estimate area</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}} ft²</p><p className="text-center text-[14px] text-[#334155]">roof surface area</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Footprint × slope factor</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Circle all-in-one
add("Circle", "Circle_Calculator", "circle-calculator", "Circle Calculator",
    "Diameter, circumference, and area from radius.", "circle calculator",
    H + HI + HF + FN + f'''
export function Circle_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [r, setR] = useState("5");
  const [error, setError] = useState<string | null>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const run = () => {{
    setError(null);
    const radius = parseFloat(r);
    if (Number.isNaN(radius) || radius <= 0) {{ setError("Enter a positive radius."); setLines(null); return; }}
    setLines([
      `d = ${{formatNum(2 * radius)}}`,
      `C = ${{formatNum(2 * Math.PI * radius)}}`,
      `A = ${{formatNum(Math.PI * radius * radius)}}`,
    ]);
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155]">Radius</p>
        <InputWithSuffix type="number" suffix="" value={{r}} onChange={{e => setR(e.target.value)}} inputClassName="max-w-[10rem]" /></{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = lines != null ? (
    <{T} className="space-y-1 text-center text-[#334155]">
      {{lines.map((l, i) => <p key={{i}} className={{i === 2 ? "text-2xl font-bold text-[#d66844]" : "text-[14px]"}}>{{l}}</p>)}}
    </{T}>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">d, C, A from r</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Graph - linear / quadratic table
add("Graph", "Graph_Calculator", "graph-calculator", "Graph Calculator",
    "Plot values for y = mx + b or y = ax².", "graph calculator",
    HS + HI + HF + FN + f'''
type FnType = "linear" | "quadratic";
export function Graph_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [fnType, setFnType] = useState<FnType>("linear");
  const [m, setM] = useState("2");
  const [b, setB] = useState("1");
  const [a, setA] = useState("1");
  const [xMin, setXMin] = useState("-2");
  const [xMax, setXMax] = useState("2");
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<string[] | null>(null);
  const run = () => {{
    setError(null);
    const lo = parseFloat(xMin), hi = parseFloat(xMax);
    if (Number.isNaN(lo) || Number.isNaN(hi) || lo >= hi) {{ setError("x min must be less than x max."); setRows(null); return; }}
    const pts: string[] = [];
    const steps = 5;
    for (let i = 0; i <= steps; i++) {{
      const x = lo + (i / steps) * (hi - lo);
      let y: number;
      if (fnType === "linear") {{
        const slope = parseFloat(m), intercept = parseFloat(b);
        if (Number.isNaN(slope) || Number.isNaN(intercept)) {{ setError("Enter valid m and b."); setRows(null); return; }}
        y = slope * x + intercept;
      }} else {{
        const coef = parseFloat(a);
        if (Number.isNaN(coef)) {{ setError("Enter valid a."); setRows(null); return; }}
        y = coef * x * x;
      }}
      pts.push(`(${{formatNum(x, 2)}}, ${{formatNum(y, 2)}})`);
    }}
    setRows(pts);
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CustomSelect<FnType> id="graph-fn" value={{fnType}} onChange={{setFnType}}
        options={{[{{ value: "linear", label: "y = mx + b" }}, {{ value: "quadratic", label: "y = ax²" }}]}} />
      {{fnType === "linear" ? (
        <{T} className="flex gap-2">
          <InputWithSuffix type="number" suffix="" value={{m}} onChange={{e => setM(e.target.value)}} inputClassName="w-[4rem]" />
          <span className="self-center text-[#64748b]">x +</span>
          <InputWithSuffix type="number" suffix="" value={{b}} onChange={{e => setB(e.target.value)}} inputClassName="w-[4rem]" />
        </{T}>
      ) : (
        <{T}><InputWithSuffix type="number" suffix="" value={{a}} onChange={{e => setA(e.target.value)}} inputClassName="w-[4rem]" />
          <span className="ml-1 text-[#64748b]">x²</span></{T}>
      )}}
      <{T} className="grid grid-cols-2 gap-2">
        <InputWithSuffix type="number" suffix="" value={{xMin}} onChange={{e => setXMin(e.target.value)}} inputClassName="w-full" />
        <InputWithSuffix type="number" suffix="" value={{xMax}} onChange={{e => setXMax(e.target.value)}} inputClassName="w-full" />
      </{T}>
      <p className="text-[12px] text-[#64748b]">x min / x max</p>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Plot points</button>
    </{T}>
  );
  const result = rows != null ? (
    <{T} className="max-w-[14rem] text-center text-[13px] leading-relaxed text-[#334155]">
      {{rows.map((row, i) => <p key={{i}} className={{i === Math.floor(rows.length / 2) ? "font-bold text-[#d66844]" : ""}}>{{row}}</p>)}}
    </{T}>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Sample (x, y) points</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Sphere volume
add("SphereVolume", "SphereVolume_Calculator", "sphere-volume-calculator", "Sphere Volume Calculator",
    "Volume of a sphere from radius (⁴⁄₃πr³).", "sphere volume calculator",
    H + HI + HF + FN + f'''
export function SphereVolume_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [r, setR] = useState("5");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const radius = parseFloat(r);
    if (Number.isNaN(radius) || radius <= 0) {{ setError("Enter a positive radius."); setOut(null); return; }}
    setOut(formatNum((4 / 3) * Math.PI * radius ** 3));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155]">Radius</p>
        <InputWithSuffix type="number" suffix="" value={{r}} onChange={{e => setR(e.target.value)}} inputClassName="max-w-[10rem]" /></{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">V = ⁴⁄₃πr³</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Sphere volume</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Hypotenuse (alias of pythagorean - dedicated page)
add("Hypotenuse", "Hypotenuse_Calculator", "hypotenuse-calculator", "Hypotenuse Calculator",
    "Find the hypotenuse of a right triangle from two legs.", "hypotenuse calculator",
    H + HI + HF + FN + f'''
export function Hypotenuse_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [a, setA] = useState("3");
  const [b, setB] = useState("4");
  const [error, setError] = useState<string | null>(null);
  const [c, setC] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const x = parseFloat(a), y = parseFloat(b);
    if (Number.isNaN(x) || Number.isNaN(y) || x <= 0 || y <= 0) {{ setError("Enter positive leg lengths."); setC(null); return; }}
    setC(formatNum(Math.sqrt(x * x + y * y)));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="grid grid-cols-2 gap-2 sm:gap-4">
        <InputWithSuffix type="number" suffix="" value={{a}} onChange={{e => setA(e.target.value)}} inputClassName="w-full max-w-[9rem]" />
        <InputWithSuffix type="number" suffix="" value={{b}} onChange={{e => setB(e.target.value)}} inputClassName="w-full max-w-[9rem]" />
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Find hypotenuse</button>
    </{T}>
  );
  const result = c != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{c}}</p><p className="text-center text-[14px] text-[#334155]">c = √(a² + b²)</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Right triangle</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Radius from circumference or area
add("RadiusOfCircle", "RadiusOfCircle_Calculator", "radius-of-circle-calculator", "Radius of a Circle Calculator",
    "Find radius from circumference or area.", "radius of a circle calculator",
    HS + HI + HF + FN + f'''
type Mode = "fromC" | "fromA";
export function RadiusOfCircle_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>("fromC");
  const [val, setVal] = useState("31.416");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const v = parseFloat(val);
    if (Number.isNaN(v) || v <= 0) {{ setError("Enter a positive value."); setOut(null); return; }}
    setOut(formatNum(mode === "fromC" ? v / (2 * Math.PI) : Math.sqrt(v / Math.PI)));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CustomSelect<Mode> id="r-mode" value={{mode}} onChange={{setMode}}
        options={{[{{ value: "fromC", label: "From circumference" }}, {{ value: "fromA", label: "From area" }}]}} />
      <InputWithSuffix type="number" suffix="" value={{val}} onChange={{e => setVal(e.target.value)}} inputClassName="max-w-[10rem]" />
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Find radius</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">r = {{out}}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">r from C or A</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Combinations
add("Combinations", "Combinations_Calculator", "combinations-calculator", "Combinations Calculator",
    "Combinations n choose r (nCr).", "combinations calculator",
    H + HI + HF + FN + f'''
export function Combinations_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [n, setN] = useState("10");
  const [r, setR] = useState("3");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const nn = parseInt(n, 10), rr = parseInt(r, 10);
    if (Number.isNaN(nn) || Number.isNaN(rr) || nn < 0 || rr < 0) {{ setError("Enter non-negative integers."); setOut(null); return; }}
    const c = combinations(nn, rr);
    if (!Number.isFinite(c)) {{ setError("Result too large."); setOut(null); return; }}
    setOut(String(c));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b]">C(n, r) = n! / (r!(n−r)!)</p>
      <{T} className="grid grid-cols-2 gap-2">
        <InputWithSuffix type="number" suffix="" value={{n}} onChange={{e => setN(e.target.value)}} inputClassName="w-full max-w-[9rem]" />
        <InputWithSuffix type="number" suffix="" value={{r}} onChange={{e => setR(e.target.value)}} inputClassName="w-full max-w-[9rem]" />
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">combinations</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">n choose r</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Circle diameter from radius or circumference
add("CircleDiameter", "CircleDiameter_Calculator", "circle-diameter-calculator", "Circle Diameter Calculator",
    "Diameter from radius or circumference.", "circle diameter calculator",
    HS + HI + HF + FN + f'''
type DMode = "fromR" | "fromC";
export function CircleDiameter_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<DMode>("fromR");
  const [val, setVal] = useState("5");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const v = parseFloat(val);
    if (Number.isNaN(v) || v <= 0) {{ setError("Enter a positive value."); setOut(null); return; }}
    setOut(formatNum(mode === "fromR" ? 2 * v : v / Math.PI));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CustomSelect<DMode> id="d-mode" value={{mode}} onChange={{setMode}}
        options={{[{{ value: "fromR", label: "From radius" }}, {{ value: "fromC", label: "From circumference" }}]}} />
      <InputWithSuffix type="number" suffix="" value={{val}} onChange={{e => setVal(e.target.value)}} inputClassName="max-w-[10rem]" />
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Find diameter</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">d = {{out}}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Circle diameter</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# LCD of denominators
add("Lcd", "Lcd_Calculator", "lcd-calculator", "LCD Calculator",
    "Least common denominator of two or three fractions.", "lcd calculator",
    H + HI + HF + FM + f'''
export function Lcd_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [d1, setD1] = useState("4");
  const [d2, setD2] = useState("6");
  const [d3, setD3] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const denoms: number[] = [];
    for (const s of [d1, d2, d3]) {{
      if (!s.trim()) continue;
      const v = parseInt(s, 10);
      if (Number.isNaN(v) || v === 0) {{ setError("Enter non-zero integer denominators."); setOut(null); return; }}
      denoms.push(Math.abs(v));
    }}
    if (denoms.length < 2) {{ setError("Enter at least two denominators."); setOut(null); return; }}
    setOut(String(lcmList(denoms)));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b]">Denominators (optional third)</p>
      <{T} className="flex flex-wrap gap-2">
        <InputWithSuffix type="number" suffix="" value={{d1}} onChange={{e => setD1(e.target.value)}} inputClassName="w-[4rem]" />
        <InputWithSuffix type="number" suffix="" value={{d2}} onChange={{e => setD2(e.target.value)}} inputClassName="w-[4rem]" />
        <InputWithSuffix type="number" suffix="" value={{d3}} onChange={{e => setD3(e.target.value)}} inputClassName="w-[4rem]" />
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Find LCD</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">least common denominator</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">LCM of denominators</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Winning percentage
add("WinningPercentage", "WinningPercentage_Calculator", "winning-percentage-calculator", "Winning Percentage Calculator",
    "Winning percentage from wins and losses.", "winning percentage calculator",
    H + HI + HF + FN + f'''
export function WinningPercentage_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [wins, setWins] = useState("45");
  const [losses, setLosses] = useState("37");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const w = parseFloat(wins), l = parseFloat(losses);
    if (Number.isNaN(w) || Number.isNaN(l) || w < 0 || l < 0) {{ setError("Enter non-negative wins and losses."); setOut(null); return; }}
    const total = w + l;
    if (total === 0) {{ setError("Total games cannot be 0."); setOut(null); return; }}
    setOut(formatNum((w / total) * 100) + "%");
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="grid grid-cols-2 gap-2 sm:gap-4">
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155]">Wins</p>
          <InputWithSuffix type="number" suffix="" value={{wins}} onChange={{e => setWins(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155]">Losses</p>
          <InputWithSuffix type="number" suffix="" value={{losses}} onChange={{e => setLosses(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">wins ÷ (wins + losses)</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Win %</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Semicircle area
add("SemicircleArea", "SemicircleArea_Calculator", "semicircle-area-calculator", "Semicircle Area Calculator",
    "Area of a semicircle from radius (½πr²).", "semicircle area calculator",
    H + HI + HF + FN + f'''
export function SemicircleArea_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [r, setR] = useState("5");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const radius = parseFloat(r);
    if (Number.isNaN(radius) || radius <= 0) {{ setError("Enter a positive radius."); setOut(null); return; }}
    setOut(formatNum(0.5 * Math.PI * radius * radius));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <InputWithSuffix type="number" suffix="" value={{r}} onChange={{e => setR(e.target.value)}} inputClassName="max-w-[10rem]" />
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">A = ½πr²</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Semicircle area</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Prime factors
add("PrimeFactors", "PrimeFactors_Calculator", "prime-factors-calculator", "Prime Factors Calculator",
    "Prime factorization of an integer.", "prime factors calculator",
    H + HI + HF + FN + f'''
export function PrimeFactors_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [n, setN] = useState("360");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const x = parseInt(n, 10);
    if (Number.isNaN(x) || x < 2) {{ setError("Enter an integer ≥ 2."); setOut(null); return; }}
    const factors = primeFactors(x);
    setOut(factors.length ? factors.join(" × ") : "—");
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <InputWithSuffix type="number" suffix="" value={{n}} onChange={{e => setN(e.target.value)}} inputClassName="max-w-[10rem]" />
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Factorize</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-xl font-bold text-[#d66844] sm:text-2xl">{{out}}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Prime factors</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Triangle area (base × height / 2)
add("TriangleArea", "TriangleArea_Calculator", "triangle-area-calculator", "Triangle Area Calculator",
    "Triangle area from base and height.", "triangle area calculator",
    H + HI + HF + FN + f'''
export function TriangleArea_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [base, setBase] = useState("10");
  const [height, setHeight] = useState("6");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const b = parseFloat(base), h = parseFloat(height);
    if (Number.isNaN(b) || Number.isNaN(h) || b <= 0 || h <= 0) {{ setError("Enter positive base and height."); setOut(null); return; }}
    setOut(formatNum(0.5 * b * h));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="grid grid-cols-2 gap-2">
        <InputWithSuffix type="number" suffix="" value={{base}} onChange={{e => setBase(e.target.value)}} inputClassName="w-full max-w-[9rem]" />
        <InputWithSuffix type="number" suffix="" value={{height}} onChange={{e => setHeight(e.target.value)}} inputClassName="w-full max-w-[9rem]" />
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">A = ½bh</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">½ × base × height</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Cone volume
add("ConeVolume", "ConeVolume_Calculator", "cone-volume-calculator", "Cone Volume Calculator",
    "Volume of a cone from radius and height (⅓πr²h).", "cone volume calculator",
    H + HI + HF + FN + f'''
export function ConeVolume_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [r, setR] = useState("3");
  const [h, setH] = useState("10");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const radius = parseFloat(r), height = parseFloat(h);
    if (Number.isNaN(radius) || Number.isNaN(height) || radius <= 0 || height <= 0) {{
      setError("Enter positive radius and height.");
      setOut(null);
      return;
    }}
    setOut(formatNum((1 / 3) * Math.PI * radius * radius * height));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="grid grid-cols-2 gap-2">
        <InputWithSuffix type="number" suffix="" value={{r}} onChange={{e => setR(e.target.value)}} inputClassName="w-full max-w-[9rem]" />
        <InputWithSuffix type="number" suffix="" value={{h}} onChange={{e => setH(e.target.value)}} inputClassName="w-full max-w-[9rem]" />
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">V = ⅓πr²h</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Cone volume</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Percent to decimal
add("PercentToDecimal", "PercentToDecimal_Calculator", "percent-to-decimal-calculator", "Percent to Decimal Calculator",
    "Convert a percent to a decimal.", "percent to decimal calculator",
    H + HI + HF + FN + f'''
export function PercentToDecimal_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [pct, setPct] = useState("25");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const raw = pct.replace(/%/g, "").trim();
    const x = parseFloat(raw);
    if (Number.isNaN(x)) {{ setError("Enter a valid percent."); setOut(null); return; }}
    setOut(formatNum(x / 100, 8));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <InputWithSuffix type="number" suffix="%" value={{pct}} onChange={{e => setPct(e.target.value)}} inputClassName="max-w-[10rem]" />
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Convert</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">decimal</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">÷ 100</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Trigonometry
add("Trigonometry", "Trigonometry_Calculator", "trigonometry-calculator", "Trigonometry Calculator",
    "sin, cos, and tan for an angle in degrees.", "trigonometry calculator",
    H + HI + HF + FN + f'''
export function Trigonometry_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [deg, setDeg] = useState("30");
  const [error, setError] = useState<string | null>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const run = () => {{
    setError(null);
    const d = parseFloat(deg);
    if (Number.isNaN(d)) {{ setError("Enter angle in degrees."); setLines(null); return; }}
    const rad = (d * Math.PI) / 180;
    setLines([
      `sin = ${{formatNum(Math.sin(rad), 6)}}`,
      `cos = ${{formatNum(Math.cos(rad), 6)}}`,
      `tan = ${{formatNum(Math.tan(rad), 6)}}`,
    ]);
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <InputWithSuffix type="number" suffix="°" value={{deg}} onChange={{e => setDeg(e.target.value)}} inputClassName="max-w-[10rem]" />
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = lines != null ? (
    <{T} className="space-y-1 text-center text-[#334155]">
      {{lines.map((l, i) => <p key={{i}} className="text-[14px] font-medium">{{l}}</p>)}}
    </{T}>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Trig ratios</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Aliases: longdivision slug, random already exists
alias_page("longdivision-calculator", "LongDivision", "LongDivision_Calculator",
    "Long Division Calculator", "Divide two numbers — quotient and remainder.", "long division calculator")

print("batch4 done")
