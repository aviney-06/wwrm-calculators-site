"use client";

import { useRef, useState } from "react";
import { btnCalculate } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import {
  CalculatorEmptyResult,
  CalculatorNumberField,
  CalculatorResultRow,
  calcHintClass,
} from "@/components/shared/calculatorFields";
import {
  US_WORK_HOURS_PER_YEAR,
  amortizationSchedule,
  applyDiscount,
  autoLeaseMonthly,
  currencyConvert,
  estimatedIncomeTax,
  helocInterestOnlyMonthly,
  hourlyToSalary,
  inflationPurchasingPower,
  loanPayoffMonths,
  loanPaymentMonthly,
  maxLoanFromPayment,
  maxRentFromIncome,
  parseNonNegative,
  parsePositive,
  payRaise,
  refinanceMonthlySavings,
  salaryToHourly,
  salesTax,
  simpleInterestAmount,
  solveAnnualRateFromPayment,
} from "./financeCalcUtils";

function useFinanceRunner<T>() {
  const resultRef = useRef<HTMLElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<T | null>(null);
  const finish = (data: T | null, err: string | null) => {
    setError(err);
    setResult(data);
    if (data && !err) scrollResultIntoViewMobile(resultRef.current);
  };
  return { resultRef, error, result, finish, setError, setResult };
}

export function Amortization_Calculator() {
  const { resultRef, error, result, finish } = useFinanceRunner<{
    payment: string;
    firstPrincipal: string;
    firstInterest: string;
    months: number;
  }>();

  const [principal, setPrincipal] = useState("250000");
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState("30");

  const run = () => {
    const p = parsePositive(principal);
    const annual = parseFloat(rate);
    const y = parsePositive(years);
    if (p == null || !Number.isFinite(annual) || y == null) {
      finish(null, "Enter valid loan amount, rate, and term.");
      return;
    }
    const rows = amortizationSchedule(p, annual, y, 12);
    const pmt = loanPaymentMonthly(p, annual, y);
    if (!rows?.length || pmt == null) {
      finish(null, "Could not build schedule.");
      return;
    }
    finish(
      {
        payment: formatNum(pmt, 2),
        firstPrincipal: formatNum(rows[0].principal, 2),
        firstInterest: formatNum(rows[0].interest, 2),
        months: Math.round(y * 12),
      },
      null,
    );
  };

  return (
    <CalculatorTwoPanel
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <p className={calcHintClass}>First payment breakdown (US amortizing loan).</p>
          <CalculatorNumberField id="amort-p" label="Loan amount" suffix="$" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
          <CalculatorNumberField id="amort-r" label="Annual rate" suffix="%" value={rate} onChange={(e) => setRate(e.target.value)} />
          <CalculatorNumberField id="amort-y" label="Term" suffix="yr" value={years} onChange={(e) => setYears(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <p className="mb-3 text-center text-3xl font-semibold text-[#d66844]">${result.payment}</p>
            <p className="mb-3 text-center text-[14px] text-[#334155]">monthly payment</p>
            <dl>
              <CalculatorResultRow label="1st payment — principal" value={`$${result.firstPrincipal}`} />
              <CalculatorResultRow label="1st payment — interest" value={`$${result.firstInterest}`} />
              <CalculatorResultRow label="Payments" value={String(result.months)} />
            </dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Enter loan details for payment and first-month split.</CalculatorEmptyResult>
        )
      }
      resultRef={resultRef}
    />
  );
}

export function SalesTax_Calculator() {
  const { resultRef, error, result, finish } = useFinanceRunner<{ tax: string; total: string }>();
  const [price, setPrice] = useState("100");
  const [ratePct, setRatePct] = useState("8.25");

  const run = () => {
    const p = parseNonNegative(price);
    const r = parseNonNegative(ratePct);
    if (p == null || r == null) {
      finish(null, "Enter valid price and tax rate.");
      return;
    }
    const { tax, total } = salesTax(p, r);
    finish({ tax: formatNum(tax, 2), total: formatNum(total, 2) }, null);
  };

  return (
    <CalculatorTwoPanel
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <CalculatorNumberField id="st-price" label="Price before tax" suffix="$" value={price} onChange={(e) => setPrice(e.target.value)} />
          <CalculatorNumberField id="st-rate" label="Sales tax rate" suffix="%" value={ratePct} onChange={(e) => setRatePct(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate sales tax</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <p className="mb-3 text-center text-3xl font-semibold text-[#d66844]">${result.total}</p>
            <p className="mb-3 text-center text-[14px] text-[#334155]">total with tax</p>
            <dl><CalculatorResultRow label="Tax amount" value={`$${result.tax}`} /></dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Enter price and local sales tax rate.</CalculatorEmptyResult>
        )
      }
      resultRef={resultRef}
    />
  );
}

export function Inflation_Calculator() {
  const { resultRef, error, result, finish } = useFinanceRunner<{ future: string; power: string }>();
  const [amount, setAmount] = useState("10000");
  const [inflation, setInflation] = useState("3");
  const [years, setYears] = useState("10");

  const run = () => {
    const a = parsePositive(amount);
    const inf = parseNonNegative(inflation);
    const y = parsePositive(years);
    if (a == null || inf == null || y == null) {
      finish(null, "Enter valid amount, inflation rate, and years.");
      return;
    }
    const future = a * Math.pow(1 + inf / 100, y);
    const power = inflationPurchasingPower(a, inf, y);
    if (power == null) {
      finish(null, "Could not calculate.");
      return;
    }
    finish({ future: formatNum(future, 2), power: formatNum(power, 2) }, null);
  };

  return (
    <CalculatorTwoPanel
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <CalculatorNumberField id="inf-amt" label="Amount today" suffix="$" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <CalculatorNumberField id="inf-rate" label="Annual inflation" suffix="%" value={inflation} onChange={(e) => setInflation(e.target.value)} />
          <CalculatorNumberField id="inf-y" label="Years" suffix="yr" value={years} onChange={(e) => setYears(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <dl>
              <CalculatorResultRow label="Equivalent amount needed" value={`$${result.future}`} />
              <CalculatorResultRow label="Purchasing power of $ today" value={`$${result.power}`} />
            </dl>
          </div>
        ) : (
          <CalculatorEmptyResult>See how inflation affects dollars over time.</CalculatorEmptyResult>
        )
      }
      resultRef={resultRef}
    />
  );
}

export function SimpleInterest_Calculator() {
  const { resultRef, error, result, finish } = useFinanceRunner<{ interest: string; total: string }>();
  const [principal, setPrincipal] = useState("5000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("3");

  const run = () => {
    const p = parsePositive(principal);
    const r = parseNonNegative(rate);
    const y = parsePositive(years);
    if (p == null || r == null || y == null) {
      finish(null, "Enter valid principal, rate, and years.");
      return;
    }
    const interest = simpleInterestAmount(p, r, y);
    if (interest == null) {
      finish(null, "Could not calculate.");
      return;
    }
    finish({ interest: formatNum(interest, 2), total: formatNum(p + interest, 2) }, null);
  };

  return (
    <CalculatorTwoPanel
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <CalculatorNumberField id="si-p" label="Principal" suffix="$" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
          <CalculatorNumberField id="si-r" label="Annual rate" suffix="%" value={rate} onChange={(e) => setRate(e.target.value)} />
          <CalculatorNumberField id="si-y" label="Time" suffix="yr" value={years} onChange={(e) => setYears(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <p className="mb-3 text-center text-3xl font-semibold text-[#d66844]">${result.interest}</p>
            <p className="mb-3 text-center text-[14px] text-[#334155]">interest earned</p>
            <dl><CalculatorResultRow label="Total" value={`$${result.total}`} /></dl>
          </div>
        ) : (
          <CalculatorEmptyResult>I = P × r × t (simple interest).</CalculatorEmptyResult>
        )
      }
      resultRef={resultRef}
    />
  );
}

export function SalaryToHourly_Calculator() {
  const { resultRef, error, result, finish } = useFinanceRunner<{ hourly: string; weekly: string }>();
  const [salary, setSalary] = useState("60000");

  const run = () => {
    const s = parsePositive(salary);
    if (s == null) {
      finish(null, "Enter a valid annual salary.");
      return;
    }
    const hourly = salaryToHourly(s);
    finish(
      { hourly: formatNum(hourly, 2), weekly: formatNum((s / 52), 2) },
      null,
    );
  };

  return (
    <CalculatorTwoPanel
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <p className={calcHintClass}>Based on {US_WORK_HOURS_PER_YEAR} work hours/year (40 hr × 52 wk).</p>
          <CalculatorNumberField id="s2h-s" label="Annual salary" suffix="$" value={salary} onChange={(e) => setSalary(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Convert</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <p className="mb-3 text-center text-3xl font-semibold text-[#d66844]">${result.hourly}</p>
            <p className="mb-3 text-center text-[14px] text-[#334155]">per hour</p>
            <dl><CalculatorResultRow label="Weekly gross" value={`$${result.weekly}`} /></dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Enter annual salary for hourly rate.</CalculatorEmptyResult>
        )
      }
      resultRef={resultRef}
    />
  );
}

export function AnnualIncome_Calculator() {
  const { resultRef, error, result, finish } = useFinanceRunner<{ annual: string; monthly: string }>();
  const [hourly, setHourly] = useState("25");

  const run = () => {
    const h = parsePositive(hourly);
    if (h == null) {
      finish(null, "Enter a valid hourly wage.");
      return;
    }
    const annual = hourlyToSalary(h);
    finish({ annual: formatNum(annual, 2), monthly: formatNum(annual / 12, 2) }, null);
  };

  return (
    <CalculatorTwoPanel
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <p className={calcHintClass}>Based on {US_WORK_HOURS_PER_YEAR} work hours/year.</p>
          <CalculatorNumberField id="ai-h" label="Hourly wage" suffix="$/hr" value={hourly} onChange={(e) => setHourly(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <p className="mb-3 text-center text-3xl font-semibold text-[#d66844]">${result.annual}</p>
            <p className="mb-3 text-center text-[14px] text-[#334155]">annual gross</p>
            <dl><CalculatorResultRow label="Monthly gross" value={`$${result.monthly}`} /></dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Enter hourly wage for annual income.</CalculatorEmptyResult>
        )
      }
      resultRef={resultRef}
    />
  );
}

export function Salary_Calculator() {
  return <AnnualIncome_Calculator />;
}

export function MortgagePayoff_Calculator() {
  const { resultRef, error, result, finish } = useFinanceRunner<{ months: string; years: string }>();
  const [balance, setBalance] = useState("200000");
  const [rate, setRate] = useState("6.5");
  const [payment, setPayment] = useState("1500");
  const [extra, setExtra] = useState("200");

  const run = () => {
    const b = parsePositive(balance);
    const annual = parseFloat(rate);
    const pmt = parsePositive(payment);
    const ex = parseNonNegative(extra) ?? 0;
    if (b == null || !Number.isFinite(annual) || pmt == null) {
      finish(null, "Enter valid balance, rate, and payment.");
      return;
    }
    const months = loanPayoffMonths(b, annual, pmt, ex);
    if (months == null) {
      finish(null, "Payment too low to cover interest — increase payment.");
      return;
    }
    finish({ months: String(months), years: formatNum(months / 12, 1) }, null);
  };

  return (
    <CalculatorTwoPanel
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <CalculatorNumberField id="mp-bal" label="Remaining balance" suffix="$" value={balance} onChange={(e) => setBalance(e.target.value)} />
          <CalculatorNumberField id="mp-rate" label="Annual rate" suffix="%" value={rate} onChange={(e) => setRate(e.target.value)} />
          <CalculatorNumberField id="mp-pmt" label="Monthly payment" suffix="$" value={payment} onChange={(e) => setPayment(e.target.value)} />
          <CalculatorNumberField id="mp-extra" label="Extra payment" suffix="$" value={extra} onChange={(e) => setExtra(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate payoff</button>
        </div>
      }
      result={
        result ? (
          <div className="text-center">
            <p className="text-4xl font-bold text-[#d66844]">{result.months}</p>
            <p className="mt-2 text-[14px] text-[#334155]">months to pay off ({result.years} years)</p>
          </div>
        ) : (
          <CalculatorEmptyResult>See payoff time with extra payments.</CalculatorEmptyResult>
        )
      }
      resultRef={resultRef}
    />
  );
}

export function HouseAffordability_Calculator() {
  const { resultRef, error, result, finish } = useFinanceRunner<{ maxPayment: string; maxLoan: string }>();
  const [income, setIncome] = useState("8000");
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState("30");
  const [dti, setDti] = useState("28");

  const run = () => {
    const inc = parsePositive(income);
    const annual = parseFloat(rate);
    const y = parsePositive(years);
    const d = parseNonNegative(dti);
    if (inc == null || !Number.isFinite(annual) || y == null || d == null) {
      finish(null, "Enter valid income, rate, term, and housing ratio.");
      return;
    }
    const maxPmt = maxRentFromIncome(inc, d);
    const maxLoan = maxLoanFromPayment(maxPmt, annual, y);
    if (maxLoan == null) {
      finish(null, "Could not calculate.");
      return;
    }
    finish({ maxPayment: formatNum(maxPmt, 2), maxLoan: formatNum(maxLoan, 0) }, null);
  };

  return (
    <CalculatorTwoPanel
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <p className={calcHintClass}>Uses housing payment-to-income ratio (common US guideline 28%).</p>
          <CalculatorNumberField id="ha-inc" label="Gross monthly income" suffix="$" value={income} onChange={(e) => setIncome(e.target.value)} />
          <CalculatorNumberField id="ha-dti" label="Max housing % of income" suffix="%" value={dti} onChange={(e) => setDti(e.target.value)} />
          <CalculatorNumberField id="ha-rate" label="Mortgage rate" suffix="%" value={rate} onChange={(e) => setRate(e.target.value)} />
          <CalculatorNumberField id="ha-y" label="Term" suffix="yr" value={years} onChange={(e) => setYears(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <p className="mb-3 text-center text-3xl font-semibold text-[#d66844]">${result.maxLoan}</p>
            <p className="mb-3 text-center text-[14px] text-[#334155]">estimated max loan</p>
            <dl><CalculatorResultRow label="Max monthly P&I" value={`$${result.maxPayment}`} /></dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Estimate affordable home loan from income.</CalculatorEmptyResult>
        )
      }
      resultRef={resultRef}
    />
  );
}

export function Refinance_Calculator() {
  const { resultRef, error, result, finish } = useFinanceRunner<{ savings: string; newPmt: string }>();
  const [balance, setBalance] = useState("250000");
  const [oldRate, setOldRate] = useState("7");
  const [newRate, setNewRate] = useState("6");
  const [years, setYears] = useState("30");

  const run = () => {
    const b = parsePositive(balance);
    const oldR = parseFloat(oldRate);
    const newR = parseFloat(newRate);
    const y = parsePositive(years);
    if (b == null || !Number.isFinite(oldR) || !Number.isFinite(newR) || y == null) {
      finish(null, "Enter valid inputs.");
      return;
    }
    const oldPmt = loanPaymentMonthly(b, oldR, y);
    const newPmt = loanPaymentMonthly(b, newR, y);
    if (oldPmt == null || newPmt == null) {
      finish(null, "Could not calculate.");
      return;
    }
    const savings = refinanceMonthlySavings(oldPmt, newPmt);
    finish({ savings: formatNum(savings, 2), newPmt: formatNum(newPmt, 2) }, null);
  };

  return (
    <CalculatorTwoPanel
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <CalculatorNumberField id="ref-bal" label="Loan balance" suffix="$" value={balance} onChange={(e) => setBalance(e.target.value)} />
          <CalculatorNumberField id="ref-old" label="Current rate" suffix="%" value={oldRate} onChange={(e) => setOldRate(e.target.value)} />
          <CalculatorNumberField id="ref-new" label="New rate" suffix="%" value={newRate} onChange={(e) => setNewRate(e.target.value)} />
          <CalculatorNumberField id="ref-y" label="New term" suffix="yr" value={years} onChange={(e) => setYears(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Compare</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <p className="mb-3 text-center text-3xl font-semibold text-[#d66844]">${result.savings}</p>
            <p className="mb-3 text-center text-[14px] text-[#334155]">monthly savings</p>
            <dl><CalculatorResultRow label="New payment" value={`$${result.newPmt}`} /></dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Compare current vs refinanced payment.</CalculatorEmptyResult>
        )
      }
      resultRef={resultRef}
    />
  );
}

export function Heloc_Calculator() {
  const { resultRef, error, result, finish } = useFinanceRunner<string>();
  const [draw, setDraw] = useState("50000");
  const [rate, setRate] = useState("8.5");

  const run = () => {
    const d = parsePositive(draw);
    const r = parseNonNegative(rate);
    if (d == null || r == null) {
      finish(null, "Enter valid draw and rate.");
      return;
    }
    finish(formatNum(helocInterestOnlyMonthly(d, r), 2), null);
  };

  return (
    <CalculatorTwoPanel
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <p className={calcHintClass}>Interest-only payment on current HELOC balance.</p>
          <CalculatorNumberField id="heloc-d" label="Current draw / balance" suffix="$" value={draw} onChange={(e) => setDraw(e.target.value)} />
          <CalculatorNumberField id="heloc-r" label="Annual rate" suffix="%" value={rate} onChange={(e) => setRate(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate</button>
        </div>
      }
      result={
        result ? (
          <div className="text-center">
            <p className="text-4xl font-bold text-[#d66844]">${result}</p>
            <p className="mt-2 text-[14px] text-[#334155]">interest-only / month</p>
          </div>
        ) : (
          <CalculatorEmptyResult>HELOC interest-only estimate.</CalculatorEmptyResult>
        )
      }
      resultRef={resultRef}
    />
  );
}

export function AutoLease_Calculator() {
  const { resultRef, error, result, finish } = useFinanceRunner<string>();
  const [cap, setCap] = useState("35000");
  const [residual, setResidual] = useState("20000");
  const [mf, setMf] = useState("0.00125");
  const [months, setMonths] = useState("36");

  const run = () => {
    const c = parsePositive(cap);
    const res = parseNonNegative(residual);
    const factor = parsePositive(mf);
    const m = parsePositive(months);
    if (c == null || res == null || factor == null || m == null) {
      finish(null, "Enter valid lease inputs.");
      return;
    }
    const pmt = autoLeaseMonthly(c, res, factor, m);
    if (pmt == null) {
      finish(null, "Residual must be less than cap cost.");
      return;
    }
    finish(formatNum(pmt, 2), null);
  };

  return (
    <CalculatorTwoPanel
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <p className={calcHintClass}>Money factor ≈ APR ÷ 2400 (e.g. 3% APR → 0.00125).</p>
          <CalculatorNumberField id="lease-cap" label="Cap cost" suffix="$" value={cap} onChange={(e) => setCap(e.target.value)} />
          <CalculatorNumberField id="lease-res" label="Residual value" suffix="$" value={residual} onChange={(e) => setResidual(e.target.value)} />
          <CalculatorNumberField id="lease-mf" label="Money factor" suffix="" value={mf} onChange={(e) => setMf(e.target.value)} />
          <CalculatorNumberField id="lease-mo" label="Term" suffix="mo" value={months} onChange={(e) => setMonths(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate lease</button>
        </div>
      }
      result={
        result ? (
          <div className="text-center">
            <p className="text-4xl font-bold text-[#d66844]">${result}</p>
            <p className="mt-2 text-[14px] text-[#334155]">estimated monthly lease</p>
          </div>
        ) : (
          <CalculatorEmptyResult>US auto lease payment estimate.</CalculatorEmptyResult>
        )
      }
      resultRef={resultRef}
    />
  );
}

export function Discount_Calculator() {
  const { resultRef, error, result, finish } = useFinanceRunner<{ final: string; savings: string }>();
  const [price, setPrice] = useState("100");
  const [pct, setPct] = useState("20");

  const run = () => {
    const p = parsePositive(price);
    const d = parseNonNegative(pct);
    if (p == null || d == null) {
      finish(null, "Enter valid price and discount.");
      return;
    }
    const { savings, finalPrice } = applyDiscount(p, d);
    finish({ final: formatNum(finalPrice, 2), savings: formatNum(savings, 2) }, null);
  };

  return (
    <CalculatorTwoPanel
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <CalculatorNumberField id="disc-p" label="Original price" suffix="$" value={price} onChange={(e) => setPrice(e.target.value)} />
          <CalculatorNumberField id="disc-pct" label="Discount" suffix="%" value={pct} onChange={(e) => setPct(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <p className="mb-3 text-center text-3xl font-semibold text-[#d66844]">${result.final}</p>
            <p className="mb-3 text-center text-[14px] text-[#334155]">sale price</p>
            <dl><CalculatorResultRow label="You save" value={`$${result.savings}`} /></dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Price after percent-off discount.</CalculatorEmptyResult>
        )
      }
      resultRef={resultRef}
    />
  );
}

export function Currency_Calculator() {
  const { resultRef, error, result, finish } = useFinanceRunner<string>();
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState("0.92");

  const run = () => {
    const a = parsePositive(amount);
    const r = parsePositive(rate);
    if (a == null || r == null) {
      finish(null, "Enter amount and exchange rate.");
      return;
    }
    finish(formatNum(currencyConvert(a, r), 2), null);
  };

  return (
    <CalculatorTwoPanel
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <p className={calcHintClass}>Enter your own rate (e.g. 1 USD = 0.92 EUR).</p>
          <CalculatorNumberField id="cur-amt" label="Amount" suffix="$" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <CalculatorNumberField id="cur-rate" label="Exchange rate" suffix="×" value={rate} onChange={(e) => setRate(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Convert</button>
        </div>
      }
      result={
        result ? (
          <div className="text-center">
            <p className="text-4xl font-bold text-[#d66844]">{result}</p>
            <p className="mt-2 text-[14px] text-[#334155]">converted amount</p>
          </div>
        ) : (
          <CalculatorEmptyResult>Multiply by your exchange rate.</CalculatorEmptyResult>
        )
      }
      resultRef={resultRef}
    />
  );
}

export function Money_Calculator() {
  return <Currency_Calculator />;
}

export function PayRaise_Calculator() {
  const { resultRef, error, result, finish } = useFinanceRunner<{ increase: string; pct: string }>();
  const [oldSal, setOldSal] = useState("50000");
  const [newSal, setNewSal] = useState("55000");

  const run = () => {
    const o = parsePositive(oldSal);
    const n = parsePositive(newSal);
    if (o == null || n == null) {
      finish(null, "Enter valid salaries.");
      return;
    }
    const { increase, pct } = payRaise(o, n);
    finish({ increase: formatNum(increase, 2), pct: formatNum(pct, 2) }, null);
  };

  return (
    <CalculatorTwoPanel
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <CalculatorNumberField id="pr-old" label="Old salary" suffix="$" value={oldSal} onChange={(e) => setOldSal(e.target.value)} />
          <CalculatorNumberField id="pr-new" label="New salary" suffix="$" value={newSal} onChange={(e) => setNewSal(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate raise</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <p className="mb-3 text-center text-3xl font-semibold text-[#d66844]">{result.pct}%</p>
            <p className="mb-3 text-center text-[14px] text-[#334155]">pay increase</p>
            <dl><CalculatorResultRow label="Dollar increase" value={`$${result.increase}`} /></dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Compare old and new salary.</CalculatorEmptyResult>
        )
      }
      resultRef={resultRef}
    />
  );
}

export function Tax_Calculator() {
  const { resultRef, error, result, finish } = useFinanceRunner<{ net: string; total: string }>();
  const [gross, setGross] = useState("75000");
  const [federal, setFederal] = useState("22");
  const [state, setState] = useState("5");

  const run = () => {
    const g = parsePositive(gross);
    const f = parseNonNegative(federal);
    const s = parseNonNegative(state);
    if (g == null || f == null || s == null) {
      finish(null, "Enter valid income and tax rates.");
      return;
    }
    const { net, total } = estimatedIncomeTax(g, f, s);
    finish({ net: formatNum(net, 2), total: formatNum(total, 2) }, null);
  };

  return (
    <CalculatorTwoPanel
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <p className={calcHintClass}>Uses your effective federal % and optional state % (simplified estimate).</p>
          <CalculatorNumberField id="tax-g" label="Gross annual income" suffix="$" value={gross} onChange={(e) => setGross(e.target.value)} />
          <CalculatorNumberField id="tax-f" label="Federal effective rate" suffix="%" value={federal} onChange={(e) => setFederal(e.target.value)} />
          <CalculatorNumberField id="tax-s" label="State rate" suffix="%" value={state} onChange={(e) => setState(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Estimate tax</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <p className="mb-3 text-center text-3xl font-semibold text-[#d66844]">${result.net}</p>
            <p className="mb-3 text-center text-[14px] text-[#334155]">estimated net income</p>
            <dl><CalculatorResultRow label="Total tax" value={`$${result.total}`} /></dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Not a substitute for professional tax advice.</CalculatorEmptyResult>
        )
      }
      resultRef={resultRef}
    />
  );
}

export function IncomeTax_Calculator() {
  return <Tax_Calculator />;
}

export function InterestRate_Calculator() {
  const { resultRef, error, result, finish } = useFinanceRunner<string>();
  const [principal, setPrincipal] = useState("20000");
  const [payment, setPayment] = useState("400");
  const [years, setYears] = useState("5");

  const run = () => {
    const p = parsePositive(principal);
    const pmt = parsePositive(payment);
    const y = parsePositive(years);
    if (p == null || pmt == null || y == null) {
      finish(null, "Enter valid loan amount, payment, and term.");
      return;
    }
    const rate = solveAnnualRateFromPayment(p, pmt, y);
    if (rate == null) {
      finish(null, "Payment too low for this principal and term.");
      return;
    }
    finish(formatNum(rate, 3), null);
  };

  return (
    <CalculatorTwoPanel
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <CalculatorNumberField id="ir-p" label="Loan amount" suffix="$" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
          <CalculatorNumberField id="ir-pmt" label="Monthly payment" suffix="$" value={payment} onChange={(e) => setPayment(e.target.value)} />
          <CalculatorNumberField id="ir-y" label="Term" suffix="yr" value={years} onChange={(e) => setYears(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Find rate</button>
        </div>
      }
      result={
        result ? (
          <div className="text-center">
            <p className="text-4xl font-bold text-[#d66844]">{result}%</p>
            <p className="mt-2 text-[14px] text-[#334155]">annual interest rate (APR)</p>
          </div>
        ) : (
          <CalculatorEmptyResult>Solve APR from payment and term.</CalculatorEmptyResult>
        )
      }
      resultRef={resultRef}
    />
  );
}

export function Rent_Calculator() {
  const { resultRef, error, result, finish } = useFinanceRunner<string>();
  const [income, setIncome] = useState("5000");
  const [ratio, setRatio] = useState("30");

  const run = () => {
    const inc = parsePositive(income);
    const r = parseNonNegative(ratio);
    if (inc == null || r == null) {
      finish(null, "Enter income and rent ratio.");
      return;
    }
    finish(formatNum(maxRentFromIncome(inc, r), 2), null);
  };

  return (
    <CalculatorTwoPanel
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <p className={calcHintClass}>US common guideline: rent ≤ 30% of gross monthly income.</p>
          <CalculatorNumberField id="rent-inc" label="Gross monthly income" suffix="$" value={income} onChange={(e) => setIncome(e.target.value)} />
          <CalculatorNumberField id="rent-r" label="Max rent % of income" suffix="%" value={ratio} onChange={(e) => setRatio(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate</button>
        </div>
      }
      result={
        result ? (
          <div className="text-center">
            <p className="text-4xl font-bold text-[#d66844]">${result}</p>
            <p className="mt-2 text-[14px] text-[#334155]">max suggested rent / month</p>
          </div>
        ) : (
          <CalculatorEmptyResult>Affordable rent from monthly income.</CalculatorEmptyResult>
        )
      }
      resultRef={resultRef}
    />
  );
}

export function Interest_Calculator() {
  const { resultRef, error, result, finish } = useFinanceRunner<{ interest: string; total: string }>();
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("5");

  const run = () => {
    const p = parsePositive(principal);
    const r = parseNonNegative(rate);
    const y = parsePositive(years);
    if (p == null || r == null || y == null) {
      finish(null, "Enter valid inputs.");
      return;
    }
    const interest = simpleInterestAmount(p, r, y);
    if (interest == null) {
      finish(null, "Could not calculate.");
      return;
    }
    finish({ interest: formatNum(interest, 2), total: formatNum(p + interest, 2) }, null);
  };

  return (
    <CalculatorTwoPanel
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <p className={calcHintClass}>Simple interest on a lump sum (US bank savings estimate).</p>
          <CalculatorNumberField id="int-p" label="Principal" suffix="$" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
          <CalculatorNumberField id="int-r" label="Annual rate" suffix="%" value={rate} onChange={(e) => setRate(e.target.value)} />
          <CalculatorNumberField id="int-y" label="Years" suffix="yr" value={years} onChange={(e) => setYears(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate interest</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <p className="mb-3 text-center text-3xl font-semibold text-[#d66844]">${result.interest}</p>
            <p className="mb-3 text-center text-[14px] text-[#334155]">interest earned</p>
            <dl><CalculatorResultRow label="Total" value={`$${result.total}`} /></dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Interest on principal over time.</CalculatorEmptyResult>
        )
      }
      resultRef={resultRef}
    />
  );
}
