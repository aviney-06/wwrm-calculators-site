import { notFound } from "next/navigation";
import { CmToFtInConverter } from "@/components/Conversion/shared/CmToFtInConverter";
import { FtInToCmConverter } from "@/components/Conversion/shared/FtInToCmConverter";
import { ConversionCalculatorPageLayout } from "@/components/Conversion/shared/ConversionCalculatorPageLayout";
import { CupsToPoundsConverter } from "@/components/Conversion/shared/CupsToPoundsConverter";
import { DecimalToTimeConverter } from "@/components/Conversion/shared/DecimalToTimeConverter";
import { GeneralConverter } from "@/components/Conversion/shared/GeneralConverter";
import { GramsToCupsConverter } from "@/components/Conversion/shared/GramsToCupsConverter";
import { GramsToMlConverter } from "@/components/Conversion/shared/GramsToMlConverter";
import { GramsToMolesConverter } from "@/components/Conversion/shared/GramsToMolesConverter";
import { McgToIuConverter } from "@/components/Conversion/shared/McgToIuConverter";
import { MgToMlConverter } from "@/components/Conversion/shared/MgToMlConverter";
import { MlToGramsConverter } from "@/components/Conversion/shared/MlToGramsConverter";
import { MilitaryTimeConverter } from "@/components/Conversion/shared/MilitaryTimeConverter";
import { MmolToMgdlConverter } from "@/components/Conversion/shared/MmolToMgdlConverter";
import { NumberToWordsConverter } from "@/components/Conversion/shared/NumberToWordsConverter";
import { PixelsToInchesConverter } from "@/components/Conversion/shared/PixelsToInchesConverter";
import { RomanNumeralConverter } from "@/components/Conversion/shared/RomanNumeralConverter";
import { RomanNumeralDateConverter } from "@/components/Conversion/shared/RomanNumeralDateConverter";
import { ShoeSizeConverter } from "@/components/Conversion/shared/ShoeSizeConverter";
import { TbspToGramsConverter } from "@/components/Conversion/shared/TbspToGramsConverter";
import { TimeToDecimalConverter } from "@/components/Conversion/shared/TimeToDecimalConverter";
import { UnitConverter } from "@/components/Conversion/shared/UnitConverter";
import {
  CONVERSION_BY_SLUG,
  CONVERSION_CALCULATORS,
  isCupsToPoundsConversion,
  isDecimalToTimeConversion,
  isGeneralConversion,
  isGramsToCupsConversion,
  isGramsToMlConversion,
  isGramsToMolesConversion,
  isHeightCmToFtInConversion,
  isHeightFtInToCmConversion,
  isMcgToIuConversion,
  isMgToMlConversion,
  isMilitaryTimeConversion,
  isMlToGramsConversion,
  isMmolToMgdlConversion,
  isNumberToWordsConversion,
  isPixelsToInchesConversion,
  isRomanNumeralConversion,
  isRomanNumeralDateConversion,
  isShoeSizeConversion,
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
  if (isNumberToWordsConversion(config)) {
    return <NumberToWordsConverter emptyHint={config.emptyHint} />;
  }
  if (isGramsToMolesConversion(config)) {
    return <GramsToMolesConverter emptyHint={config.emptyHint} />;
  }
  if (isGeneralConversion(config)) {
    return <GeneralConverter emptyHint={config.emptyHint} />;
  }
  if (isRomanNumeralDateConversion(config)) {
    return <RomanNumeralDateConverter emptyHint={config.emptyHint} />;
  }
  if (isShoeSizeConversion(config)) {
    return <ShoeSizeConverter emptyHint={config.emptyHint} />;
  }
  if (isMcgToIuConversion(config)) {
    return <McgToIuConverter emptyHint={config.emptyHint} />;
  }
  if (isDecimalToTimeConversion(config)) {
    return <DecimalToTimeConverter emptyHint={config.emptyHint} />;
  }
  if (isCupsToPoundsConversion(config)) {
    return <CupsToPoundsConverter emptyHint={config.emptyHint} />;
  }
  if (isGramsToMlConversion(config)) {
    return <GramsToMlConverter emptyHint={config.emptyHint} />;
  }
  if (isMmolToMgdlConversion(config)) {
    return <MmolToMgdlConverter emptyHint={config.emptyHint} />;
  }
  if (isMilitaryTimeConversion(config)) {
    return <MilitaryTimeConverter emptyHint={config.emptyHint} />;
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
