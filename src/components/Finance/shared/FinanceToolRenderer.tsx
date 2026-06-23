import { Annuity_Calculator } from "@/components/Finance/Annuity/Annuity_Calculator";
import { Overtime_Calculator } from "@/components/Finance/Overtime/Overtime_Calculator";
import { ProfitMargin_Calculator } from "@/components/Finance/ProfitMargin/ProfitMargin_Calculator";
import { RentalProperty_Calculator } from "@/components/Finance/RentalProperty/RentalProperty_Calculator";
import type { FinanceCalculator } from "@/data/financeCalculators";
import { COMPOUND_VARIANTS } from "./compoundVariants";
import { CompoundSavings_Calculator } from "./CompoundSavings_Calculator";
import {
  Amortization_Calculator,
  AnnualIncome_Calculator,
  AutoLease_Calculator,
  Currency_Calculator,
  Discount_Calculator,
  Heloc_Calculator,
  HouseAffordability_Calculator,
  Inflation_Calculator,
  Interest_Calculator,
  InterestRate_Calculator,
  MortgagePayoff_Calculator,
  PayRaise_Calculator,
  Refinance_Calculator,
  Rent_Calculator,
  SalaryToHourly_Calculator,
  SalesTax_Calculator,
  SimpleInterest_Calculator,
  Tax_Calculator,
} from "./FinanceMiscCalculators";
import { LOAN_VARIANTS } from "./loanVariants";
import { LoanPayment_Calculator } from "./LoanPayment_Calculator";

export function FinanceToolRenderer({ config }: { config: FinanceCalculator }) {
  switch (config.toolKey) {
    case "loan-payment": {
      const variant = LOAN_VARIANTS[config.variant ?? "loan"];
      if (!variant) return null;
      return <LoanPayment_Calculator variant={variant} />;
    }
    case "compound-savings": {
      const variant = COMPOUND_VARIANTS[config.variant ?? "savings"];
      if (!variant) return null;
      return <CompoundSavings_Calculator variant={variant} />;
    }
    case "amortization":
      return <Amortization_Calculator />;
    case "sales-tax":
      return <SalesTax_Calculator />;
    case "inflation":
      return <Inflation_Calculator />;
    case "simple-interest":
      return <SimpleInterest_Calculator />;
    case "salary-to-hourly":
      return <SalaryToHourly_Calculator />;
    case "annual-income":
      return <AnnualIncome_Calculator />;
    case "mortgage-payoff":
      return <MortgagePayoff_Calculator />;
    case "house-affordability":
      return <HouseAffordability_Calculator />;
    case "refinance":
      return <Refinance_Calculator />;
    case "heloc":
      return <Heloc_Calculator />;
    case "auto-lease":
      return <AutoLease_Calculator />;
    case "discount":
      return <Discount_Calculator />;
    case "currency":
      return <Currency_Calculator />;
    case "pay-raise":
      return <PayRaise_Calculator />;
    case "tax":
      return <Tax_Calculator />;
    case "interest-rate":
      return <InterestRate_Calculator />;
    case "rent":
      return <Rent_Calculator />;
    case "interest":
      return <Interest_Calculator />;
    case "profit-margin":
      return <ProfitMargin_Calculator />;
    case "annuity":
      return <Annuity_Calculator />;
    case "rental-property":
      return <RentalProperty_Calculator />;
    case "overtime":
      return <Overtime_Calculator />;
    default:
      return null;
  }
}
