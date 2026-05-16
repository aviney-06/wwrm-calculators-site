#!/usr/bin/env python3
"""Generate maths batch 3b (remaining calculators)."""
from pathlib import Path
import gen_maths_batch3 as g

add = g.add
H, HS, HI, HF, FN, FG, FM, T = g.H, g.HS, g.HI, g.HF, g.FN, g.FG, g.FM, g.T
page = g.page
w = g.w
APP = g.APP

# Scientific notation
add("ScientificNotation", "ScientificNotation_Calculator", "scientific-notation-converter",
    "Scientific Notation Converter", "Convert between decimal and scientific notation.", "scientific notation converter",
    HS + HI + HF + FN + f'''
export function ScientificNotation_Calculator() {{
  type Mode = "toSci" | "fromSci";
  const resultRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>("toSci");
  const [val, setVal] = useState("12345");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const x = parseFloat(val);
    if (Number.isNaN(x)) {{ setError("Enter a valid number."); setOut(null); return; }}
    setOut(mode === "toSci" ? x.toExponential(4) : formatNum(x, 8));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Direction</p>
        <CustomSelect<Mode> id="sci-mode" value={{mode}} onChange={{setMode}}
          options={{[{{ value: "toSci", label: "Decimal → scientific" }}, {{ value: "fromSci", label: "Scientific → decimal" }}]}} /></{T}>
      <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Value</p>
        <InputWithSuffix type="text" suffix="" value={{val}} onChange={{e => setVal(e.target.value)}} inputClassName="w-full max-w-[12rem]" /></{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Convert</button>
    </{T}>
  );
  const result = out != null ? (<p className="text-center font-mono text-2xl font-bold text-[#d66844] sm:text-3xl">{{out}}</p>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">e notation ↔ decimal</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

add("Gcf", "Gcf_Calculator", "gcf-calculator", "GCF Calculator",
    "Greatest common factor of two integers.", "gcf calculator",
    H + HI + HF + FN + f'''
export function Gcf_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [a, setA] = useState("48");
  const [b, setB] = useState("18");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const x = parseInt(a, 10), y = parseInt(b, 10);
    if (Number.isNaN(x) || Number.isNaN(y)) {{ setError("Enter whole numbers."); setOut(null); return; }}
    setOut(String(gcd(x, y)));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="grid grid-cols-2 gap-2 sm:gap-4">
        <InputWithSuffix type="number" suffix="" value={{a}} onChange={{e => setA(e.target.value)}} inputClassName="w-full max-w-[9rem]" />
        <InputWithSuffix type="number" suffix="" value={{b}} onChange={{e => setB(e.target.value)}} inputClassName="w-full max-w-[9rem]" />
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Find GCF</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">greatest common factor</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">GCF of two integers</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

add("PercentError", "PercentError_Calculator", "percent-error-calculator", "Percent Error Calculator",
    "Percent error between measured and accepted (true) value.", "percent error calculator",
    H + HI + HF + FN + f'''
export function PercentError_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [measured, setMeasured] = useState("10.2");
  const [accepted, setAccepted] = useState("10");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const m = parseFloat(measured), t = parseFloat(accepted);
    if (Number.isNaN(m) || Number.isNaN(t) || t === 0) {{ setError("Enter valid values; accepted cannot be 0."); setOut(null); return; }}
    setOut(formatNum((Math.abs(m - t) / Math.abs(t)) * 100) + "%");
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="grid grid-cols-2 gap-2 sm:gap-4">
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Measured</p>
          <InputWithSuffix type="number" suffix="" value={{measured}} onChange={{e => setMeasured(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Accepted</p>
          <InputWithSuffix type="number" suffix="" value={{accepted}} onChange={{e => setAccepted(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">percent error</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">|measured − accepted| ÷ |accepted| × 100</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

add("RandomNumber1to100", "RandomNumber1to100_Calculator", "random-number-generator-1-100",
    "Random Number Generator 1–100", "Pick a random integer from 1 to 100.", "random number generator 1 100",
    H + HF + f'''
export function RandomNumber1to100_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [n, setN] = useState<number | null>(null);
  const run = () => {{
    setN(Math.floor(Math.random() * 100) + 1);
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b]">Inclusive range 1 through 100.</p>
      <button type="button" className={{btnCalculate}} onClick={{run}}>Pick a number</button>
    </{T}>
  );
  const result = n != null ? (
    <><p className="text-center text-4xl font-bold text-[#d66844]">{{n}}</p><p className="text-center text-[14px] text-[#334155]">random integer</p></>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Tap to roll 1–100</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

add("Slope", "Slope_Calculator", "slope-calculator", "Slope Calculator",
    "Slope between two points (rise over run).", "slope calculator",
    H + HI + HF + FN + f'''
export function Slope_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [x1, setX1] = useState("0");
  const [y1, setY1] = useState("0");
  const [x2, setX2] = useState("4");
  const [y2, setY2] = useState("2");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const a = parseFloat(x1), b = parseFloat(y1), c = parseFloat(x2), d = parseFloat(y2);
    if ([a, b, c, d].some(v => Number.isNaN(v))) {{ setError("Enter valid coordinates."); setOut(null); return; }}
    if (c === a) {{ setError("Vertical line — slope undefined."); setOut(null); return; }}
    setOut(formatNum((d - b) / (c - a), 6));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="grid grid-cols-2 gap-2 sm:gap-4">
        <{T}><p className="mb-1 text-[12px] font-medium text-[#334155]">(x₁, y₁)</p>
          <{T} className="flex gap-1"><InputWithSuffix type="number" suffix="" value={{x1}} onChange={{e => setX1(e.target.value)}} inputClassName="w-[4rem]" />
          <InputWithSuffix type="number" suffix="" value={{y1}} onChange={{e => setY1(e.target.value)}} inputClassName="w-[4rem]" /></{T}></{T}>
        <{T}><p className="mb-1 text-[12px] font-medium text-[#334155]">(x₂, y₂)</p>
          <{T} className="flex gap-1"><InputWithSuffix type="number" suffix="" value={{x2}} onChange={{e => setX2(e.target.value)}} inputClassName="w-[4rem]" />
          <InputWithSuffix type="number" suffix="" value={{y2}} onChange={{e => setY2(e.target.value)}} inputClassName="w-[4rem]" /></{T}></{T}>
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Find slope</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">m = (y₂ − y₁) ÷ (x₂ − x₁)</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Two points</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

add("Midpoint", "Midpoint_Calculator", "midpoint-calculator", "Midpoint Calculator",
    "Midpoint between two points on a plane.", "midpoint calculator",
    H + HI + HF + FN + f'''
export function Midpoint_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [x1, setX1] = useState("0");
  const [y1, setY1] = useState("0");
  const [x2, setX2] = useState("8");
  const [y2, setY2] = useState("6");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const a = parseFloat(x1), b = parseFloat(y1), c = parseFloat(x2), d = parseFloat(y2);
    if ([a, b, c, d].some(v => Number.isNaN(v))) {{ setError("Enter valid coordinates."); setOut(null); return; }}
    setOut(`(${{formatNum((a + c) / 2)}}, ${{formatNum((b + d) / 2)}})`);
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="grid grid-cols-2 gap-2 sm:gap-4">
        <{T}><p className="mb-1 text-[12px] font-medium text-[#334155]">(x₁, y₁)</p>
          <{T} className="flex gap-1"><InputWithSuffix type="number" suffix="" value={{x1}} onChange={{e => setX1(e.target.value)}} inputClassName="w-[4rem]" />
          <InputWithSuffix type="number" suffix="" value={{y1}} onChange={{e => setY1(e.target.value)}} inputClassName="w-[4rem]" /></{T}></{T}>
        <{T}><p className="mb-1 text-[12px] font-medium text-[#334155]">(x₂, y₂)</p>
          <{T} className="flex gap-1"><InputWithSuffix type="number" suffix="" value={{x2}} onChange={{e => setX2(e.target.value)}} inputClassName="w-[4rem]" />
          <InputWithSuffix type="number" suffix="" value={{y2}} onChange={{e => setY2(e.target.value)}} inputClassName="w-[4rem]" /></{T}></{T}>
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Find midpoint</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">midpoint</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Average of coordinates</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

add("SolveForX", "SolveForX_Calculator", "solve-for-x-calculator", "Solve for X Calculator",
    "Solve linear equations ax + b = c.", "solve for x calculator",
    H + HI + HF + FN + f'''
export function SolveForX_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [a, setA] = useState("2");
  const [b, setB] = useState("3");
  const [c, setC] = useState("11");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const coef = parseFloat(a), off = parseFloat(b), rhs = parseFloat(c);
    if ([coef, off, rhs].some(v => Number.isNaN(v))) {{ setError("Enter numbers for a, b, and c."); setOut(null); return; }}
    if (coef === 0) {{ setError("a cannot be 0."); setOut(null); return; }}
    setOut(formatNum((rhs - off) / coef, 6));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[13px] text-[#64748b]">Solve ax + b = c</p>
      <{T} className="flex flex-wrap items-center gap-2">
        <InputWithSuffix type="number" suffix="" value={{a}} onChange={{e => setA(e.target.value)}} inputClassName="w-[4rem]" />
        <span className="text-[#64748b]">x +</span>
        <InputWithSuffix type="number" suffix="" value={{b}} onChange={{e => setB(e.target.value)}} inputClassName="w-[4rem]" />
        <span className="text-[#64748b]">=</span>
        <InputWithSuffix type="number" suffix="" value={{c}} onChange={{e => setC(e.target.value)}} inputClassName="w-[4rem]" />
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Solve</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">x = {{out}}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Linear equation</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

add("Lcm", "Lcm_Calculator", "lcm-calculator", "LCM Calculator",
    "Least common multiple of two integers.", "lcm calculator",
    H + HI + HF + FN + f'''
export function Lcm_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [a, setA] = useState("12");
  const [b, setB] = useState("18");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const x = parseInt(a, 10), y = parseInt(b, 10);
    if (Number.isNaN(x) || Number.isNaN(y)) {{ setError("Enter whole numbers."); setOut(null); return; }}
    setOut(String(lcm(x, y)));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="grid grid-cols-2 gap-2 sm:gap-4">
        <InputWithSuffix type="number" suffix="" value={{a}} onChange={{e => setA(e.target.value)}} inputClassName="w-full max-w-[9rem]" />
        <InputWithSuffix type="number" suffix="" value={{b}} onChange={{e => setB(e.target.value)}} inputClassName="w-full max-w-[9rem]" />
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Find LCM</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">least common multiple</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">LCM of two integers</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

add("SurfaceArea", "SurfaceArea_Calculator", "surface-area-calculator", "Surface Area Calculator",
    "Surface area of a box, cylinder, or sphere.", "surface area calculator",
    HS + HI + HF + FN + f'''
type SaShape = "box" | "cylinder" | "sphere";
export function SurfaceArea_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [shape, setShape] = useState<SaShape>("box");
  const [a, setA] = useState("10");
  const [b, setB] = useState("5");
  const [c, setC] = useState("4");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const [label, setLabel] = useState("");
  const run = () => {{
    setError(null);
    const x = parseFloat(a), y = parseFloat(b), z = parseFloat(c);
    let sa: number;
    if (shape === "box") {{
      if ([x, y, z].some(n => Number.isNaN(n) || n <= 0)) {{ setError("Enter positive length, width, height."); setOut(null); return; }}
      sa = 2 * (x * y + y * z + x * z);
      setLabel("2(lw + wh + lh)");
    }} else if (shape === "cylinder") {{
      if (Number.isNaN(x) || Number.isNaN(y) || x <= 0 || y <= 0) {{ setError("Enter positive radius and height."); setOut(null); return; }}
      sa = 2 * Math.PI * x * (x + y);
      setLabel("2πr(r + h)");
    }} else {{
      if (Number.isNaN(x) || x <= 0) {{ setError("Enter positive radius."); setOut(null); return; }}
      sa = 4 * Math.PI * x * x;
      setLabel("4πr²");
    }}
    setOut(formatNum(sa));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Shape</p>
        <CustomSelect<SaShape> id="sa-shape" value={{shape}} onChange={{setShape}}
          options={{[{{ value: "box", label: "Rectangular box" }}, {{ value: "cylinder", label: "Cylinder" }}, {{ value: "sphere", label: "Sphere" }}]}} /></{T}>
      <{T} className="grid grid-cols-3 gap-2">
        <InputWithSuffix type="number" suffix="" value={{a}} onChange={{e => setA(e.target.value)}} inputClassName="w-full" />
        <InputWithSuffix type="number" suffix="" value={{b}} onChange={{e => setB(e.target.value)}} inputClassName="w-full" />
        <InputWithSuffix type="number" suffix="" value={{c}} onChange={{e => setC(e.target.value)}} inputClassName="w-full" />
      </{T}>
      <p className="text-[12px] text-[#64748b]">{{shape === "box" ? "l, w, h" : shape === "cylinder" ? "r, h, —" : "r, —, —"}}</p>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">{{label}}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Surface area</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

add("Log", "Log_Calculator", "log-calculator", "Log Calculator",
    "Natural log (ln) and common log (log₁₀).", "log calculator",
    HS + HI + HF + FN + f'''
export function Log_Calculator() {{
  type Base = "ln" | "log10";
  const resultRef = useRef<HTMLElement>(null);
  const [base, setBase] = useState<Base>("ln");
  const [x, setX] = useState("10");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const v = parseFloat(x);
    if (Number.isNaN(v) || v <= 0) {{ setError("Enter a positive number."); setOut(null); return; }}
    setOut(formatNum(base === "ln" ? Math.log(v) : Math.log10(v), 6));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Log type</p>
        <CustomSelect<Base> id="log-base" value={{base}} onChange={{setBase}}
          options={{[{{ value: "ln", label: "Natural log (ln)" }}, {{ value: "log10", label: "Common log (log₁₀)" }}]}} /></{T}>
      <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">x</p>
        <InputWithSuffix type="number" suffix="" value={{x}} onChange={{e => setX(e.target.value)}} inputClassName="max-w-[10rem]" /></{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Logarithm</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

add("ArcLength", "ArcLength_Calculator", "arc-length-calculator", "Arc Length Calculator",
    "Arc length from radius and central angle in degrees.", "arc length calculator",
    H + HI + HF + FN + f'''
export function ArcLength_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [r, setR] = useState("10");
  const [deg, setDeg] = useState("90");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const run = () => {{
    setError(null);
    const radius = parseFloat(r), angle = parseFloat(deg);
    if (Number.isNaN(radius) || Number.isNaN(angle) || radius <= 0) {{
      setError("Enter positive radius and angle in degrees.");
      setOut(null);
      return;
    }}
    const len = (angle / 360) * 2 * Math.PI * radius;
    setOut(formatNum(len));
    scrollResultIntoViewMobile(resultRef.current);
  }};
  const form = (
    <{T} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <{T} className="grid grid-cols-2 gap-2 sm:gap-4">
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Radius</p>
          <InputWithSuffix type="number" suffix="" value={{r}} onChange={{e => setR(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
        <{T}><p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Angle (°)</p>
          <InputWithSuffix type="number" suffix="" value={{deg}} onChange={{e => setDeg(e.target.value)}} inputClassName="w-full max-w-[9rem]" /></{T}>
      </{T}>
      <FormError message={{error}} /><button type="button" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{T}>
  );
  const result = out != null ? (<><p className="text-center text-3xl font-bold text-[#d66844]">{{out}}</p><p className="text-center text-[14px] text-[#334155]">s = (θ/360) × 2πr</p></>) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Arc length</p>);
  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

# Fractions page reuses Fraction_Calculator
page("fractions-calculator", "Fraction", "Fraction_Calculator", "Fractions Calculator",
     "Add, subtract, multiply, or divide fractions.", "fractions calculator")

print("batch3b done")
