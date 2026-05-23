import { notFound } from "next/navigation";
import { CmToFtInConverter } from "@/components/Conversion/shared/CmToFtInConverter";
import { FtInToCmConverter } from "@/components/Conversion/shared/FtInToCmConverter";
import { ConversionCalculatorPageLayout } from "@/components/Conversion/shared/ConversionCalculatorPageLayout";
import { GramsToCupsConverter } from "@/components/Conversion/shared/GramsToCupsConverter";
import { MgToMlConverter } from "@/components/Conversion/shared/MgToMlConverter";
import { MlToGramsConverter } from "@/components/Conversion/shared/MlToGramsConverter";
import { PixelsToInchesConverter } from "@/components/Conversion/shared/PixelsToInchesConverter";
import { RomanNumeralConverter } from "@/components/Conversion/shared/RomanNumeralConverter";
import { TbspToGramsConverter } from "@/components/Conversion/shared/TbspToGramsConverter";
import { TimeToDecimalConverter } from "@/components/Conversion/shared/TimeToDecimalConverter";
import { UnitConverter } from "@/components/Conversion/shared/UnitConverter";
import {
  CONVERSION_BY_SLUG,
  CONVERSION_CALCULATORS,
  isGramsToCupsConversion,
  isHeightCmToFtInConversion,
  isHeightFtInToCmConversion,
  isMgToMlConversion,
  isMlToGramsConversion,
  isPixelsToInchesConversion,
  isRomanNumeralConversion,
  isTbspToGramsConversion,
  isTimeToDecimalConversion,
  isUnitConversion,
} from "@/data/conversionCalculators";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return CONVERSION_CALCULATORS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const config = CONVERSION_BY_SLUG[slug];
  if (!config) return {};

  return generateCalculatorPageMetadata({
    path: `/conversion/${slug}`,
    cmsSlug: slug,
    fallbackTitle: config.title,
    fallbackDescription: config.description,
  });
}

function ConversionTool({
  config,
}: {
  config: (typeof CONVERSION_CALCULATORS)[number];
}) {
  if (isHeightCmToFtInConversion(config)) {
    return (
      <CmToFtInConverter
        defaultValue={config.defaultValue}
        emptyHint={config.emptyHint}
      />
    );
  }
  if (isHeightFtInToCmConversion(config)) {
    return (
      <FtInToCmConverter
        defaultFt={config.defaultFt}
        defaultIn={config.defaultIn}
        emptyHint={config.emptyHint}
      />
    );
  }
  if (isRomanNumeralConversion(config)) {
    return <RomanNumeralConverter emptyHint={config.emptyHint} />;
  }
  if (isPixelsToInchesConversion(config)) {
    return <PixelsToInchesConverter emptyHint={config.emptyHint} />;
  }
  if (isMgToMlConversion(config)) {
    return <MgToMlConverter emptyHint={config.emptyHint} />;
  }
  if (isTimeToDecimalConversion(config)) {
    return <TimeToDecimalConverter emptyHint={config.emptyHint} />;
  }
  if (isMlToGramsConversion(config)) {
    return <MlToGramsConverter emptyHint={config.emptyHint} />;
  }
  if (isGramsToCupsConversion(config)) {
    return <GramsToCupsConverter emptyHint={config.emptyHint} />;
  }
  if (isTbspToGramsConversion(config)) {
    return <TbspToGramsConverter emptyHint={config.emptyHint} />;
  }
  if (isUnitConversion(config)) {
    return (
      <UnitConverter
        fromLabel={config.fromLabel}
        toLabel={config.toLabel}
        fromUnit={config.fromUnit}
        toUnit={config.toUnit}
        defaultValue={config.defaultValue}
        decimals={config.decimals}
        converterKey={config.converterKey}
        emptyHint={config.emptyHint}
      />
    );
  }
  return null;
}

export default async function ConversionCalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  const config = CONVERSION_BY_SLUG[slug];
  if (!config) notFound();

  const path = `/conversion/${slug}`;

  return (
    <ConversionCalculatorPageLayout
      path={path}
      title={config.title}
      description={config.description}
      breadcrumbLabel={config.breadcrumbLabel}
    >
      <ConversionTool config={config} />
    </ConversionCalculatorPageLayout>
  );
}
