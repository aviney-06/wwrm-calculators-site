#!/usr/bin/env python3
"""Generate maths batch 5 calculators."""
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
FN = 'import { formatNum, parseNumberList, allFactors, countSignificantFigures, decimalToFraction, fractionToString, simplifyFraction } from "@/components/Maths/shared/mathUtils";\n'
FM = 'import { formatNum, decimalToFraction, fractionToString, simplifyFraction, allFactors, countSignificantFigures, parseNumberList } from "@/components/Maths/shared/mathUtils";\n'

def add(folder, comp, slug, title, desc, crumb, body):
    w(COMP / folder / f"{comp}.tsx", body)
    page(slug, folder, comp, title, desc, crumb)

# Fraction to percent
add("FractionToPercent", "FractionToPercent_Calculator", "fraction-to-percent-calculator",
    "Fraction to Percent Calculator", "Convert a fraction to a percent.", "fraction to percent calculator",
    H + HI + HF + FM + f'''
export function FractionToPercent_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [n, setN] = useState("1");
  const [d, setD] = useState("4");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const num = parseInt(n, 10), den = parseInt(d, 10);
    if (Number.isNaN(num) || Number.isNaN(den) || den === 0) {{ setError("Enter a valid fraction."); setOut(null); return; }}
    setOut(formatNum((num / den) * 100) + "%");
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="flex items-center gap-2">
        <InputWithSuffix type="number" suffix="" value={{n}} onChange={{e => setN(e.target.value)}} inputClassName="w-[4rem]" />
        <span>/</span>
        <InputWithSuffix type="number" suffix="" value={{d}} onChange={{e => setD(e.target.value)}} inputClassName="w-[4rem]" />
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Convert</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">(numerator ÷ denominator) × 100</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# All factors
add("Factors", "Factors_Calculator", "factors-calculator", "Factors Calculator",
    "List all factors (divisors) of an integer.", "factors calculator",
    H + HI + HF + FN + f'''
export function Factors_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [n, setN] = useState("36");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const x = parseInt(n, 10);
    if (Number.isNaN(x) || x === 0) {{ setError("Enter a non-zero integer."); setOut(null); return; }}
    const f = allFactors(x);
    setOut(f.join(", "));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <InputWithSuffix type="number" suffix="" value={{n}} onChange={{e => setN(e.target.value)}} inputClassName="max-w-[10rem]" />
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Find factors</button>
    </{T}>
  );
  const result = out != null ? (<p className="max-w-[16rem] text-center text-lg font-bold leading-snug text-[#d66844] sm:text-xl">{{out}}</p>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">All divisors</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# 45-45-90 triangle
add("Triangle454590", "Triangle454590_Calculator", "triangle-45-45-90-calculator", "45-45-90 Triangle Calculator",
    "Sides of a 45°-45°-90° triangle from one known side.", "45 45 90 triangle calculator",
    HS + HI + HF + FN + f'''
type Known = "leg" | "hyp";
export function Triangle454590_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [known, setKnown] = useState<Known>("leg");
  const [val, setVal] = useState("5");
  const [error, setError] = useState<string | null>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const run = () => {{
    setError(null);
    const x = parseFloat(val);
    if (Number.isNaN(x) || x <= 0) {{ setError("Enter a positive length."); setLines(null); return; }}
    const sqrt2 = Math.SQRT2;
    if (known === "leg") {{
      setLines([`leg a = ${{formatNum(x)}}`, `leg b = ${{formatNum(x)}}`, `hypotenuse = ${{formatNum(x * sqrt2)}}`]);
    }} else {{
      const leg = x / sqrt2;
      setLines([`leg a = ${{formatNum(leg)}}`, `leg b = ${{formatNum(leg)}}`, `hypotenuse = ${{formatNum(x)}}`]);
    }}
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <CustomSelect<Known> id="tri45" value={{known}} onChange={{setKnown}}
        options={{[{{ value: "leg", label: "Known: leg" }}, {{ value: "hyp", label: "Known: hypotenuse" }}]}} />
      <InputWithSuffix type="number" suffix="" value={{val}} onChange={{e => setVal(e.target.value)}} inputClassName="max-w-[10rem]" />
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = lines != null ? (
    <{T} className="space-y-1 text-center text-[#334155]">
      {{lines.map((l, i) => <p key={{i}} className={{i === 2 ? "text-xl font-bold text-[#d66844]" : "text-[14px]"}}>{{l}}</p>)}}
    </{T}>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Ratio 1 : 1 : √2</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Square footage circle
add("SquareFootageCircle", "SquareFootageCircle_Calculator", "square-footage-circle-calculator",
    "Square Footage of a Circle Calculator", "Circle area in square feet from radius in feet.", "square footage circle calculator",
    H + HI + HF + FN + f'''
export function SquareFootageCircle_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [r, setR] = useState("10");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const radius = parseFloat(r);
    if (Number.isNaN(radius) || radius <= 0) {{ setError("Enter a positive radius in feet."); setOut(null); return; }}
    setOut(formatNum(Math.PI * radius * radius));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <InputWithSuffix type="number" suffix="ft" value={{r}} onChange={{e => setR(e.target.value)}} inputClassName="max-w-[10rem]" />
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}} ft²</p><p className="text-center text-[14px] text-[#334155]">πr²</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Area from radius</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Significant figures
add("SignificantFigures", "SignificantFigures_Calculator", "significant-figures-calculator",
    "Significant Figures Calculator", "Count significant figures in a number.", "significant figures calculator",
    H + HI + HF + FN + f'''
export function SignificantFigures_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [val, setVal] = useState("0.00450");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const c = countSignificantFigures(val);
    if (c === null) {{ setError("Enter a valid number."); setOut(null); return; }}
    setOut(String(c));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <InputWithSuffix type="text" suffix="" value={{val}} onChange={{e => setVal(e.target.value)}} inputClassName="max-w-[12rem]" />
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Count</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">significant figures</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Sig fig counter</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Remainder
add("Remainder", "Remainder_Calculator", "remainder-calculator", "Remainder Calculator",
    "Remainder when dividing one integer by another.", "remainder calculator",
    H + HI + HF + FN + f'''
export function Remainder_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [a, setA] = useState("17");
  const [b, setB] = useState("5");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const x = parseInt(a, 10), y = parseInt(b, 10);
    if (Number.isNaN(x) || Number.isNaN(y) || y === 0) {{ setError("Enter integers; divisor cannot be 0."); setOut(null); return; }}
    setOut(String(x % y));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="grid grid-cols-2 gap-2">
        <InputWithSuffix type="number" suffix="" value={{a}} onChange={{e => setA(e.target.value)}} inputClassName="w-full max-w-[9rem]" />
        <InputWithSuffix type="number" suffix="" value={{b}} onChange={{e => setB(e.target.value)}} inputClassName="w-full max-w-[9rem]" />
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">remainder</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">a mod b</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Modulo
add("Modulo", "Modulo_Calculator", "modulo-calculator", "Modulo Calculator",
    "Modulo (remainder) of a ÷ b.", "modulo calculator",
    H + HI + HF + FN + f'''
export function Modulo_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [a, setA] = useState("29");
  const [b, setB] = useState("8");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const x = parseFloat(a), y = parseFloat(b);
    if (Number.isNaN(x) || Number.isNaN(y) || y === 0) {{ setError("Enter numbers; divisor cannot be 0."); setOut(null); return; }}
    setOut(formatNum(x % y, 8));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b]">a mod b</p>
      <{T} className="grid grid-cols-2 gap-2">
        <InputWithSuffix type="number" suffix="" value={{a}} onChange={{e => setA(e.target.value)}} inputClassName="w-full max-w-[9rem]" />
        <InputWithSuffix type="number" suffix="" value={{b}} onChange={{e => setB(e.target.value)}} inputClassName="w-full max-w-[9rem]" />
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Modulo</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Sector area
add("SectorArea", "SectorArea_Calculator", "sector-area-calculator", "Sector Area Calculator",
    "Area of a circle sector from radius and central angle in degrees.", "sector area calculator",
    H + HI + HF + FN + f'''
export function SectorArea_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [r, setR] = useState("10");
  const [deg, setDeg] = useState("60");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const radius = parseFloat(r), angle = parseFloat(deg);
    if (Number.isNaN(radius) || Number.isNaN(angle) || radius <= 0 || angle <= 0) {{
      setError("Enter positive radius and angle.");
      setOut(null);
      return;
    }}
    setOut(formatNum((angle / 360) * Math.PI * radius * radius));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="grid grid-cols-2 gap-2">
        <InputWithSuffix type="number" suffix="" value={{r}} onChange={{e => setR(e.target.value)}} inputClassName="w-full max-w-[9rem]" />
        <InputWithSuffix type="number" suffix="°" value={{deg}} onChange={{e => setDeg(e.target.value)}} inputClassName="w-full max-w-[9rem]" />
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">(θ/360)πr²</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Sector area</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Average percentage
add("AveragePercentage", "AveragePercentage_Calculator", "average-percentage-calculator", "Average Percentage Calculator",
    "Simple average of multiple percentages.", "average percentage calculator",
    H + HI + HF + FN + f'''
export function AveragePercentage_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [raw, setRaw] = useState("80, 90, 75");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const vals = parseNumberList(raw.replace(/%/g, ""));
    if (vals.length === 0) {{ setError("Enter percentages separated by commas."); setOut(null); return; }}
    const avg = vals.reduce((s, v) => s + v, 0) / vals.length;
    setOut(formatNum(avg) + "%");
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b]">Comma-separated % values</p>
      <input className="h-10 w-full rounded border border-[#E0E0E0] px-3 text-[14px]" value={{raw}} onChange={{e => setRaw(e.target.value)}} />
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Average</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Mean of percentages</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Inches to fraction
add("InchesToFraction", "InchesToFraction_Calculator", "inches-to-fraction-calculator", "Inches to Fraction Calculator",
    "Convert decimal inches to a fractional inch (nearest 1/16).", "inches to fraction calculator",
    H + HI + HF + FM + f'''
export function InchesToFraction_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [inches, setInches] = useState("3.375");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const x = parseFloat(inches);
    if (Number.isNaN(x)) {{ setError("Enter decimal inches."); setOut(null); return; }}
    const whole = Math.trunc(x);
    const frac = Math.abs(x - whole);
    const {{ num, den }} = decimalToFraction(frac, 16);
    const sign = x < 0 && whole === 0 ? "-" : "";
    if (den === 1 || num === 0) setOut(`${{sign}}${{whole}}`);
    else if (whole === 0) setOut(`${{sign}}${{fractionToString(num, den)}} in`);
    else setOut(`${{whole}} ${{fractionToString(num, den)}} in`);
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <InputWithSuffix type="number" suffix="in" value={{inches}} onChange={{e => setInches(e.target.value)}} inputClassName="max-w-[10rem]" />
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Convert</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-2xl font-bold text-[#d66844] sm:text-3xl">{{out}}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Decimal → fraction</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Circle perimeter (dedicated)
add("CirclePerimeter", "CirclePerimeter_Calculator", "circle-perimeter-calculator", "Circle Perimeter Calculator",
    "Perimeter (circumference) of a circle from radius.", "circle perimeter calculator",
    H + HI + HF + FN + f'''
export function CirclePerimeter_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [r, setR] = useState("5");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const radius = parseFloat(r);
    if (Number.isNaN(radius) || radius <= 0) {{ setError("Enter a positive radius."); setOut(null); return; }}
    setOut(formatNum(2 * Math.PI * radius));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <InputWithSuffix type="number" suffix="" value={{r}} onChange={{e => setR(e.target.value)}} inputClassName="max-w-[10rem]" />
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">C = 2πr</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Circumference</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Percentile
add("Percentile", "Percentile_Calculator", "percentile-calculator", "Percentile Calculator",
    "Find a percentile value from a data set.", "percentile calculator",
    H + HI + HF + FN + f'''
export function Percentile_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [raw, setRaw] = useState("12, 15, 18, 20, 22, 25");
  const [pct, setPct] = useState("90");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const vals = parseNumberList(raw);
    const p = parseFloat(pct);
    if (vals.length === 0) {{ setError("Enter comma-separated data."); setOut(null); return; }}
    if (Number.isNaN(p) || p < 0 || p > 100) {{ setError("Percentile must be 0–100."); setOut(null); return; }}
    const sorted = [...vals].sort((a, b) => a - b);
    const rank = (p / 100) * (sorted.length - 1);
    const lo = Math.floor(rank);
    const hi = Math.ceil(rank);
    const frac = rank - lo;
    const value = sorted[lo]! + frac * (sorted[hi]! - sorted[lo]!);
    setOut(formatNum(value));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <input className="h-10 w-full rounded border border-[#E0E0E0] px-3 text-[14px]" value={{raw}} onChange={{e => setRaw(e.target.value)}} />
      <InputWithSuffix type="number" suffix="%" value={{pct}} onChange={{e => setPct(e.target.value)}} inputClassName="max-w-[8rem]" />
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">percentile value</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Linear interpolation</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Equivalent fraction
add("FractionEquivalent", "FractionEquivalent_Calculator", "fraction-equivalent-calculator", "Equivalent Fraction Calculator",
    "Find an equivalent fraction with a new denominator.", "equivalent fraction calculator",
    H + HI + HF + FM + f'''
export function FractionEquivalent_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [n, setN] = useState("1");
  const [d, setD] = useState("2");
  const [newD, setNewD] = useState("8");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const num = parseInt(n, 10), den = parseInt(d, 10), target = parseInt(newD, 10);
    if ([num, den, target].some(v => Number.isNaN(v)) || den === 0 || target === 0) {{
      setError("Enter valid non-zero denominators.");
      setOut(null);
      return;
    }}
    if (target % den !== 0) {{
      setError("New denominator must be a multiple of the original.");
      setOut(null);
      return;
    }}
    const mult = target / den;
    setOut(fractionToString(num * mult, target));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="flex flex-wrap items-center gap-2">
        <InputWithSuffix type="number" suffix="" value={{n}} onChange={{e => setN(e.target.value)}} inputClassName="w-[4rem]" />
        <span>/</span>
        <InputWithSuffix type="number" suffix="" value={{d}} onChange={{e => setD(e.target.value)}} inputClassName="w-[4rem]" />
        <span className="text-[#64748b]">→ ? /</span>
        <InputWithSuffix type="number" suffix="" value={{newD}} onChange={{e => setNewD(e.target.value)}} inputClassName="w-[4rem]" />
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Convert</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Same value, new denominator</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Long multiplication
add("LongMultiplication", "LongMultiplication_Calculator", "long-multiplication-calculator", "Long Multiplication Calculator",
    "Multiply two integers.", "long multiplication calculator",
    H + HI + HF + FN + f'''
export function LongMultiplication_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [a, setA] = useState("123");
  const [b, setB] = useState("456");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const x = parseInt(a, 10), y = parseInt(b, 10);
    if (Number.isNaN(x) || Number.isNaN(y)) {{ setError("Enter whole numbers."); setOut(null); return; }}
    const product = x * y;
    if (!Number.isSafeInteger(product)) {{ setError("Product too large."); setOut(null); return; }}
    setOut(String(product));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="grid grid-cols-2 gap-2">
        <InputWithSuffix type="number" suffix="" value={{a}} onChange={{e => setA(e.target.value)}} inputClassName="w-full max-w-[9rem]" />
        <InputWithSuffix type="number" suffix="" value={{b}} onChange={{e => setB(e.target.value)}} inputClassName="w-full max-w-[9rem]" />
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Multiply</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Product</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Surface area of cylinder
add("SurfaceAreaCylinder", "SurfaceAreaCylinder_Calculator", "surface-area-of-cylinder-calculator",
    "Surface Area of a Cylinder Calculator", "Cylinder surface area from radius and height (2πr(r+h)).", "surface area of cylinder calculator",
    H + HI + HF + FN + f'''
export function SurfaceAreaCylinder_Calculator() {{
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
    setOut(formatNum(2 * Math.PI * radius * (radius + height)));
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
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">2πr(r + h)</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Cylinder surface area</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Aliases
alias_page("longmultiplication-calculator", "LongMultiplication", "LongMultiplication_Calculator",
    "Long Multiplication Calculator", "Multiply two integers.", "long multiplication calculator")

print("batch5 done")
