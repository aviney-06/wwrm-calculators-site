/** US-standard personal finance formulas (monthly compounding unless noted). */

export const US_WORK_HOURS_PER_YEAR = 2080; // 40 h × 52 weeks

export function parseMoney(value: string): number | null {
  const n = Number.parseFloat(value.replace(/,/g, "").trim());
  return Number.isFinite(n) ? n : null;
}

export function parsePositive(value: string): number | null {
  const n = parseMoney(value);
  if (n == null || n <= 0) return null;
  return n;
}

export function parseNonNegative(value: string): number | null {
  const n = parseMoney(value);
  if (n == null || n < 0) return null;
  return n;
}

/** Monthly payment on amortizing loan (ordinary annuity, US mortgage style). */
export function loanPaymentMonthly(
  principal: number,
  annualRatePct: number,
  years: number,
): number | null {
  if (principal <= 0 || years <= 0) return null;
  const n = years * 12;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / n;
  const factor = Math.pow(1 + r, n);
  return (principal * r * factor) / (factor - 1);
}

/** Total interest paid over full term at fixed payment. */
export function loanTotalInterest(
  principal: number,
  annualRatePct: number,
  years: number,
): number | null {
  const pmt = loanPaymentMonthly(principal, annualRatePct, years);
  if (pmt == null) return null;
  return pmt * years * 12 - principal;
}

export type AmortizationRow = {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};

export function amortizationSchedule(
  principal: number,
  annualRatePct: number,
  years: number,
  maxRows = 360,
): AmortizationRow[] | null {
  const pmt = loanPaymentMonthly(principal, annualRatePct, years);
  if (pmt == null) return null;
  const r = annualRatePct / 100 / 12;
  const n = Math.min(Math.round(years * 12), maxRows);
  const rows: AmortizationRow[] = [];
  let balance = principal;
  for (let month = 1; month <= n && balance > 0.005; month++) {
    const interest = r === 0 ? 0 : balance * r;
    const principalPart = Math.min(pmt - interest, balance);
    balance = Math.max(0, balance - principalPart);
    rows.push({
      month,
      payment: principalPart + interest,
      principal: principalPart,
      interest,
      balance,
    });
  }
  return rows;
}

/** Future value: initial lump sum + monthly contributions, monthly compounding. */
export function futureValueWithContributions(
  initial: number,
  monthlyContribution: number,
  annualRatePct: number,
  years: number,
): number | null {
  if (years <= 0) return null;
  const n = years * 12;
  const r = annualRatePct / 100 / 12;
  let fv = initial;
  for (let i = 0; i < n; i++) {
    fv = fv * (1 + r) + monthlyContribution;
  }
  return fv;
}

/** Future value of lump sum only. */
export function futureValueLumpSum(
  principal: number,
  annualRatePct: number,
  years: number,
  compoundsPerYear = 12,
): number | null {
  if (principal < 0 || years < 0) return null;
  const r = annualRatePct / 100 / compoundsPerYear;
  const n = years * compoundsPerYear;
  return principal * Math.pow(1 + r, n);
}

/** Simple interest: I = P × r × t (years). */
export function simpleInterestAmount(
  principal: number,
  annualRatePct: number,
  years: number,
): number | null {
  if (principal < 0 || years < 0) return null;
  return principal * (annualRatePct / 100) * years;
}

export function salesTax(price: number, ratePct: number) {
  const tax = price * (ratePct / 100);
  return { tax, total: price + tax };
}

/** Future value needed today to match amount after inflation. */
export function inflationAdjustedValue(
  amountToday: number,
  inflationPct: number,
  years: number,
): number | null {
  if (amountToday < 0 || years < 0) return null;
  return amountToday * Math.pow(1 + inflationPct / 100, years);
}

/** Purchasing power of today's dollars after inflation (inverse). */
export function inflationPurchasingPower(
  amountToday: number,
  inflationPct: number,
  years: number,
): number | null {
  if (amountToday < 0 || years < 0) return null;
  return amountToday / Math.pow(1 + inflationPct / 100, years);
}

export function salaryToHourly(annualSalary: number, hoursPerYear = US_WORK_HOURS_PER_YEAR) {
  return annualSalary / hoursPerYear;
}

export function hourlyToSalary(hourly: number, hoursPerYear = US_WORK_HOURS_PER_YEAR) {
  return hourly * hoursPerYear;
}

export function payRaise(oldSalary: number, newSalary: number) {
  const increase = newSalary - oldSalary;
  const pct = oldSalary > 0 ? (increase / oldSalary) * 100 : 0;
  return { increase, pct };
}

export function applyDiscount(price: number, discountPct: number) {
  const savings = price * (discountPct / 100);
  return { savings, finalPrice: price - savings };
}

export function currencyConvert(amount: number, rate: number) {
  return amount * rate;
}

/** Months to pay off with optional extra monthly payment. */
export function loanPayoffMonths(
  balance: number,
  annualRatePct: number,
  monthlyPayment: number,
  extraPayment = 0,
): number | null {
  if (balance <= 0 || monthlyPayment <= 0) return null;
  const r = annualRatePct / 100 / 12;
  const totalPmt = monthlyPayment + extraPayment;
  let months = 0;
  let b = balance;
  const maxMonths = 600;
  while (b > 0.01 && months < maxMonths) {
    const interest = r === 0 ? 0 : b * r;
    const principal = totalPmt - interest;
    if (principal <= 0) return null;
    b = Math.max(0, b - principal);
    months++;
  }
  return months <= maxMonths ? months : null;
}

/** Max loan from affordable monthly payment (P = PMT × ((1+r)^n - 1) / (r(1+r)^n)). */
export function maxLoanFromPayment(
  monthlyPayment: number,
  annualRatePct: number,
  years: number,
): number | null {
  if (monthlyPayment <= 0 || years <= 0) return null;
  const n = years * 12;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return monthlyPayment * n;
  const factor = Math.pow(1 + r, n);
  return (monthlyPayment * (factor - 1)) / (r * factor);
}

/** HELOC interest-only monthly payment on current draw. */
export function helocInterestOnlyMonthly(draw: number, annualRatePct: number) {
  return (draw * (annualRatePct / 100)) / 12;
}

/** Simplified auto lease: depreciation + finance charge (money factor × (cap + residual)). */
export function autoLeaseMonthly(
  capCost: number,
  residual: number,
  moneyFactor: number,
  termMonths: number,
): number | null {
  if (capCost <= 0 || termMonths <= 0 || residual < 0 || residual >= capCost) return null;
  const depreciation = (capCost - residual) / termMonths;
  const finance = (capCost + residual) * moneyFactor;
  return depreciation + finance;
}

/** Solve annual rate (%) from loan payment (binary search). */
export function solveAnnualRateFromPayment(
  principal: number,
  monthlyPayment: number,
  years: number,
): number | null {
  if (principal <= 0 || monthlyPayment <= 0 || years <= 0) return null;
  const n = years * 12;
  const minPmt = principal / n;
  if (monthlyPayment < minPmt - 0.01) return null;

  let lo = 0;
  let hi = 50;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    const pmt = loanPaymentMonthly(principal, mid, years);
    if (pmt == null) return null;
    if (pmt > monthlyPayment) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
}

/** Simplified income tax estimate (effective rate user supplies + optional state). */
export function estimatedIncomeTax(
  grossIncome: number,
  federalEffectivePct: number,
  statePct = 0,
) {
  const federal = grossIncome * (federalEffectivePct / 100);
  const state = grossIncome * (statePct / 100);
  const total = federal + state;
  return { federal, state, total, net: grossIncome - total };
}

/** FHA monthly PMI estimate (annual MIP ~0.55% of loan on typical 30-yr — simplified). */
export function fhaMonthlyMip(loanAmount: number, mipAnnualPct = 0.55) {
  return (loanAmount * (mipAnnualPct / 100)) / 12;
}

/** Rent affordability: max rent at X% of gross monthly income (US common 30% rule). */
export function maxRentFromIncome(monthlyGrossIncome: number, rentRatioPct = 30) {
  return monthlyGrossIncome * (rentRatioPct / 100);
}

export function refinanceMonthlySavings(
  oldPayment: number,
  newPayment: number,
) {
  return oldPayment - newPayment;
}
