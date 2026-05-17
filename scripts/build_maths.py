#!/usr/bin/env python3
"""Generate remaining maths calculators and pages."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMP = ROOT / "src/components/Maths"
APP = ROOT / "src/app/maths"
t = "d" + "i" + "v"

def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")

# --- PercentageIncrease ---
write(COMP / "PercentageIncrease/PercentageIncrease_Calculator.tsx", f'''\"use client\";

import {{ useRef, useState }} from \"react\";
import {{ btnCalculate }} from \"@/components/Health-Fitness/shared/calculatorStyles\";
import {{
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
}} from \"@/components/Health-Fitness/shared/CalculatorTwoPanel\";
import {{ InputWithSuffix }} from \"@/components/Health-Fitness/shared/InputWithSuffix\";
import {{ FormError }} from \"@/components/Health-Fitness/shared/StandardFormRows\";
import {{ formatNum }} from \"@/components/Maths/shared/mathUtils\";

export function PercentageIncrease_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [oldVal, setOldVal] = useState(\"100\");
  const [newVal, setNewVal] = useState(\"125\");
  const [error, setError] = useState<string | null>(null);
  const [pct, setPct] = useState<string | null>(null);

  const run = () => {{
    setError(null);
    const o = parseFloat(oldVal);
    const n = parseFloat(newVal);
    if (Number.isNaN(o) || Number.isNaN(n)) {{
      setError(\"Enter valid numbers.\");
      setPct(null);
      return;
    }}
    if (o === 0) {{
      setError(\"Original value cannot be zero.\");
      setPct(null);
      return;
    }}
    setPct(formatNum(((n - o) / o) * 100) + \"%\");
    scrollResultIntoViewMobile(resultRef.current);
  }};

  const form = (
    <{t} className=\"flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6\">
      <{t} className=\"grid grid-cols-2 gap-2 sm:gap-4\">
        <{t}>
          <p className=\"mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]\">Original value</p>
          <InputWithSuffix type=\"number\" value={{oldVal}} onChange={{(e) => setOldVal(e.target.value)}} inputClassName=\"w-full max-w-[9rem]\" />
        </{t}>
        <{t}>
          <p className=\"mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]\">New value</p>
          <InputWithSuffix type=\"number\" value={{newVal}} onChange={{(e) => setNewVal(e.target.value)}} inputClassName=\"w-full max-w-[9rem]\" />
        </{t}>
      </{t}>
      <FormError message={{error}} />
      <button type=\"button\" className={{btnCalculate}} onClick={{run}}>Calculate increase</button>
    </{t}>
  );

  const result = pct != null ? (
    <>
      <p className=\"text-center text-3xl font-bold text-[#d66844]\">{{pct}}</p>
      <p className=\"text-center text-[14px] text-[#334155]\">percentage increase</p>
    </>
  ) : (
    <p className=\"max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]\">((new − original) ÷ original) × 100</p>
  );

  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

write(COMP / "PercentChange/PercentChange_Calculator.tsx", f'''\"use client\";

import {{ useRef, useState }} from \"react\";
import {{ btnCalculate }} from \"@/components/Health-Fitness/shared/calculatorStyles\";
import {{
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
}} from \"@/components/Health-Fitness/shared/CalculatorTwoPanel\";
import {{ InputWithSuffix }} from \"@/components/Health-Fitness/shared/InputWithSuffix\";
import {{ FormError }} from \"@/components/Health-Fitness/shared/StandardFormRows\";
import {{ formatNum }} from \"@/components/Maths/shared/mathUtils\";

export function PercentChange_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [start, setStart] = useState(\"100\");
  const [end, setEnd] = useState(\"80\");
  const [error, setError] = useState<string | null>(null);
  const [pct, setPct] = useState<string | null>(null);

  const run = () => {{
    setError(null);
    const s = parseFloat(start);
    const e = parseFloat(end);
    if (Number.isNaN(s) || Number.isNaN(e)) {{
      setError(\"Enter valid numbers.\");
      setPct(null);
      return;
    }}
    if (s === 0) {{
      setError(\"Starting value cannot be zero.\");
      setPct(null);
      return;
    }}
    const change = ((e - s) / s) * 100;
    const sign = change > 0 ? \"+\" : \"\";
    setPct(sign + formatNum(change) + \"%\");
    scrollResultIntoViewMobile(resultRef.current);
  }};

  const form = (
    <{t} className=\"flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6\">
      <{t} className=\"grid grid-cols-2 gap-2 sm:gap-4\">
        <{t}>
          <p className=\"mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]\">Starting value</p>
          <InputWithSuffix type=\"number\" value={{start}} onChange={{(e) => setStart(e.target.value)}} inputClassName=\"w-full max-w-[9rem]\" />
        </{t}>
        <{t}>
          <p className=\"mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]\">Ending value</p>
          <InputWithSuffix type=\"number\" value={{end}} onChange={{(e) => setEnd(e.target.value)}} inputClassName=\"w-full max-w-[9rem]\" />
        </{t}>
      </{t}>
      <FormError message={{error}} />
      <button type=\"button\" className={{btnCalculate}} onClick={{run}}>Calculate change</button>
    </{t}>
  );

  const result = pct != null ? (
    <>
      <p className=\"text-center text-3xl font-bold text-[#d66844]\">{{pct}}</p>
      <p className=\"text-center text-[14px] text-[#334155]\">percent change</p>
    </>
  ) : (
    <p className=\"max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]\">((end − start) ÷ start) × 100</p>
  );

  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

write(COMP / "PercentDifference/PercentDifference_Calculator.tsx", f'''\"use client\";

import {{ useRef, useState }} from \"react\";
import {{ btnCalculate }} from \"@/components/Health-Fitness/shared/calculatorStyles\";
import {{
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
}} from \"@/components/Health-Fitness/shared/CalculatorTwoPanel\";
import {{ InputWithSuffix }} from \"@/components/Health-Fitness/shared/InputWithSuffix\";
import {{ FormError }} from \"@/components/Health-Fitness/shared/StandardFormRows\";
import {{ formatNum }} from \"@/components/Maths/shared/mathUtils\";

export function PercentDifference_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [v1, setV1] = useState(\"50\");
  const [v2, setV2] = useState(\"75\");
  const [error, setError] = useState<string | null>(null);
  const [pct, setPct] = useState<string | null>(null);

  const run = () => {{
    setError(null);
    const a = parseFloat(v1);
    const b = parseFloat(v2);
    if (Number.isNaN(a) || Number.isNaN(b)) {{
      setError(\"Enter valid numbers.\");
      setPct(null);
      return;
    }}
    const avg = (a + b) / 2;
    if (avg === 0) {{
      setError(\"Average of the two values cannot be zero.\");
      setPct(null);
      return;
    }}
    setPct(formatNum((Math.abs(a - b) / avg) * 100) + \"%\");
    scrollResultIntoViewMobile(resultRef.current);
  }};

  const form = (
    <{t} className=\"flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6\">
      <{t} className=\"grid grid-cols-2 gap-2 sm:gap-4\">
        <{t}>
          <p className=\"mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]\">Value 1</p>
          <InputWithSuffix type=\"number\" value={{v1}} onChange={{(e) => setV1(e.target.value)}} inputClassName=\"w-full max-w-[9rem]\" />
        </{t}>
        <{t}>
          <p className=\"mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]\">Value 2</p>
          <InputWithSuffix type=\"number\" value={{v2}} onChange={{(e) => setV2(e.target.value)}} inputClassName=\"w-full max-w-[9rem]\" />
        </{t}>
      </{t}>
      <FormError message={{error}} />
      <button type=\"button\" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{t}>
  );

  const result = pct != null ? (
    <>
      <p className=\"text-center text-3xl font-bold text-[#d66844]\">{{pct}}</p>
      <p className=\"text-center text-[14px] text-[#334155]\">percent difference</p>
    </>
  ) : (
    <p className=\"max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]\">|V₁ − V₂| ÷ average × 100</p>
  );

  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

LIST_INPUT = '''\"use client\";

import {{ useRef, useState }} from \"react\";
import {{ btnCalculate }} from \"@/components/Health-Fitness/shared/calculatorStyles\";
import {{
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
}} from \"@/components/Health-Fitness/shared/CalculatorTwoPanel\";
import {{ FormError }} from \"@/components/Health-Fitness/shared/StandardFormRows\";
import {{ formatNum, parseNumberList, statsFromList }} from \"@/components/Maths/shared/mathUtils\";
'''

write(COMP / "Average/Average_Calculator.tsx", LIST_INPUT + f'''
export function Average_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [raw, setRaw] = useState(\"10, 20, 30, 40\");
  const [error, setError] = useState<string | null>(null);
  const [avg, setAvg] = useState<string | null>(null);

  const run = () => {{
    setError(null);
    const vals = parseNumberList(raw);
    if (vals.length === 0) {{
      setError(\"Enter at least one number (comma or space separated).\");
      setAvg(null);
      return;
    }}
    const s = statsFromList(vals);
    setAvg(formatNum(s.mean));
    scrollResultIntoViewMobile(resultRef.current);
  }};

  const form = (
    <{t} className=\"flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6\">
      <{t}>
        <p className=\"mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]\">Numbers</p>
        <textarea
          value={{raw}}
          onChange={{(e) => setRaw(e.target.value)}}
          rows={{4}}
          className=\"w-full rounded border border-[#E0E0E0] bg-white px-3 py-2 text-[14px] text-[#334155] outline-none focus:border-[#2374ac] focus:ring-1 focus:ring-[#2374ac]\"
          placeholder=\"e.g. 10, 20, 30\"
        />
      </{t}>
      <FormError message={{error}} />
      <button type=\"button\" className={{btnCalculate}} onClick={{run}}>Calculate average</button>
    </{t}>
  );

  const result = avg != null ? (
    <>
      <p className=\"text-center text-3xl font-bold text-[#d66844]\">{{avg}}</p>
      <p className=\"text-center text-[14px] text-[#334155]\">arithmetic mean</p>
    </>
  ) : (
    <p className=\"max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]\">Sum ÷ count</p>
  );

  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

write(COMP / "MeanMedianMode/MeanMedianMode_Calculator.tsx", LIST_INPUT + f'''
export function MeanMedianMode_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [raw, setRaw] = useState(\"3, 7, 7, 9, 15\");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{{ mean: string; median: string; mode: string }} | null>(null);

  const run = () => {{
    setError(null);
    const vals = parseNumberList(raw);
    if (vals.length === 0) {{
      setError(\"Enter at least one number.\");
      setOut(null);
      return;
    }}
    const s = statsFromList(vals);
    const modeStr = s.mode.length ? s.mode.map((m) => formatNum(m)).join(\", \") : \"none\";
    setOut({{ mean: formatNum(s.mean), median: formatNum(s.median), mode: modeStr }});
    scrollResultIntoViewMobile(resultRef.current);
  }};

  const form = (
    <{t} className=\"flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6\">
      <{t}>
        <p className=\"mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]\">Numbers</p>
        <textarea
          value={{raw}}
          onChange={{(e) => setRaw(e.target.value)}}
          rows={{4}}
          className=\"w-full rounded border border-[#E0E0E0] bg-white px-3 py-2 text-[14px] text-[#334155] outline-none focus:border-[#2374ac] focus:ring-1 focus:ring-[#2374ac]\"
        />
      </{t}>
      <FormError message={{error}} />
      <button type=\"button\" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{t}>
  );

  const result = out != null ? (
    <{t} className=\"w-full max-w-[14rem] space-y-2 text-[13px] text-[#334155]\">
      <p><span className=\"font-semibold\">Mean:</span> {{out.mean}}</p>
      <p><span className=\"font-semibold\">Median:</span> {{out.median}}</p>
      <p><span className=\"font-semibold\">Mode:</span> {{out.mode}}</p>
    </{t}>
  ) : (
    <p className=\"max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]\">Enter a data set</p>
  );

  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

write(COMP / "StandardDeviation/StandardDeviation_Calculator.tsx", LIST_INPUT + f'''
export function StandardDeviation_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [raw, setRaw] = useState(\"2, 4, 4, 4, 5, 5, 7, 9\");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{{ sample: string; population: string }} | null>(null);

  const run = () => {{
    setError(null);
    const vals = parseNumberList(raw);
    if (vals.length < 2) {{
      setError(\"Enter at least two numbers.\");
      setOut(null);
      return;
    }}
    const s = statsFromList(vals);
    setOut({{
      sample: formatNum(s.sampleSd),
      population: formatNum(s.populationSd),
    }});
    scrollResultIntoViewMobile(resultRef.current);
  }};

  const form = (
    <{t} className=\"flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6\">
      <{t}>
        <p className=\"mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]\">Numbers</p>
        <textarea
          value={{raw}}
          onChange={{(e) => setRaw(e.target.value)}}
          rows={{4}}
          className=\"w-full rounded border border-[#E0E0E0] bg-white px-3 py-2 text-[14px] text-[#334155] outline-none focus:border-[#2374ac] focus:ring-1 focus:ring-[#2374ac]\"
        />
      </{t}>
      <FormError message={{error}} />
      <button type=\"button\" className={{btnCalculate}} onClick={{run}}>Calculate</button>
    </{t}>
  );

  const result = out != null ? (
    <{t} className=\"w-full max-w-[14rem] space-y-2 text-[13px] text-[#334155]\">
      <p className=\"text-center text-2xl font-bold text-[#d66844]\">{{out.sample}}</p>
      <p className=\"text-center text-[14px] font-medium\">sample SD (n−1)</p>
      <p className=\"pt-2 text-center\"><span className=\"font-semibold\">Population SD:</span> {{out.population}}</p>
    </{t}>
  ) : (
    <p className=\"max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]\">Sample & population standard deviation</p>
  );

  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

write(COMP / "Volume/Volume_Calculator.tsx", f'''\"use client\";

import {{ useRef, useState }} from \"react\";
import {{ btnCalculate }} from \"@/components/Health-Fitness/shared/calculatorStyles\";
import {{
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
}} from \"@/components/Health-Fitness/shared/CalculatorTwoPanel\";
import {{ CustomSelect }} from \"@/components/Health-Fitness/shared/CustomSelect\";
import {{ InputWithSuffix }} from \"@/components/Health-Fitness/shared/InputWithSuffix\";
import {{ FormError }} from \"@/components/Health-Fitness/shared/StandardFormRows\";
import {{ formatNum }} from \"@/components/Maths/shared/mathUtils\";

type Shape = \"box\" | \"cylinder\" | \"sphere\";

export function Volume_Calculator() {{
  const resultRef = useRef<HTMLElement>(null);
  const [shape, setShape] = useState<Shape>(\"box\");
  const [a, setA] = useState(\"10\");
  const [b, setB] = useState(\"5\");
  const [c, setC] = useState(\"4\");
  const [error, setError] = useState<string | null>(null);
  const [vol, setVol] = useState<string | null>(null);
  const [label, setLabel] = useState(\"\");

  const run = () => {{
    setError(null);
    const x = parseFloat(a);
    const y = parseFloat(b);
    const z = parseFloat(c);
    let v: number;
    if (shape === \"box\") {{
      if ([x, y, z].some((n) => Number.isNaN(n) || n <= 0)) {{
        setError(\"Enter positive length, width, and height.\");
        setVol(null);
        return;
      }}
      v = x * y * z;
      setLabel(\"cubic units (l × w × h)\");
    }} else if (shape === \"cylinder\") {{
      if (Number.isNaN(x) || Number.isNaN(y) || x <= 0 || y <= 0) {{
        setError(\"Enter positive radius and height.\");
        setVol(null);
        return;
      }}
      v = Math.PI * x * x * y;
      setLabel(\"cubic units (πr²h)\");
    }} else {{
      if (Number.isNaN(x) || x <= 0) {{
        setError(\"Enter a positive radius.\");
        setVol(null);
        return;
      }}
      v = (4 / 3) * Math.PI * x * x * x;
      setLabel(\"cubic units (⁴⁄₃πr³)\");
    }}
    setVol(formatNum(v));
    scrollResultIntoViewMobile(resultRef.current);
  }};

  const form = (
    <{t} className=\"flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6\">
      <{t}>
        <p className=\"mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]\">Shape</p>
        <CustomSelect<Shape>
          id=\"vol-shape\"
          value={{shape}}
          onChange={{setShape}}
          options={{[
            {{ value: \"box\", label: \"Rectangular box\" }},
            {{ value: \"cylinder\", label: \"Cylinder\" }},
            {{ value: \"sphere\", label: \"Sphere\" }},
          ]}}
        />
      </{t}>
      {{shape === \"box\" ? (
        <{t} className=\"grid grid-cols-3 gap-2\">
          <{t}>
            <p className=\"mb-1 text-[12px] font-medium text-[#334155]\">Length</p>
            <InputWithSuffix type=\"number\" min={{0}} value={{a}} onChange={{(e) => setA(e.target.value)}} inputClassName=\"w-full\" />
          </{t}>
          <{t}>
            <p className=\"mb-1 text-[12px] font-medium text-[#334155]\">Width</p>
            <InputWithSuffix type=\"number\" min={{0}} value={{b}} onChange={{(e) => setB(e.target.value)}} inputClassName=\"w-full\" />
          </{t}>
          <{t}>
            <p className=\"mb-1 text-[12px] font-medium text-[#334155]\">Height</p>
            <InputWithSuffix type=\"number\" min={{0}} value={{c}} onChange={{(e) => setC(e.target.value)}} inputClassName=\"w-full\" />
          </{t}>
        </{t}>
      ) : shape === \"cylinder\" ? (
        <{t} className=\"grid grid-cols-2 gap-2 sm:gap-4\">
          <{t}>
            <p className=\"mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]\">Radius</p>
            <InputWithSuffix type=\"number\" min={{0}} value={{a}} onChange={{(e) => setA(e.target.value)}} inputClassName=\"w-full max-w-[9rem]\" />
          </{t}>
          <{t}>
            <p className=\"mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]\">Height</p>
            <InputWithSuffix type=\"number\" min={{0}} value={{b}} onChange={{(e) => setB(e.target.value)}} inputClassName=\"w-full max-w-[9rem]\" />
          </{t}>
        </{t}>
      ) : (
        <{t}>
          <p className=\"mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]\">Radius</p>
          <InputWithSuffix type=\"number\" min={{0}} value={{a}} onChange={{(e) => setA(e.target.value)}} inputClassName=\"max-w-[9rem]\" />
        </{t}>
      )}}
      <FormError message={{error}} />
      <button type=\"button\" className={{btnCalculate}} onClick={{run}}>Calculate volume</button>
    </{t}>
  );

  const result = vol != null ? (
    <>
      <p className=\"text-center text-3xl font-bold text-[#d66844]\">{{vol}}</p>
      <p className=\"text-center text-[14px] text-[#334155]\">{{label}}</p>
    </>
  ) : (
    <p className=\"max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]\">Box, cylinder, or sphere</p>
  );

  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
''')

PAGES = [
  ("random-number-generator", "RandomNumber", "RandomNumber_Calculator", "Random Number Generator", "Generate random integers in a custom range.", "random number generator"),
  ("fraction-calculator", "Fraction", "Fraction_Calculator", "Fraction Calculator", "Add, subtract, multiply, and divide fractions.", "fraction calculator"),
  ("percent-calculator", "Percent", "Percent_Calculator", "Percent Calculator", "Find X% of Y or what percent one number is of another.", "percent calculator"),
  ("percentage-increase-calculator", "PercentageIncrease", "PercentageIncrease_Calculator", "Percentage Increase Calculator", "Percent increase from an original value to a new value.", "percentage increase calculator"),
  ("percent-change-calculator", "PercentChange", "PercentChange_Calculator", "Percent Change Calculator", "Percent change between a starting and ending value.", "percent change calculator"),
  ("standard-deviation-calculator", "StandardDeviation", "StandardDeviation_Calculator", "Standard Deviation Calculator", "Sample and population standard deviation from a data set.", "standard deviation calculator"),
  ("mean-median-mode-calculator", "MeanMedianMode", "MeanMedianMode_Calculator", "Mean Median Mode Calculator", "Mean, median, and mode for a list of numbers.", "mean median mode calculator"),
  ("average-calculator", "Average", "Average_Calculator", "Average Calculator", "Arithmetic mean of any list of numbers.", "average calculator"),
  ("volume-calculator", "Volume", "Volume_Calculator", "Volume Calculator", "Volume of a box, cylinder, or sphere.", "volume calculator"),
  ("percent-difference-calculator", "PercentDifference", "PercentDifference_Calculator", "Percent Difference Calculator", "Percent difference relative to the average of two values.", "percent difference calculator"),
]

for slug, folder, comp, title, desc, crumb in PAGES:
    path = f"/maths/{slug}"
    write(APP / slug / "page.tsx", f'''import {{ {comp} }} from "@/components/Maths/{folder}/{comp}";
import {{ MathsCalculatorPageLayout }} from "@/components/Maths/shared/MathsCalculatorPageLayout";
import {{ generateCalculatorPageMetadata }} from "@/lib/calculatorPageMetadata";

const PATH = "{path}";
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
''')

print("Generated calculators and pages")
