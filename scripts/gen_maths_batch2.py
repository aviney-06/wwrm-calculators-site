#!/usr/bin/env python3
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
const FALLBACK_DESCRIPTION = "{desc}";

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
      description="{desc}"
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
FM = 'import { formatNum, fractionToString, decimalToFraction } from "@/components/Maths/shared/mathUtils";\n'
FN = 'import { formatNum } from "@/components/Maths/shared/mathUtils";\n'

CALCS = []

def add(folder, comp, slug, title, desc, crumb, body):
    w(COMP / folder / f"{comp}.tsx", body)
    page(slug, folder, comp, title, desc, crumb)
    CALCS.append((slug, title))

# Right Triangle - find missing side
add("RightTriangle", "RightTriangle_Calculator", "right-triangle-calculator",
    "Right Triangle Calculator", "Solve for the hypotenuse or a leg using the Pythagorean theorem.", "right triangle calculator",
    HS + HI + HF + FN + f'''
export function RightTriangle_Calculator() {{
  type Mode = "hypotenuse" | "leg";
  const resultRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>("hypotenuse");
  const [a, setA] = useState("3");
  const [b, setB] = useState("4");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const [detail, setDetail] = useState("");

  const run = () => {{
    setError(null);
    const x = parseFloat(a), y = parseFloat(b);
    if (Number.isNaN(x) || Number.isNaN(y) || x <= 0 || y <= 0) {{
      setError("Enter positive side lengths."); setOut(null); return;
    }}
    if (mode === "hypotenuse") {{
      setOut(formatNum(Math.sqrt(x * x + y * y)));
      setDetail("hypotenuse c");
    }} else {{
      if (x <= y) {{ setError("Hypotenuse must be longer than the leg."); setOut(null); return; }}
      setOut(formatNum(Math.sqrt(x * x - y * y)));
      setDetail("missing leg");
    }}
    scrollResultIntoViewMobile(resultRef.current);
  }};

  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T}>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Solve for</p>
        <CustomSelect<Mode> id="rt-mode" value={{mode}} onChange={{setMode}}
          options={{[{{ value: "hypotenuse", label: "Hypotenuse (two legs)" }}, {{ value: "leg", label: "Leg (hypotenuse + leg)" }}]}} />
      </{T}>
      <{T} className="grid grid-cols-2 gap-2 sm:gap-4">
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">{{mode === "hypotenuse" ? "Leg a" : "Hypotenuse"}}</p>
          <InputWithSuffix type="number" suffix="" value={{a}} onChange={{e => setA(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Leg</p>
          <InputWithSuffix type="number" suffix="" value={{b}} onChange={{e => setB(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
      </{T}>
      <FormError message={{error}} />
      <button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">{{detail}}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Right triangle solver</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Cylinder Volume
add("CylinderVolume", "CylinderVolume_Calculator", "cylinder-volume-calculator",
    "Cylinder Volume Calculator", "Volume of a cylinder from radius and height (πr²h).", "cylinder volume calculator",
    H + HI + HF + FN + f'''
export function CylinderVolume_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [r, setR] = useState("4");
  const [h, setH] = useState("10");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const radius = parseFloat(r), height = parseFloat(h);
    if (Number.isNaN(radius) || Number.isNaN(height) || radius <= 0 || height <= 0) {{
      setError("Enter positive radius and height."); setOut(null); return;
    }}
    setOut(formatNum(Math.PI * radius * radius * height));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="grid grid-cols-2 gap-2 sm:gap-4">
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Radius</p>
          <InputWithSuffix type="number" suffix="" value={{r}} onChange={{e => setR(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Height</p>
          <InputWithSuffix type="number" suffix="" value={{h}} onChange={{e => setH(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
      </{T}>
      <FormError message={{error}} />
      <button type="button" className={{btnCalculate}} onClick={{run}}>Calculate volume</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">cubic units</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">V = πr²h</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Speed Distance Time
add("SpeedDistanceTime", "SpeedDistanceTime_Calculator", "speed-distance-time-calculator",
    "Speed Distance Time Calculator", "Find speed, distance, or time when you know the other two.", "speed distance time calculator",
    HS + HI + HF + FN + f'''
export function SpeedDistanceTime_Calculator() {{
  type Solve = "speed" | "distance" | "time";
  const resultRef = useRef<HTMLElement>(null);
  const [solve, setSolve] = useState<Solve>("speed");
  const [d, setD] = useState("120");
  const [t, setT] = useState("2");
  const [s, setS] = useState("60");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const [unit, setUnit] = useState("");
  const run = () => {{
    setError(null);
    if (solve === "speed") {{
      const dist = parseFloat(d), time = parseFloat(t);
      if (Number.isNaN(dist) || Number.isNaN(time) || time <= 0) {{ setError("Enter distance and positive time."); setOut(null); return; }}
      setOut(formatNum(dist / time)); setUnit("per hour (if distance in miles & time in hours)");
    }} else if (solve === "distance") {{
      const speed = parseFloat(s), time = parseFloat(t);
      if (Number.isNaN(speed) || Number.isNaN(time) || time <= 0) {{ setError("Enter speed and positive time."); setOut(null); return; }}
      setOut(formatNum(speed * time)); setUnit("distance units");
    }} else {{
      const dist = parseFloat(d), speed = parseFloat(s);
      if (Number.isNaN(dist) || Number.isNaN(speed) || speed <= 0) {{ setError("Enter distance and positive speed."); setOut(null); return; }}
      setOut(formatNum(dist / speed)); setUnit("time units");
    }}
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Find</p>
        <CustomSelect<Solve> id="sdt-solve" value={{solve}} onChange={{setSolve}}
          options={{[{{ value: "speed", label: "Speed" }}, {{ value: "distance", label: "Distance" }}, {{ value: "time", label: "Time" }}]}} /></{T}>
      {{solve !== "distance" && (
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Distance</p>
          <InputWithSuffix type="number" suffix="" value={{d}} onChange={{e => setD(e.target.value)}} inputClassName="max-w-[10rem]" /></{T}>
      )}}
      {{solve !== "time" && (
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Time</p>
          <InputWithSuffix type="number" suffix="" value={{t}} onChange={{e => setT(e.target.value)}} inputClassName="max-w-[10rem]" /></{T}>
      )}}
      {{solve !== "speed" && (
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Speed</p>
          <InputWithSuffix type="number" suffix="" value={{s}} onChange={{e => setS(e.target.value)}} inputClassName="max-w-[10rem]" /></{T}>
      )}}
      <FormError message={{error}} />
      <button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[13px] text-[#64748b]">{{unit}}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">speed = distance ÷ time</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Random 1-10
add("RandomNumber1to10", "RandomNumber1to10_Calculator", "random-number-generator-1-10",
    "Random Number Generator 1–10", "Pick a random integer from 1 to 10.", "random number 1 10",
    H + HI + HF + FN + f'''
export function RandomNumber1to10_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [n, setN] = useState<number | null>(null);
  const run = () => {{
    setN(Math.floor(Math.random() * 10) + 1);
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b]">Inclusive range 1 through 10.</p>
      <button type="button" className={{btnCalculate}} onClick={{run}}>Pick a number</button>
    </{T}>
  );
  const result = n != null ? (
    <><p className="text-center text-4xl font-bold text-[#d66844]">{{n}}</p><p className="text-center text-[14px] text-[#334155]">random integer</p></>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Tap to roll 1–10</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Fraction to decimal
add("FractionToDecimal", "FractionToDecimal_Calculator", "fraction-to-decimal-calculator",
    "Fraction to Decimal Calculator", "Convert a fraction to a decimal.", "fraction to decimal calculator",
    H + HI + HF + FM + f'''
export function FractionToDecimal_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [n, setN] = useState("3");
  const [d, setD] = useState("4");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const num = parseInt(n, 10), den = parseInt(d, 10);
    if (Number.isNaN(num) || Number.isNaN(den) || den === 0) {{ setError("Enter a valid fraction."); setOut(null); return; }}
    setOut(formatNum(num / den, 8));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="flex items-center gap-2">
        <InputWithSuffix type="number" suffix="" value={{n}} onChange={{e => setN(e.target.value)}} inputClassName="w-[4rem]" />
        <span className="text-[#64748b]">/</span>
        <InputWithSuffix type="number" suffix="" value={{d}} onChange={{e => setD(e.target.value)}} inputClassName="w-[4rem]" />
      </{T}>
      <FormError message={{error}} />
      <button type="button" className={{btnCalculate}} onClick={{run}}>Convert</button>
    </{T}>
  );
  const result = out != null ? (
    <><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">decimal</p></>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Enter numerator and denominator</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Decimal to fraction
add("DecimalToFraction", "DecimalToFraction_Calculator", "decimal-to-fraction-calculator",
    "Decimal to Fraction Calculator", "Convert a decimal to a simplified fraction.", "decimal to fraction calculator",
    H + HI + HF + FM + f'''
export function DecimalToFraction_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [val, setVal] = useState("0.75");
  const [error, setError] = useState<string | null>(null);
  const [frac, setFrac] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const x = parseFloat(val);
    if (Number.isNaN(x)) {{ setError("Enter a valid decimal."); setFrac(null); return; }}
    const {{ num, den }} = decimalToFraction(x);
    setFrac(fractionToString(num, den));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Decimal</p>
        <InputWithSuffix type="number" step="any" suffix="" value={{val}} onChange={{e => setVal(e.target.value)}} inputClassName="max-w-[10rem]" /></{T}>
      <FormError message={{error}} />
      <button type="button" className={{btnCalculate}} onClick={{run}}>Convert</button>
    </{T}>
  );
  const result = frac != null ? (
    <><p className="text-center text-3xl font-bold text-[#d66844]">{{frac}}</p><p className="text-center text-[14px] text-[#334155]">simplified fraction</p></>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Best rational approximation</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Rounding
add("RoundingNumbers", "RoundingNumbers_Calculator", "rounding-numbers-calculator",
    "Rounding Numbers Calculator", "Round a number to a chosen number of decimal places.", "rounding numbers calculator",
    H + HI + HF + FN + f'''
export function RoundingNumbers_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [val, setVal] = useState("3.14159");
  const [places, setPlaces] = useState("2");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const x = parseFloat(val);
    const p = parseInt(places, 10);
    if (Number.isNaN(x) || Number.isNaN(p) || p < 0 || p > 10) {{ setError("Enter a number and decimal places 0–10."); setOut(null); return; }}
    setOut(x.toFixed(p));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="grid grid-cols-2 gap-2 sm:gap-4">
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Number</p>
          <InputWithSuffix type="number" step="any" suffix="" value={{val}} onChange={{e => setVal(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Decimal places</p>
          <InputWithSuffix type="number" min={{0}} max={{10}} suffix="" value={{places}} onChange={{e => setPlaces(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
      </{T}>
      <FormError message={{error}} />
      <button type="button" className={{btnCalculate}} onClick={{run}}>Round</button>
    </{T}>
  );
  const result = out != null ? (
    <><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">rounded</p></>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Round to N decimal places</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Percent off
add("PercentOff", "PercentOff_Calculator", "percent-off-calculator",
    "Percent Off Calculator", "Sale price after a percent discount.", "percent off calculator",
    H + HI + HF + FN + f'''
export function PercentOff_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [price, setPrice] = useState("100");
  const [off, setOff] = useState("20");
  const [error, setError] = useState<string | null>(null);
  const [sale, setSale] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const p = parseFloat(price), pct = parseFloat(off);
    if (Number.isNaN(p) || Number.isNaN(pct) || p < 0 || pct < 0 || pct > 100) {{
      setError("Enter price and discount 0–100%."); setSale(null); return;
    }}
    const discount = p * (pct / 100);
    setSale(formatNum(p - discount));
    setSaved(formatNum(discount));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="grid grid-cols-2 gap-2 sm:gap-4">
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Original price</p>
          <InputWithSuffix type="number" suffix="" value={{price}} onChange={{e => setPrice(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Percent off</p>
          <InputWithSuffix type="number" suffix="%" value={{off}} onChange={{e => setOff(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
      </{T}>
      <FormError message={{error}} />
      <button type="button" className={{btnCalculate}} onClick={{run}}>Calculate sale price</button>
    </{T}>
  );
  const result = sale != null ? (
    <{T} className="w-full max-w-[14rem] space-y-1 text-center">
      <p className="text-3xl font-bold text-[#d66844]">{{sale}}</p>
      <p className="text-[14px] text-[#334155]">sale price</p>
      <p className="text-[12px] text-[#64748b]">You save {{saved}}</p>
    </{T}>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Discounted price</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Distance between points
add("Distance", "Distance_Calculator", "distance-calculator",
    "Distance Calculator", "Distance between two points (x₁,y₁) and (x₂,y₂).", "distance calculator",
    H + HI + HF + FN + f'''
export function Distance_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [x1, setX1] = useState("0"); const [y1, setY1] = useState("0");
  const [x2, setX2] = useState("3"); const [y2, setY2] = useState("4");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const a = parseFloat(x1), b = parseFloat(y1), c = parseFloat(x2), d = parseFloat(y2);
    if ([a,b,c,d].some(Number.isNaN)) {{ setError("Enter valid coordinates."); setOut(null); return; }}
    setOut(formatNum(Math.sqrt((c-a)**2 + (d-b)**2)));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T}><p className="mb-1 text-[12px] font-medium text-[#334155]">Point 1 (x, y)</p>
        <{T} className="flex gap-2"><InputWithSuffix type="number" suffix="" value={{x1}} onChange={{e => setX1(e.target.value)}} inputClassName="w-[4rem]" />
        <InputWithSuffix type="number" suffix="" value={{y1}} onChange={{e => setY1(e.target.value)}} inputClassName="w-[4rem]" /></{T}></{T}>
      <{T}><p className="mb-1 text-[12px] font-medium text-[#334155]">Point 2 (x, y)</p>
        <{T} className="flex gap-2"><InputWithSuffix type="number" suffix="" value={{x2}} onChange={{e => setX2(e.target.value)}} inputClassName="w-[4rem]" />
        <InputWithSuffix type="number" suffix="" value={{y2}} onChange={{e => setY2(e.target.value)}} inputClassName="w-[4rem]" /></{T}></{T}>
      <FormError message={{error}} />
      <button type="button" className={{btnCalculate}} onClick={{run}}>Calculate distance</button>
    </{T}>
  );
  const result = out != null ? (
    <><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">units</p></>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">√((x₂−x₁)² + (y₂−y₁)²)</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Area of circle
add("AreaOfCircle", "AreaOfCircle_Calculator", "area-of-circle-calculator",
    "Area of a Circle Calculator", "Circle area from radius (πr²).", "area of a circle calculator",
    H + HI + HF + FN + f'''
export function AreaOfCircle_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [r, setR] = useState("5");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const radius = parseFloat(r);
    if (Number.isNaN(radius) || radius <= 0) {{ setError("Enter a positive radius."); setOut(null); return; }}
    setOut(formatNum(Math.PI * radius * radius));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Radius</p>
        <InputWithSuffix type="number" suffix="" value={{r}} onChange={{e => setR(e.target.value)}} inputClassName="max-w-[9rem]" /></{T}>
      <FormError message={{error}} />
      <button type="button" className={{btnCalculate}} onClick={{run}}>Calculate area</button>
    </{T}>
  );
  const result = out != null ? (
    <><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">square units (πr²)</p></>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Area from radius</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Area multi-shape
add("Area", "Area_Calculator", "area-calculator",
    "Area Calculator", "Area of a rectangle, triangle, or circle.", "area calculator",
    HS + HI + HF + FN + f'''
export function Area_Calculator() {{
  type Shape = "rectangle" | "triangle" | "circle";
  const resultRef = useRef<HTMLElement>(null);
  const [shape, setShape] = useState<Shape>("rectangle");
  const [a, setA] = useState("10"); const [b, setB] = useState("5");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const [hint, setHint] = useState("");
  const run = () => {{
    setError(null);
    const x = parseFloat(a), y = parseFloat(b);
    if (shape === "rectangle") {{
      if (Number.isNaN(x) || Number.isNaN(y) || x <= 0 || y <= 0) {{ setError("Enter positive length and width."); setOut(null); return; }}
      setOut(formatNum(x * y)); setHint("length × width");
    }} else if (shape === "triangle") {{
      if (Number.isNaN(x) || Number.isNaN(y) || x <= 0 || y <= 0) {{ setError("Enter positive base and height."); setOut(null); return; }}
      setOut(formatNum(0.5 * x * y)); setHint("½ × base × height");
    }} else {{
      if (Number.isNaN(x) || x <= 0) {{ setError("Enter a positive radius."); setOut(null); return; }}
      setOut(formatNum(Math.PI * x * x)); setHint("πr²");
    }}
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Shape</p>
        <CustomSelect<Shape> id="area-shape" value={{shape}} onChange={{setShape}}
          options={{[{{ value: "rectangle", label: "Rectangle" }}, {{ value: "triangle", label: "Triangle" }}, {{ value: "circle", label: "Circle" }}]}} /></{T}>
      <{T} className="grid grid-cols-2 gap-2 sm:gap-4">
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">{{shape === "circle" ? "Radius" : shape === "triangle" ? "Base" : "Length"}}</p>
          <InputWithSuffix type="number" suffix="" value={{a}} onChange={{e => setA(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
        {{shape !== "circle" && (
          <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">{{shape === "triangle" ? "Height" : "Width"}}</p>
            <InputWithSuffix type="number" suffix="" value={{b}} onChange={{e => setB(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
        )}}
      </{T}>
      <FormError message={{error}} />
      <button type="button" className={{btnCalculate}} onClick={{run}}>Calculate area</button>
    </{T}>
  );
  const result = out != null ? (
    <><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">{{hint}}</p></>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Pick a shape</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Triangle - Heron's or base*height
add("Triangle", "Triangle_Calculator", "triangle-calculator",
    "Triangle Calculator", "Triangle area from base and height, or three sides (Heron).", "triangle calculator",
    HS + HI + HF + FN + f'''
export function Triangle_Calculator() {{
  type Mode = "baseHeight" | "heron";
  const resultRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>("baseHeight");
  const [a, setA] = useState("6"); const [b, setB] = useState("4"); const [c, setC] = useState("5");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    if (mode === "baseHeight") {{
      const base = parseFloat(a), height = parseFloat(b);
      if (Number.isNaN(base) || Number.isNaN(height) || base <= 0 || height <= 0) {{
        setError("Enter positive base and height."); setOut(null); return;
      }}
      setOut(formatNum(0.5 * base * height));
    }} else {{
      const s1 = parseFloat(a), s2 = parseFloat(b), s3 = parseFloat(c);
      if ([s1,s2,s3].some(n => Number.isNaN(n) || n <= 0)) {{ setError("Enter three positive sides."); setOut(null); return; }}
      if (s1 + s2 <= s3 || s1 + s3 <= s2 || s2 + s3 <= s1) {{ setError("Sides do not form a valid triangle."); setOut(null); return; }}
      const s = (s1 + s2 + s3) / 2;
      setOut(formatNum(Math.sqrt(s * (s - s1) * (s - s2) * (s - s3))));
    }}
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Method</p>
        <CustomSelect<Mode> id="tri-mode" value={{mode}} onChange={{setMode}}
          options={{[{{ value: "baseHeight", label: "Base & height" }}, {{ value: "heron", label: "Three sides (Heron)" }}]}} /></{T}>
      <{T} className="grid grid-cols-3 gap-2">
        <{T}><p className="mb-1 text-[11px] font-medium text-[#334155]">{{mode === "baseHeight" ? "Base" : "Side a"}}</p>
          <InputWithSuffix type="number" suffix="" value={{a}} onChange={{e => setA(e.target.value)}} inputClassName="w-full" /></{T}>
        <{T}><p className="mb-1 text-[11px] font-medium text-[#334155]">{{mode === "baseHeight" ? "Height" : "Side b"}}</p>
          <InputWithSuffix type="number" suffix="" value={{b}} onChange={{e => setB(e.target.value)}} inputClassName="w-full" /></{T}>
        {{mode === "heron" && (
          <{T}><p className="mb-1 text-[11px] font-medium text-[#334155]">Side c</p>
            <InputWithSuffix type="number" suffix="" value={{c}} onChange={{e => setC(e.target.value)}} inputClassName="w-full" /></{T}>
        )}}
      </{T}>
      <FormError message={{error}} />
      <button type="button" className={{btnCalculate}} onClick={{run}}>Calculate area</button>
    </{T}>
  );
  const result = out != null ? (
    <><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">square units</p></>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Triangle area</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Pythagorean page only (component exists)
page("pythagorean-theorem-calculator", "PythagoreanTheorem", "PythagoreanTheorem_Calculator",
     "Pythagorean Theorem Calculator", "Find the hypotenuse c = √(a² + b²) from two legs.", "pythagorean theorem calculator")

# Circumference page
page("circumference-calculator", "Circumference", "Circumference_Calculator",
     "Circumference Calculator", "Circle circumference from radius (2πr).", "circumference calculator")

# Z-Score
add("ZScore", "ZScore_Calculator", "z-score-calculator",
    "Z Score Calculator", "Standard score: (x − mean) ÷ standard deviation.", "z score calculator",
    H + HI + HF + FN + f'''
export function ZScore_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [x, setX] = useState("85");
  const [mean, setMean] = useState("75");
  const [sd, setSd] = useState("10");
  const [error, setError] = useState<string | null>(null);
  const [z, setZ] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const val = parseFloat(x), mu = parseFloat(mean), sigma = parseFloat(sd);
    if ([val, mu, sigma].some(Number.isNaN)) {{ setError("Enter valid numbers."); setZ(null); return; }}
    if (sigma === 0) {{ setError("Standard deviation cannot be zero."); setZ(null); return; }}
    setZ(formatNum((val - mu) / sigma));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Value (x)</p>
        <InputWithSuffix type="number" suffix="" value={{x}} onChange={{e => setX(e.target.value)}} inputClassName="max-w-[9rem]" /></{T}>
      <{T} className="grid grid-cols-2 gap-2 sm:gap-4">
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Mean (μ)</p>
          <InputWithSuffix type="number" suffix="" value={{mean}} onChange={{e => setMean(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Std dev (σ)</p>
          <InputWithSuffix type="number" suffix="" value={{sd}} onChange={{e => setSd(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
      </{T}>
      <FormError message={{error}} />
      <button type="button" className={{btnCalculate}} onClick={{run}}>Calculate z-score</button>
    </{T}>
  );
  const result = z != null ? (
    <><p className="text-center text-3xl font-bold text-[#d66844]">{{z}}</p><p className="text-center text-[14px] text-[#334155]">z-score</p></>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">(x − μ) ÷ σ</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

print(f"Generated {len(CALCS) + 2} maths calculators")
