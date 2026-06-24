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
  CalculatorResultRow,
  calcLabelClass,
} from "@/components/shared/calculatorFields";
import { loanPaymentMonthly, parseMoney, parsePositive } from "./financeCalcUtils";

function useRunner<T>() {
  const resultRef = useRef<HTMLElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<T | null>(null);
  const finish = (data: T | null, err: string | null) => {
    setError(err);
    setResult(data);
    if (data && !err) scrollResultIntoViewMobile(resultRef.current);
  };
  return { resultRef, error, result, finish };
}

const money = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const pct = (n: number) => `${formatNum(n, 2)}%`;

function Headline({ value, caption }: { value: string; caption: string }) {
  return (
    <>
      <p className="mb-2 text-center text-3xl font-semibold text-[#d66844] sm:text-4xl">
        {value}
      </p>
      <p className="mb-3 text-center text-[14px] font-medium text-[#334155]">{caption}</p>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* CAGR — compound annual growth rate                                  */
/* ------------------------------------------------------------------ */

export function Cagr_Calculator() {
  const { resultRef, error, result, finish } = useRunner<{
    cagr: string;
    total: string;
  }>();
  const [begin, setBegin] = useState("10000");
  const [end, setEnd] = useState("18000");
  const [years, setYears] = useState("5");

  const run = () => {
    const b = parsePositive(begin);
    const e = parsePositive(end);
    const y = parsePositive(years);
    if (b == null || e == null || y == null) {
      finish(null, "Enter a positive beginning value, ending value, and number of years.");
      return;
    }
    const cagr = (Math.pow(e / b, 1 / y) - 1) * 100;
    const total = (e / b - 1) * 100;
    finish({ cagr: pct(cagr), total: pct(total) }, null);
  };

  return (
    <CalculatorTwoPanel
      resultRef={resultRef}
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <CalculatorNumberField id="cagr-begin" label="Beginning value" suffix="$" min={0} step="any" value={begin} onChange={(e) => setBegin(e.target.value)} />
          <CalculatorNumberField id="cagr-end" label="Ending value" suffix="$" min={0} step="any" value={end} onChange={(e) => setEnd(e.target.value)} />
          <CalculatorNumberField id="cagr-years" label="Number of years" min={0} step="any" value={years} onChange={(e) => setYears(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate CAGR</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <Headline value={result.cagr} caption="compound annual growth rate" />
            <dl>
              <CalculatorResultRow label="Total growth" value={result.total} />
            </dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Enter start and end values to find CAGR.</CalculatorEmptyResult>
        )
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* APY — annual percentage yield from a nominal rate                   */
/* ------------------------------------------------------------------ */

export function Apy_Calculator() {
  const { resultRef, error, result, finish } = useRunner<{ apy: string }>();
  const [rate, setRate] = useState("5");
  const [freq, setFreq] = useState("12");

  const run = () => {
    const r = parseMoney(rate);
    if (r == null || r < 0) {
      finish(null, "Enter a valid nominal interest rate.");
      return;
    }
    const rDec = r / 100;
    let apy: number;
    if (freq === "continuous") {
      apy = (Math.expm1(rDec)) * 100;
    } else {
      const n = Number(freq);
      apy = (Math.pow(1 + rDec / n, n) - 1) * 100;
    }
    finish({ apy: pct(apy) }, null);
  };

  return (
    <CalculatorTwoPanel
      resultRef={resultRef}
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <CalculatorNumberField id="apy-rate" label="Nominal annual rate (APR)" suffix="%" min={0} step="any" value={rate} onChange={(e) => setRate(e.target.value)} />
          <div>
            <label htmlFor="apy-freq" className={calcLabelClass}>Compounding frequency</label>
            <CustomSelect<string>
              id="apy-freq"
              value={freq}
              onChange={setFreq}
              options={[
                { value: "1", label: "Annually" },
                { value: "2", label: "Semi-annually" },
                { value: "4", label: "Quarterly" },
                { value: "12", label: "Monthly" },
                { value: "365", label: "Daily" },
                { value: "continuous", label: "Continuously" },
              ]}
            />
          </div>
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate APY</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <Headline value={result.apy} caption="annual percentage yield" />
          </div>
        ) : (
          <CalculatorEmptyResult>Enter a nominal rate to find the APY.</CalculatorEmptyResult>
        )
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* CPM — cost per thousand impressions                                 */
/* ------------------------------------------------------------------ */

type CpmMode = "cpm" | "cost" | "impressions";

export function Cpm_Calculator() {
  const { resultRef, error, result, finish } = useRunner<{
    value: string;
    caption: string;
  }>();
  const [mode, setMode] = useState<CpmMode>("cpm");
  const [cost, setCost] = useState("500");
  const [impressions, setImpressions] = useState("200000");
  const [cpm, setCpm] = useState("2.5");

  const run = () => {
    if (mode === "cpm") {
      const c = parsePositive(cost);
      const i = parsePositive(impressions);
      if (c == null || i == null) {
        finish(null, "Enter a positive cost and number of impressions.");
        return;
      }
      finish({ value: money((c / i) * 1000), caption: "CPM (cost per 1,000 impressions)" }, null);
    } else if (mode === "cost") {
      const m = parsePositive(cpm);
      const i = parsePositive(impressions);
      if (m == null || i == null) {
        finish(null, "Enter a positive CPM and number of impressions.");
        return;
      }
      finish({ value: money((m * i) / 1000), caption: "total campaign cost" }, null);
    } else {
      const c = parsePositive(cost);
      const m = parsePositive(cpm);
      if (c == null || m == null) {
        finish(null, "Enter a positive cost and CPM.");
        return;
      }
      finish({
        value: Math.round((c / m) * 1000).toLocaleString("en-US"),
        caption: "impressions",
      }, null);
    }
  };

  return (
    <CalculatorTwoPanel
      resultRef={resultRef}
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <div>
            <label htmlFor="cpm-mode" className={calcLabelClass}>Solve for</label>
            <CustomSelect<CpmMode>
              id="cpm-mode"
              value={mode}
              onChange={setMode}
              options={[
                { value: "cpm", label: "CPM" },
                { value: "cost", label: "Total cost" },
                { value: "impressions", label: "Impressions" },
              ]}
            />
          </div>
          {mode !== "cost" ? (
            <CalculatorNumberField id="cpm-cost" label="Total cost" suffix="$" min={0} step="any" value={cost} onChange={(e) => setCost(e.target.value)} />
          ) : null}
          {mode !== "impressions" ? (
            <CalculatorNumberField id="cpm-impr" label="Impressions" min={0} step="any" value={impressions} onChange={(e) => setImpressions(e.target.value)} />
          ) : null}
          {mode !== "cpm" ? (
            <CalculatorNumberField id="cpm-cpm" label="CPM" suffix="$" min={0} step="any" value={cpm} onChange={(e) => setCpm(e.target.value)} />
          ) : null}
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <Headline value={result.value} caption={result.caption} />
          </div>
        ) : (
          <CalculatorEmptyResult>Choose what to solve for and enter the known values.</CalculatorEmptyResult>
        )
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* Markup — selling price and margin from cost                         */
/* ------------------------------------------------------------------ */

type MarkupMode = "from-markup" | "from-price";

export function Markup_Calculator() {
  const { resultRef, error, result, finish } = useRunner<{
    headline: string;
    caption: string;
    rows: { label: string; value: string }[];
  }>();
  const [mode, setMode] = useState<MarkupMode>("from-markup");
  const [cost, setCost] = useState("40");
  const [markup, setMarkup] = useState("50");
  const [price, setPrice] = useState("80");

  const run = () => {
    const c = parsePositive(cost);
    if (c == null) {
      finish(null, "Enter a positive cost.");
      return;
    }
    if (mode === "from-markup") {
      const mk = parseMoney(markup);
      if (mk == null || mk < 0) {
        finish(null, "Enter a valid markup percentage.");
        return;
      }
      const sell = c * (1 + mk / 100);
      const profit = sell - c;
      const margin = (profit / sell) * 100;
      finish({
        headline: money(sell),
        caption: "selling price",
        rows: [
          { label: "Profit", value: money(profit) },
          { label: "Profit margin", value: pct(margin) },
        ],
      }, null);
    } else {
      const p = parsePositive(price);
      if (p == null) {
        finish(null, "Enter a positive selling price.");
        return;
      }
      const profit = p - c;
      const markupPct = (profit / c) * 100;
      const margin = (profit / p) * 100;
      finish({
        headline: pct(markupPct),
        caption: "markup",
        rows: [
          { label: "Profit", value: money(profit) },
          { label: "Profit margin", value: pct(margin) },
        ],
      }, null);
    }
  };

  return (
    <CalculatorTwoPanel
      resultRef={resultRef}
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <div>
            <label htmlFor="markup-mode" className={calcLabelClass}>Calculate from</label>
            <CustomSelect<MarkupMode>
              id="markup-mode"
              value={mode}
              onChange={setMode}
              options={[
                { value: "from-markup", label: "Cost + markup %" },
                { value: "from-price", label: "Cost + selling price" },
              ]}
            />
          </div>
          <CalculatorNumberField id="markup-cost" label="Cost" suffix="$" min={0} step="any" value={cost} onChange={(e) => setCost(e.target.value)} />
          {mode === "from-markup" ? (
            <CalculatorNumberField id="markup-pct" label="Markup" suffix="%" min={0} step="any" value={markup} onChange={(e) => setMarkup(e.target.value)} />
          ) : (
            <CalculatorNumberField id="markup-price" label="Selling price" suffix="$" min={0} step="any" value={price} onChange={(e) => setPrice(e.target.value)} />
          )}
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <Headline value={result.headline} caption={result.caption} />
            <dl>
              {result.rows.map((r) => (
                <CalculatorResultRow key={r.label} label={r.label} value={r.value} />
              ))}
            </dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Enter a cost to calculate markup, price, and margin.</CalculatorEmptyResult>
        )
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* Present Value — discount a future sum to today                      */
/* ------------------------------------------------------------------ */

export function PresentValue_Calculator() {
  const { resultRef, error, result, finish } = useRunner<{
    pv: string;
    discount: string;
  }>();
  const [fv, setFv] = useState("10000");
  const [rate, setRate] = useState("6");
  const [years, setYears] = useState("10");
  const [freq, setFreq] = useState("1");

  const run = () => {
    const f = parsePositive(fv);
    const r = parseMoney(rate);
    const y = parsePositive(years);
    if (f == null || r == null || r < 0 || y == null) {
      finish(null, "Enter a positive future value, non-negative rate, and number of years.");
      return;
    }
    const n = Number(freq);
    const pv = f / Math.pow(1 + r / 100 / n, n * y);
    finish({ pv: money(pv), discount: money(f - pv) }, null);
  };

  return (
    <CalculatorTwoPanel
      resultRef={resultRef}
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <CalculatorNumberField id="pv-fv" label="Future value" suffix="$" min={0} step="any" value={fv} onChange={(e) => setFv(e.target.value)} />
          <CalculatorNumberField id="pv-rate" label="Discount rate" suffix="%" min={0} step="any" value={rate} onChange={(e) => setRate(e.target.value)} />
          <CalculatorNumberField id="pv-years" label="Number of years" min={0} step="any" value={years} onChange={(e) => setYears(e.target.value)} />
          <div>
            <label htmlFor="pv-freq" className={calcLabelClass}>Compounding frequency</label>
            <CustomSelect<string>
              id="pv-freq"
              value={freq}
              onChange={setFreq}
              options={[
                { value: "1", label: "Annually" },
                { value: "2", label: "Semi-annually" },
                { value: "4", label: "Quarterly" },
                { value: "12", label: "Monthly" },
              ]}
            />
          </div>
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate present value</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <Headline value={result.pv} caption="present value" />
            <dl>
              <CalculatorResultRow label="Total discount" value={result.discount} />
            </dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Enter a future value to discount it to today.</CalculatorEmptyResult>
        )
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* Budget — 50/30/20 monthly breakdown                                 */
/* ------------------------------------------------------------------ */

export function Budget_Calculator() {
  const { resultRef, error, result, finish } = useRunner<{
    needs: string;
    wants: string;
    savings: string;
  }>();
  const [income, setIncome] = useState("4000");

  const run = () => {
    const i = parsePositive(income);
    if (i == null) {
      finish(null, "Enter a positive monthly take-home income.");
      return;
    }
    finish({
      needs: money(i * 0.5),
      wants: money(i * 0.3),
      savings: money(i * 0.2),
    }, null);
  };

  return (
    <CalculatorTwoPanel
      resultRef={resultRef}
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <p className="text-[13px] text-[#64748b] sm:text-[14px]">
            The 50/30/20 rule splits take-home pay into needs, wants, and savings.
          </p>
          <CalculatorNumberField id="budget-income" label="Monthly take-home income" suffix="$" min={0} step="any" value={income} onChange={(e) => setIncome(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Build budget</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <dl>
              <CalculatorResultRow label="Needs (50%)" value={result.needs} />
              <CalculatorResultRow label="Wants (30%)" value={result.wants} />
              <CalculatorResultRow label="Savings & debt (20%)" value={result.savings} />
            </dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Enter your income for a 50/30/20 split.</CalculatorEmptyResult>
        )
      }
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px]">
          The 50/30/20 rule is a guideline — adjust the split to fit your goals.
        </p>
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* Rent vs Buy — total cost comparison over a horizon                  */
/* ------------------------------------------------------------------ */

export function RentVsBuy_Calculator() {
  const { resultRef, error, result, finish } = useRunner<{
    verdict: string;
    buyCost: string;
    rentCost: string;
    difference: string;
  }>();
  const [price, setPrice] = useState("400000");
  const [downPct, setDownPct] = useState("20");
  const [rate, setRate] = useState("6.5");
  const [term, setTerm] = useState("30");
  const [horizon, setHorizon] = useState("7");
  const [costsPct, setCostsPct] = useState("2.5");
  const [appreciation, setAppreciation] = useState("3");
  const [rent, setRent] = useState("2000");
  const [rentGrowth, setRentGrowth] = useState("3");

  const run = () => {
    const p = parsePositive(price);
    const dp = parseMoney(downPct);
    const r = parseMoney(rate);
    const t = parsePositive(term);
    const h = parsePositive(horizon);
    const costs = parseMoney(costsPct);
    const appr = parseMoney(appreciation);
    const rentMonthly = parsePositive(rent);
    const rg = parseMoney(rentGrowth);

    if (
      p == null || dp == null || dp < 0 || dp >= 100 || r == null || r < 0 ||
      t == null || h == null || costs == null || costs < 0 || appr == null ||
      rentMonthly == null || rg == null || rg < 0
    ) {
      finish(null, "Check your inputs — percentages should be 0–100 and amounts positive.");
      return;
    }

    const downPayment = p * (dp / 100);
    const loan = p - downPayment;
    const monthlyPmt = loanPaymentMonthly(loan, r, t) ?? 0;
    const months = Math.round(h * 12);
    const termMonths = Math.round(t * 12);

    // Amortize over the horizon to find balance and P&I paid.
    const mRate = r / 100 / 12;
    let balance = loan;
    let principalAndInterest = 0;
    for (let m = 0; m < Math.min(months, termMonths) && balance > 0; m++) {
      const interest = mRate * balance;
      const principal = Math.min(monthlyPmt - interest, balance);
      balance = Math.max(0, balance - principal);
      principalAndInterest += principal + interest;
    }

    // Ongoing ownership costs (taxes, insurance, maintenance) as % of price/yr.
    const ownershipCosts = p * (costs / 100) * h;
    const homeValueEnd = p * Math.pow(1 + appr / 100, h);
    const equityEnd = homeValueEnd - balance;
    const buyNetCost = downPayment + principalAndInterest + ownershipCosts - equityEnd;

    // Total rent paid with annual increases.
    let totalRent = 0;
    let yearlyRent = rentMonthly * 12;
    for (let y = 0; y < Math.ceil(h); y++) {
      const fraction = Math.min(1, h - y);
      totalRent += yearlyRent * fraction;
      yearlyRent *= 1 + rg / 100;
    }

    const diff = Math.abs(buyNetCost - totalRent);
    const verdict = buyNetCost < totalRent ? "Buying is cheaper" : "Renting is cheaper";

    finish({
      verdict,
      buyCost: money(buyNetCost),
      rentCost: money(totalRent),
      difference: money(diff),
    }, null);
  };

  return (
    <CalculatorTwoPanel
      resultRef={resultRef}
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <CalculatorNumberField id="rvb-price" label="Home price" suffix="$" min={0} step="any" value={price} onChange={(e) => setPrice(e.target.value)} />
          <CalculatorNumberField id="rvb-down" label="Down payment" suffix="%" min={0} step="any" value={downPct} onChange={(e) => setDownPct(e.target.value)} />
          <CalculatorNumberField id="rvb-rate" label="Mortgage rate" suffix="%" min={0} step="any" value={rate} onChange={(e) => setRate(e.target.value)} />
          <CalculatorNumberField id="rvb-term" label="Loan term" suffix="yr" min={0} step="any" value={term} onChange={(e) => setTerm(e.target.value)} />
          <CalculatorNumberField id="rvb-horizon" label="Years you'll stay" min={0} step="any" value={horizon} onChange={(e) => setHorizon(e.target.value)} />
          <CalculatorNumberField id="rvb-costs" label="Tax, insurance & upkeep" suffix="%/yr" hint="Percent of home price per year." min={0} step="any" value={costsPct} onChange={(e) => setCostsPct(e.target.value)} />
          <CalculatorNumberField id="rvb-appr" label="Home appreciation" suffix="%/yr" min={0} step="any" value={appreciation} onChange={(e) => setAppreciation(e.target.value)} />
          <CalculatorNumberField id="rvb-rent" label="Monthly rent" suffix="$" min={0} step="any" value={rent} onChange={(e) => setRent(e.target.value)} />
          <CalculatorNumberField id="rvb-rg" label="Annual rent increase" suffix="%/yr" min={0} step="any" value={rentGrowth} onChange={(e) => setRentGrowth(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Compare</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <Headline value={result.verdict} caption={`by ${result.difference} over the period`} />
            <dl>
              <CalculatorResultRow label="Net cost of buying" value={result.buyCost} />
              <CalculatorResultRow label="Total cost of renting" value={result.rentCost} />
            </dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Enter the details to compare renting and buying.</CalculatorEmptyResult>
        )
      }
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px]">
          Simplified comparison. Net cost of buying subtracts your home equity at
          the end. Excludes closing costs, selling fees, taxes, and investing the
          down payment.
        </p>
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* Price per square foot                                               */
/* ------------------------------------------------------------------ */

type PsfMode = "ppsf" | "price" | "sqft";

export function PricePerSqft_Calculator() {
  const { resultRef, error, result, finish } = useRunner<{
    value: string;
    caption: string;
  }>();
  const [mode, setMode] = useState<PsfMode>("ppsf");
  const [price, setPrice] = useState("350000");
  const [sqft, setSqft] = useState("1800");
  const [ppsf, setPpsf] = useState("194.44");

  const run = () => {
    if (mode === "ppsf") {
      const p = parsePositive(price);
      const s = parsePositive(sqft);
      if (p == null || s == null) {
        finish(null, "Enter a positive price and square footage.");
        return;
      }
      finish({ value: money(p / s), caption: "price per square foot" }, null);
    } else if (mode === "price") {
      const m = parsePositive(ppsf);
      const s = parsePositive(sqft);
      if (m == null || s == null) {
        finish(null, "Enter a positive price per sq ft and square footage.");
        return;
      }
      finish({ value: money(m * s), caption: "total price" }, null);
    } else {
      const p = parsePositive(price);
      const m = parsePositive(ppsf);
      if (p == null || m == null) {
        finish(null, "Enter a positive price and price per sq ft.");
        return;
      }
      finish({
        value: `${formatNum(p / m, 2)} sq ft`,
        caption: "square footage",
      }, null);
    }
  };

  return (
    <CalculatorTwoPanel
      resultRef={resultRef}
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <div>
            <label htmlFor="psf-mode" className={calcLabelClass}>Solve for</label>
            <CustomSelect<PsfMode>
              id="psf-mode"
              value={mode}
              onChange={setMode}
              options={[
                { value: "ppsf", label: "Price per sq ft" },
                { value: "price", label: "Total price" },
                { value: "sqft", label: "Square footage" },
              ]}
            />
          </div>
          {mode !== "price" ? (
            <CalculatorNumberField id="psf-price" label="Total price" suffix="$" min={0} step="any" value={price} onChange={(e) => setPrice(e.target.value)} />
          ) : null}
          {mode !== "sqft" ? (
            <CalculatorNumberField id="psf-sqft" label="Square footage" suffix="sq ft" min={0} step="any" value={sqft} onChange={(e) => setSqft(e.target.value)} />
          ) : null}
          {mode !== "ppsf" ? (
            <CalculatorNumberField id="psf-ppsf" label="Price per sq ft" suffix="$" min={0} step="any" value={ppsf} onChange={(e) => setPpsf(e.target.value)} />
          ) : null}
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <Headline value={result.value} caption={result.caption} />
          </div>
        ) : (
          <CalculatorEmptyResult>Choose what to solve for and enter the known values.</CalculatorEmptyResult>
        )
      }
    />
  );
}
