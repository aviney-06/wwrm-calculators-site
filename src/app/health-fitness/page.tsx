import { CategoryCalculatorIndex } from "@/components/globals/CategoryCalculatorIndex";
import { BreadcrumbSchema } from "@/components/Schema-Markup/BreadcrumbSchema";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Health & Fitness Calculators",
  description:
    "BMI, body fat, TDEE, pregnancy, pace, sleep, and more free health calculators.",
  path: "/health-fitness",
});

const CALCULATORS: { href: string; label: string }[] = [
  { href: "/health-fitness/anorexic-bmi-calculator", label: "Anorexic BMI Calculator" },
  { href: "/health-fitness/army-body-fat-calculator", label: "Army Body Fat Calculator" },
  { href: "/health-fitness/bac-calculator", label: "BAC Calculator" },
  { href: "/health-fitness/bmi-calculator", label: "BMI Calculator" },
  { href: "/health-fitness/bmr-calculator", label: "BMR Calculator" },
  { href: "/health-fitness/body-fat-calculator", label: "Body Fat Calculator" },
  { href: "/health-fitness/body-surface-area-calculator", label: "Body Surface Area Calculator" },
  { href: "/health-fitness/body-type-calculator", label: "Body Type Calculator" },
  { href: "/health-fitness/calorie-calculator", label: "Calorie Calculator" },
  { href: "/health-fitness/calories-burned-calculator", label: "Calories Burned Calculator" },
  { href: "/health-fitness/carbohydrate-calculator", label: "Carbohydrate Calculator" },
  { href: "/health-fitness/conception-calculator", label: "Conception Calculator" },
  { href: "/health-fitness/due-date-calculator", label: "Due Date Calculator" },
  { href: "/health-fitness/fat-intake-calculator", label: "Fat Intake Calculator" },
  { href: "/health-fitness/gfr-calculator", label: "GFR Calculator" },
  { href: "/health-fitness/healthy-weight-calculator", label: "Healthy Weight Calculator" },
  { href: "/health-fitness/ideal-weight-calculator", label: "Ideal Weight Calculator" },
  { href: "/health-fitness/lean-body-mass-calculator", label: "Lean Body Mass Calculator" },
  { href: "/health-fitness/macro-calculator", label: "Macro Calculator" },
  { href: "/health-fitness/one-rep-max-calculator", label: "One Rep Max Calculator" },
  { href: "/health-fitness/overweight-calculator", label: "Overweight Calculator" },
  { href: "/health-fitness/ovulation-calculator", label: "Ovulation Calculator" },
  { href: "/health-fitness/pace-calculator", label: "Pace Calculator" },
  { href: "/health-fitness/period-calculator", label: "Period Calculator" },
  { href: "/health-fitness/pregnancy-calculator", label: "Pregnancy Calculator" },
  { href: "/health-fitness/pregnancy-conception-calculator", label: "Pregnancy Conception Calculator" },
  { href: "/health-fitness/pregnancy-weight-gain-calculator", label: "Pregnancy Weight Gain Calculator" },
  { href: "/health-fitness/protein-calculator", label: "Protein Calculator" },
  { href: "/health-fitness/sleep-calculator", label: "Sleep Calculator" },
  { href: "/health-fitness/target-heart-rate-calculator", label: "Target Heart Rate Calculator" },
  { href: "/health-fitness/tdee-calculator", label: "TDEE Calculator" },
  { href: "/health-fitness/weight-watchers-calculator", label: "Weight Watchers Points Calculator" },
];

export default function HealthFitnessIndexPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return (
    <>
      <BreadcrumbSchema
        baseUrl={baseUrl}
        items={[
          { name: "Home", href: "/" },
          { name: "Health calculator", href: "/health-fitness" },
        ]}
      />
      <CategoryCalculatorIndex
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Health calculator" },
        ]}
        title="Health & Fitness Calculator"
        description="BMI, calories, pregnancy, sleep, and more."
        links={CALCULATORS}
      />
    </>
  );
}
