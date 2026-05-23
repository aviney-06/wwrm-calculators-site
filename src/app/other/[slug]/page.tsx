import { notFound } from "next/navigation";
import { Birthday_Calculator } from "@/components/Other/Birthday/Birthday_Calculator";
import { BirthYear_Calculator } from "@/components/Other/BirthYear/BirthYear_Calculator";
import { Btu_Calculator } from "@/components/Other/Btu/Btu_Calculator";
import { Concrete_Calculator } from "@/components/Other/Concrete/Concrete_Calculator";
import { Electricity_Calculator } from "@/components/Other/Electricity/Electricity_Calculator";
import { Love_Calculator } from "@/components/Other/Love/Love_Calculator";
import { MinecraftCircle_Calculator } from "@/components/Other/MinecraftCircle/MinecraftCircle_Calculator";
import { Powerball_Calculator } from "@/components/Other/Powerball/Powerball_Calculator";
import { Tip_Calculator } from "@/components/Other/Tip/Tip_Calculator";
import { DateAddDays_Calculator } from "@/components/Other/shared/DateAddDays_Calculator";
import { OtherCalculatorPageLayout } from "@/components/Other/shared/OtherCalculatorPageLayout";
import {
  OTHER_EXTRA_BY_SLUG,
  OTHER_EXTRA_CALCULATORS,
  type OtherExtraCalculator,
} from "@/data/otherExtraCalculators";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return OTHER_EXTRA_CALCULATORS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const config = OTHER_EXTRA_BY_SLUG[slug];
  if (!config) return {};

  return generateCalculatorPageMetadata({
    path: `/other/${slug}`,
    cmsSlug: slug,
    fallbackTitle: config.title,
    fallbackDescription: config.description,
  });
}

function OtherTool({ config }: { config: OtherExtraCalculator }) {
  switch (config.toolKey) {
    case "tip":
      return <Tip_Calculator />;
    case "concrete":
      return <Concrete_Calculator />;
    case "love":
      return <Love_Calculator />;
    case "date-add":
      return (
        <DateAddDays_Calculator
          days={config.days ?? 0}
          periodLabel={config.periodLabel ?? ""}
        />
      );
    case "birthday":
      return <Birthday_Calculator />;
    case "powerball":
      return <Powerball_Calculator />;
    case "minecraft-circle":
      return <MinecraftCircle_Calculator />;
    case "btu":
      return <Btu_Calculator />;
    case "birth-year":
      return <BirthYear_Calculator />;
    case "electricity":
      return <Electricity_Calculator />;
    default:
      return null;
  }
}

export default async function OtherExtraCalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  const config = OTHER_EXTRA_BY_SLUG[slug];
  if (!config) notFound();

  const path = `/other/${slug}`;

  return (
    <OtherCalculatorPageLayout
      path={path}
      title={config.title}
      description={config.description}
      breadcrumbLabel={config.breadcrumbLabel}
    >
      <OtherTool config={config} />
    </OtherCalculatorPageLayout>
  );
}
