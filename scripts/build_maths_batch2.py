#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMP = ROOT / "src/components/Maths"
APP = ROOT / "src/app/maths"
D = "d" + "i" + "v"

def w(rel: Path, content: str) -> None:
    rel.parent.mkdir(parents=True, exist_ok=True)
    rel.write_text(content, encoding="utf-8")

def page(slug, folder, comp, title, desc, crumb):
    w(APP / slug / "page.tsx", f'''import {{ {comp} }} from "@/components/Maths/{folder}/{comp}";
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
''')

HEAD = '''"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { CustomSelect } from "@/components/Health-Fitness/shared/CustomSelect";
import { InputWithSuffix } from "@/components/Health-Fitness/shared/InputWithSuffix";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
'''

HEAD_NO_SELECT = HEAD.replace(
    'import { CustomSelect } from "@/components/Health-Fitness/shared/CustomSelect";\n', ""
)

MATH = 'import { formatNum, fractionToString, decimalToFraction } from "@/components/Maths/shared/mathUtils";\n'

def panel(form_body: str, result_body: str, btn: str, name: str, placeholder: str) -> str:
    return f'''export function {name}() {{
  const resultRef = useRef<HTMLElement>(null);
{form_body}
  const form = (
    <{D} className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
{form_body}
      <FormError message={{error}} />
      <button type="button" className={{btnCalculate}} onClick={{run}}>{btn}</button>
    </{D}>
  );

  const result =
{result_body}

  return <CalculatorTwoPanel form={{form}} result={{result}} resultRef={{resultRef}} />;
}}
'''

# --- Circumference ---
w(COMP / "Circumference/Circumference_Calculator.tsx", HEAD_NO_SELECT + MATH.replace("fractionToString, decimalToFraction", "formatNum") + '''
export function Circumference_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [r, setR] = useState("5");
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);

  const run = () => {
    setError(null);
    const radius = parseFloat(r);
    if (Number.isNaN(radius) || radius <= 0) {
      setError("Enter a positive radius.");
      setOut(null);
      return;
    }
    setOut(formatNum(2 * Math.PI * radius));
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <''' + D + ''' className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <''' + D + '''>
        <p className="mb-1.5 text-[13px] font-medium text-[#334155] sm:text-[15px]">Radius</p>
        <InputWithSuffix type="number" suffix="" min={0} value={r} onChange={(e) => setR(e.target.value)} inputClassName="max-w-[9rem]" />
      </''' + D + '''>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>Calculate</button>
    </''' + D + '''>
  );

  const result = out != null ? (
    <>
      <p className="text-center text-3xl font-bold text-[#d66844]">{out}</p>
      <p className="text-center text-[14px] text-[#334155]">units (C = 2πr)</p>
    </>
  ) : (
    <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">Circumference from radius</p>
  );

  return <CalculatorTwoPanel form={form} result={result} resultRef={resultRef} />;
}
''')

print("batch2: circumference done - run full script via separate writes")
