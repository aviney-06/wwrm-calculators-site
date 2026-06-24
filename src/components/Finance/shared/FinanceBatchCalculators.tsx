"use client";

import { useRef, useState } from "react";
import { btnCalculate, fieldBase } from "@/components/Health-Fitness/shared/calculatorStyles";
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
  calcLabelClass,
} from "@/components/shared/calculatorFields";
import {
  loanPaymentMonthly,
  parseNonNegative,
  parsePositive,
  solveAnnualRateFromPayment,
} from "./financeCalcUtils";

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

const money = (n: number) => `$${formatNum(n, 2)}`;

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
/* Debt Payoff — time to clear a balance at a fixed monthly payment    */
/* ------------------------------------------------------------------ */

export function DebtPayoff_Calculator() {
  const { resultRef, error, result, finish } = useRunner<{
    time: string;
    interest: string;
    total: string;
  }>();
  const [balance, setBalance] = useState("5000");
  const [apr, setApr] = useState("19.99");
  const [payment, setPayment] = useState("200");

  const run = () => {
    const b = parsePositive(balance);
    const a = parseNonNegative(apr);
    const pmt = parsePositive(payment);
    if (b == null || a == null || pmt == null) {
      finish(null, "Enter a valid balance, APR, and monthly payment.");
      return;
    }
    const r = a / 100 / 12;
    const firstInterest = b * r;
    if (pmt <= firstInterest) {
      finish(
        null,
        `Payment must exceed the first month's interest (${money(firstInterest)}) or the balance never reduces.`,
      );
      return;
    }
    let bal = b;
    let totalInterest = 0;
    let months = 0;
    while (bal > 0.005 && months < 1200) {
      const interest = bal * r;
      const pay = Math.min(pmt, bal + interest);
      bal = bal + interest - pay;
      totalInterest += interest;
      months += 1;
    }
    const years = Math.floor(months / 12);
    const rem = months % 12;
    const timeStr =
      years > 0 ? `${years} yr ${rem} mo` : `${rem} mo`;
    finish(
      {
        time: `${months} months (${timeStr})`,
        interest: money(totalInterest),
        total: money(b + totalInterest),
      },
      null,
    );
  };

  return (
    <CalculatorTwoPanel
      resultRef={resultRef}
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <CalculatorNumberField id="dp-bal" label="Current balance" suffix="$" min={0} step="any" value={balance} onChange={(e) => setBalance(e.target.value)} />
          <CalculatorNumberField id="dp-apr" label="Interest rate (APR)" suffix="%" min={0} step="any" value={apr} onChange={(e) => setApr(e.target.value)} />
          <CalculatorNumberField id="dp-pmt" label="Monthly payment" suffix="$" min={0} step="any" value={payment} onChange={(e) => setPayment(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate payoff</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <Headline value={result.time} caption="time to pay off" />
            <dl>
              <CalculatorResultRow label="Total interest paid" value={result.interest} />
              <CalculatorResultRow label="Total of payments" value={result.total} />
            </dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Enter your debt details to see the payoff time.</CalculatorEmptyResult>
        )
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* Credit Card — payment needed to clear a balance in N months         */
/* ------------------------------------------------------------------ */

export function CreditCard_Calculator() {
  const { resultRef, error, result, finish } = useRunner<{
    payment: string;
    interest: string;
    total: string;
  }>();
  const [balance, setBalance] = useState("5000");
  const [apr, setApr] = useState("19.99");
  const [months, setMonths] = useState("24");

  const run = () => {
    const b = parsePositive(balance);
    const a = parseNonNegative(apr);
    const n = parsePositive(months);
    if (b == null || a == null || n == null || !Number.isInteger(n)) {
      finish(null, "Enter a valid balance, APR, and whole number of months.");
      return;
    }
    const pmt = loanPaymentMonthly(b, a, n / 12);
    if (pmt == null) {
      finish(null, "Could not calculate the payment.");
      return;
    }
    const total = pmt * n;
    finish(
      {
        payment: money(pmt),
        interest: money(total - b),
        total: money(total),
      },
      null,
    );
  };

  return (
    <CalculatorTwoPanel
      resultRef={resultRef}
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <p className={calcHintClass}>Find the fixed monthly payment that clears your balance in a set time.</p>
          <CalculatorNumberField id="cc-bal" label="Card balance" suffix="$" min={0} step="any" value={balance} onChange={(e) => setBalance(e.target.value)} />
          <CalculatorNumberField id="cc-apr" label="Interest rate (APR)" suffix="%" min={0} step="any" value={apr} onChange={(e) => setApr(e.target.value)} />
          <CalculatorNumberField id="cc-months" label="Pay off in" suffix="months" min={1} step="1" value={months} onChange={(e) => setMonths(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate payment</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <Headline value={result.payment} caption="monthly payment needed" />
            <dl>
              <CalculatorResultRow label="Total interest" value={result.interest} />
              <CalculatorResultRow label="Total of payments" value={result.total} />
            </dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Enter your card details to find the payment.</CalculatorEmptyResult>
        )
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* Lottery Tax — winnings after federal and state tax                  */
/* ------------------------------------------------------------------ */

export function LotteryTax_Calculator() {
  const { resultRef, error, result, finish } = useRunner<{
    net: string;
    federal: string;
    state: string;
    totalTax: string;
  }>();
  const [winnings, setWinnings] = useState("1000000");
  const [federal, setFederal] = useState("24");
  const [state, setState] = useState("5");

  const run = () => {
    const w = parsePositive(winnings);
    const f = parseNonNegative(federal);
    const s = parseNonNegative(state);
    if (w == null || f == null || s == null) {
      finish(null, "Enter valid winnings and tax rates.");
      return;
    }
    if (f + s > 100) {
      finish(null, "Combined tax rate cannot exceed 100%.");
      return;
    }
    const fedTax = w * (f / 100);
    const stateTax = w * (s / 100);
    const totalTax = fedTax + stateTax;
    finish(
      {
        net: money(w - totalTax),
        federal: money(fedTax),
        state: money(stateTax),
        totalTax: money(totalTax),
      },
      null,
    );
  };

  return (
    <CalculatorTwoPanel
      resultRef={resultRef}
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <p className={calcHintClass}>Federal withholding starts at 24%; the top federal rate is 37%. Enter your expected rates.</p>
          <CalculatorNumberField id="lt-win" label="Lottery winnings" suffix="$" min={0} step="any" value={winnings} onChange={(e) => setWinnings(e.target.value)} />
          <CalculatorNumberField id="lt-fed" label="Federal tax rate" suffix="%" min={0} step="any" value={federal} onChange={(e) => setFederal(e.target.value)} />
          <CalculatorNumberField id="lt-state" label="State tax rate" suffix="%" min={0} step="any" value={state} onChange={(e) => setState(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate take-home</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <Headline value={result.net} caption="estimated take-home" />
            <dl>
              <CalculatorResultRow label="Federal tax" value={result.federal} />
              <CalculatorResultRow label="State tax" value={result.state} />
              <CalculatorResultRow label="Total tax" value={result.totalTax} />
            </dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Enter winnings and rates to estimate take-home.</CalculatorEmptyResult>
        )
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* ROI — return on investment                                          */
/* ------------------------------------------------------------------ */

export function Roi_Calculator() {
  const { resultRef, error, result, finish } = useRunner<{
    roi: string;
    profit: string;
    annualized: string | null;
  }>();
  const [cost, setCost] = useState("10000");
  const [finalValue, setFinalValue] = useState("13000");
  const [years, setYears] = useState("");

  const run = () => {
    const c = parsePositive(cost);
    const v = parseNonNegative(finalValue);
    if (c == null || v == null) {
      finish(null, "Enter a valid initial investment and final value.");
      return;
    }
    const gain = v - c;
    const roi = (gain / c) * 100;
    let annualized: string | null = null;
    const y = years.trim() === "" ? null : parsePositive(years);
    if (years.trim() !== "") {
      if (y == null) {
        finish(null, "Enter a valid number of years (or leave it blank).");
        return;
      }
      const ann = (Math.pow(v / c, 1 / y) - 1) * 100;
      annualized = `${formatNum(ann, 2)}%`;
    }
    finish(
      { roi: `${formatNum(roi, 2)}%`, profit: money(gain), annualized },
      null,
    );
  };

  return (
    <CalculatorTwoPanel
      resultRef={resultRef}
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <CalculatorNumberField id="roi-cost" label="Amount invested" suffix="$" min={0} step="any" value={cost} onChange={(e) => setCost(e.target.value)} />
          <CalculatorNumberField id="roi-final" label="Final value returned" suffix="$" min={0} step="any" value={finalValue} onChange={(e) => setFinalValue(e.target.value)} />
          <CalculatorNumberField id="roi-years" label="Holding period" suffix="yr" min={0} step="any" optional value={years} onChange={(e) => setYears(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate ROI</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <Headline value={result.roi} caption="return on investment" />
            <dl>
              <CalculatorResultRow label="Net profit" value={result.profit} />
              {result.annualized ? <CalculatorResultRow label="Annualized ROI" value={result.annualized} /> : null}
            </dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Enter cost and final value to find ROI.</CalculatorEmptyResult>
        )
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* APR — effective APR including up-front fees                         */
/* ------------------------------------------------------------------ */

export function Apr_Calculator() {
  const { resultRef, error, result, finish } = useRunner<{
    apr: string;
    payment: string;
    note: string;
  }>();
  const [amount, setAmount] = useState("200000");
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState("30");
  const [fees, setFees] = useState("4000");

  const run = () => {
    const p = parsePositive(amount);
    const noteRate = parseNonNegative(rate);
    const y = parsePositive(years);
    const f = parseNonNegative(fees);
    if (p == null || noteRate == null || y == null || f == null) {
      finish(null, "Enter a valid loan amount, rate, term, and fees.");
      return;
    }
    if (f >= p) {
      finish(null, "Fees must be less than the loan amount.");
      return;
    }
    const pmt = loanPaymentMonthly(p, noteRate, y);
    if (pmt == null) {
      finish(null, "Could not calculate the payment.");
      return;
    }
    const apr = solveAnnualRateFromPayment(p - f, pmt, y);
    if (apr == null) {
      finish(null, "Could not solve the APR for these inputs.");
      return;
    }
    finish(
      { apr: `${formatNum(apr, 3)}%`, payment: money(pmt), note: `${formatNum(noteRate, 3)}%` },
      null,
    );
  };

  return (
    <CalculatorTwoPanel
      resultRef={resultRef}
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <p className={calcHintClass}>APR reflects the note rate plus up-front fees spread across the loan term.</p>
          <CalculatorNumberField id="apr-amt" label="Loan amount" suffix="$" min={0} step="any" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <CalculatorNumberField id="apr-rate" label="Note interest rate" suffix="%" min={0} step="any" value={rate} onChange={(e) => setRate(e.target.value)} />
          <CalculatorNumberField id="apr-years" label="Loan term" suffix="yr" min={0} step="any" value={years} onChange={(e) => setYears(e.target.value)} />
          <CalculatorNumberField id="apr-fees" label="Up-front fees & points" suffix="$" min={0} step="any" value={fees} onChange={(e) => setFees(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate APR</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <Headline value={result.apr} caption="effective APR" />
            <dl>
              <CalculatorResultRow label="Note (nominal) rate" value={result.note} />
              <CalculatorResultRow label="Monthly payment" value={result.payment} />
            </dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Enter loan terms and fees to find the APR.</CalculatorEmptyResult>
        )
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* VA Mortgage — funding fee financed into the loan                    */
/* ------------------------------------------------------------------ */

export function VaMortgage_Calculator() {
  const { resultRef, error, result, finish } = useRunner<{
    total: string;
    pi: string;
    fundingFee: string;
    loan: string;
  }>();
  const [price, setPrice] = useState("350000");
  const [down, setDown] = useState("0");
  const [fee, setFee] = useState("2.15");
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState("30");
  const [tax, setTax] = useState("3600");
  const [insurance, setInsurance] = useState("1500");

  const run = () => {
    const p = parsePositive(price);
    const d = parseNonNegative(down);
    const f = parseNonNegative(fee);
    const r = parseNonNegative(rate);
    const y = parsePositive(years);
    const t = parseNonNegative(tax);
    const ins = parseNonNegative(insurance);
    if (p == null || d == null || f == null || r == null || y == null || t == null || ins == null) {
      finish(null, "Enter valid values for all required fields.");
      return;
    }
    const baseLoan = p - d;
    if (baseLoan <= 0) {
      finish(null, "Down payment must be less than the home price.");
      return;
    }
    const fundingFee = baseLoan * (f / 100);
    const totalLoan = baseLoan + fundingFee;
    const pi = loanPaymentMonthly(totalLoan, r, y);
    if (pi == null) {
      finish(null, "Could not calculate the payment.");
      return;
    }
    const monthly = pi + t / 12 + ins / 12;
    finish(
      {
        total: money(monthly),
        pi: money(pi),
        fundingFee: money(fundingFee),
        loan: money(totalLoan),
      },
      null,
    );
  };

  return (
    <CalculatorTwoPanel
      resultRef={resultRef}
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <p className={calcHintClass}>VA loans need no PMI. The funding fee is financed into the loan.</p>
          <CalculatorNumberField id="va-price" label="Home price" suffix="$" min={0} step="any" value={price} onChange={(e) => setPrice(e.target.value)} />
          <CalculatorNumberField id="va-down" label="Down payment" suffix="$" min={0} step="any" value={down} onChange={(e) => setDown(e.target.value)} />
          <CalculatorNumberField id="va-fee" label="VA funding fee" suffix="%" min={0} step="any" value={fee} onChange={(e) => setFee(e.target.value)} />
          <CalculatorNumberField id="va-rate" label="Interest rate" suffix="%" min={0} step="any" value={rate} onChange={(e) => setRate(e.target.value)} />
          <CalculatorNumberField id="va-years" label="Loan term" suffix="yr" min={0} step="any" value={years} onChange={(e) => setYears(e.target.value)} />
          <CalculatorNumberField id="va-tax" label="Annual property tax" suffix="$" min={0} step="any" optional value={tax} onChange={(e) => setTax(e.target.value)} />
          <CalculatorNumberField id="va-ins" label="Annual home insurance" suffix="$" min={0} step="any" optional value={insurance} onChange={(e) => setInsurance(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate VA payment</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <Headline value={result.total} caption="estimated monthly payment" />
            <dl>
              <CalculatorResultRow label="Principal & interest" value={result.pi} />
              <CalculatorResultRow label="VA funding fee (financed)" value={result.fundingFee} />
              <CalculatorResultRow label="Total loan amount" value={result.loan} />
            </dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Enter loan details for the VA payment estimate.</CalculatorEmptyResult>
        )
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* Take-Home Pay — gross minus federal, state, and FICA                */
/* ------------------------------------------------------------------ */

export function TakeHomePay_Calculator() {
  const { resultRef, error, result, finish } = useRunner<{
    netAnnual: string;
    netMonthly: string;
    federal: string;
    state: string;
    fica: string;
    totalTax: string;
  }>();
  const [gross, setGross] = useState("75000");
  const [federal, setFederal] = useState("12");
  const [state, setState] = useState("4");
  const [fica, setFica] = useState("7.65");

  const run = () => {
    const g = parsePositive(gross);
    const f = parseNonNegative(federal);
    const s = parseNonNegative(state);
    const fi = parseNonNegative(fica);
    if (g == null || f == null || s == null || fi == null) {
      finish(null, "Enter valid income and tax rates.");
      return;
    }
    const fedTax = g * (f / 100);
    const stateTax = g * (s / 100);
    const ficaTax = g * (fi / 100);
    const totalTax = fedTax + stateTax + ficaTax;
    if (totalTax > g) {
      finish(null, "Combined tax rates exceed 100% of income.");
      return;
    }
    const net = g - totalTax;
    finish(
      {
        netAnnual: money(net),
        netMonthly: money(net / 12),
        federal: money(fedTax),
        state: money(stateTax),
        fica: money(ficaTax),
        totalTax: money(totalTax),
      },
      null,
    );
  };

  return (
    <CalculatorTwoPanel
      resultRef={resultRef}
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <p className={calcHintClass}>FICA defaults to 7.65% (6.2% Social Security + 1.45% Medicare). Use your effective rates.</p>
          <CalculatorNumberField id="thp-gross" label="Gross annual income" suffix="$" min={0} step="any" value={gross} onChange={(e) => setGross(e.target.value)} />
          <CalculatorNumberField id="thp-fed" label="Federal effective rate" suffix="%" min={0} step="any" value={federal} onChange={(e) => setFederal(e.target.value)} />
          <CalculatorNumberField id="thp-state" label="State effective rate" suffix="%" min={0} step="any" value={state} onChange={(e) => setState(e.target.value)} />
          <CalculatorNumberField id="thp-fica" label="FICA rate" suffix="%" min={0} step="any" value={fica} onChange={(e) => setFica(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate take-home pay</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <Headline value={result.netAnnual} caption="net annual pay" />
            <dl>
              <CalculatorResultRow label="Net monthly pay" value={result.netMonthly} />
              <CalculatorResultRow label="Federal tax" value={result.federal} />
              <CalculatorResultRow label="State tax" value={result.state} />
              <CalculatorResultRow label="FICA" value={result.fica} />
              <CalculatorResultRow label="Total tax" value={result.totalTax} />
            </dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Estimate only — not professional tax advice.</CalculatorEmptyResult>
        )
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* Debt Ratio — debt-to-income (DTI)                                   */
/* ------------------------------------------------------------------ */

export function DebtRatio_Calculator() {
  const { resultRef, error, result, finish } = useRunner<{
    dti: string;
    rating: string;
    leftover: string;
  }>();
  const [debt, setDebt] = useState("1800");
  const [income, setIncome] = useState("6000");

  const run = () => {
    const d = parseNonNegative(debt);
    const i = parsePositive(income);
    if (d == null || i == null) {
      finish(null, "Enter valid monthly debt and gross monthly income.");
      return;
    }
    const dti = (d / i) * 100;
    let rating = "High — lenders may see this as risky";
    if (dti <= 36) rating = "Healthy — within the common 36% guideline";
    else if (dti <= 43) rating = "Manageable — near typical qualifying limits";
    finish(
      { dti: `${formatNum(dti, 1)}%`, rating, leftover: money(Math.max(0, i - d)) },
      null,
    );
  };

  return (
    <CalculatorTwoPanel
      resultRef={resultRef}
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <p className={calcHintClass}>Debt-to-income (DTI) = total monthly debt payments ÷ gross monthly income.</p>
          <CalculatorNumberField id="dr-debt" label="Total monthly debt payments" suffix="$" min={0} step="any" value={debt} onChange={(e) => setDebt(e.target.value)} />
          <CalculatorNumberField id="dr-income" label="Gross monthly income" suffix="$" min={0} step="any" value={income} onChange={(e) => setIncome(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate debt ratio</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <Headline value={result.dti} caption="debt-to-income ratio" />
            <dl>
              <CalculatorResultRow label="Assessment" value={result.rating} />
              <CalculatorResultRow label="Income after debt" value={result.leftover} />
            </dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Enter your debt and income to find your DTI.</CalculatorEmptyResult>
        )
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* Down Payment — amount and resulting loan                            */
/* ------------------------------------------------------------------ */

export function DownPayment_Calculator() {
  const { resultRef, error, result, finish } = useRunner<{
    down: string;
    loan: string;
  }>();
  const [price, setPrice] = useState("350000");
  const [percent, setPercent] = useState("20");

  const run = () => {
    const p = parsePositive(price);
    const pct = parseNonNegative(percent);
    if (p == null || pct == null) {
      finish(null, "Enter a valid home price and down payment percent.");
      return;
    }
    if (pct > 100) {
      finish(null, "Down payment percent cannot exceed 100%.");
      return;
    }
    const downAmt = p * (pct / 100);
    finish({ down: money(downAmt), loan: money(p - downAmt) }, null);
  };

  return (
    <CalculatorTwoPanel
      resultRef={resultRef}
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <CalculatorNumberField id="dpm-price" label="Home price" suffix="$" min={0} step="any" value={price} onChange={(e) => setPrice(e.target.value)} />
          <CalculatorNumberField id="dpm-pct" label="Down payment" suffix="%" min={0} step="any" value={percent} onChange={(e) => setPercent(e.target.value)} />
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate down payment</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <Headline value={result.down} caption="down payment" />
            <dl>
              <CalculatorResultRow label="Loan amount needed" value={result.loan} />
            </dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Enter a price and percent to size your down payment.</CalculatorEmptyResult>
        )
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* Monthly Income — normalize any pay frequency to monthly             */
/* ------------------------------------------------------------------ */

type Frequency = "hourly" | "weekly" | "biweekly" | "semimonthly" | "monthly" | "annual";

const ANNUAL_FACTOR: Record<Exclude<Frequency, "hourly">, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
  annual: 1,
};

export function MonthlyIncome_Calculator() {
  const { resultRef, error, result, finish } = useRunner<{
    monthly: string;
    annual: string;
  }>();
  const [amount, setAmount] = useState("25");
  const [frequency, setFrequency] = useState<Frequency>("hourly");
  const [hours, setHours] = useState("40");

  const run = () => {
    const a = parsePositive(amount);
    if (a == null) {
      finish(null, "Enter a valid income amount.");
      return;
    }
    let annual: number;
    if (frequency === "hourly") {
      const h = parsePositive(hours);
      if (h == null) {
        finish(null, "Enter valid hours worked per week.");
        return;
      }
      annual = a * h * 52;
    } else {
      annual = a * ANNUAL_FACTOR[frequency];
    }
    finish({ monthly: money(annual / 12), annual: money(annual) }, null);
  };

  return (
    <CalculatorTwoPanel
      resultRef={resultRef}
      form={
        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
          <CalculatorNumberField id="mi-amt" label="Income amount" suffix="$" min={0} step="any" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <div>
            <label htmlFor="mi-freq" className={calcLabelClass}>Pay frequency</label>
            <select
              id="mi-freq"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as Frequency)}
              className={`${fieldBase} w-full`}
            >
              <option value="hourly">Per hour</option>
              <option value="weekly">Per week</option>
              <option value="biweekly">Every 2 weeks</option>
              <option value="semimonthly">Twice a month</option>
              <option value="monthly">Per month</option>
              <option value="annual">Per year</option>
            </select>
          </div>
          {frequency === "hourly" ? (
            <CalculatorNumberField id="mi-hours" label="Hours per week" suffix="hr" min={0} step="any" value={hours} onChange={(e) => setHours(e.target.value)} />
          ) : null}
          <FormError message={error} />
          <button type="button" className={btnCalculate} onClick={run}>Calculate monthly income</button>
        </div>
      }
      result={
        result ? (
          <div className="w-full max-w-md">
            <Headline value={result.monthly} caption="gross monthly income" />
            <dl>
              <CalculatorResultRow label="Gross annual income" value={result.annual} />
            </dl>
          </div>
        ) : (
          <CalculatorEmptyResult>Enter your pay and frequency to get monthly income.</CalculatorEmptyResult>
        )
      }
    />
  );
}
