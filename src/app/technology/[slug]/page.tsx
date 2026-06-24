import { notFound } from "next/navigation";
import { AspectRatio_Calculator } from "@/components/Technology/AspectRatio/AspectRatio_Calculator";
import { DownloadTime_Calculator } from "@/components/Technology/DownloadTime/DownloadTime_Calculator";
import { Hex_Calculator } from "@/components/Technology/Hex/Hex_Calculator";
import { OhmsLaw_Calculator } from "@/components/Technology/OhmsLaw/OhmsLaw_Calculator";
import { Resistor_Calculator } from "@/components/Technology/Resistor/Resistor_Calculator";
import { TechnologyCalculatorPageLayout } from "@/components/Technology/shared/TechnologyCalculatorPageLayout";
import {
  TECHNOLOGY_EXTRA_BY_SLUG,
  TECHNOLOGY_EXTRA_CALCULATORS,
  type TechnologyExtraCalculator,
} from "@/data/technologyExtraCalculators";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return TECHNOLOGY_EXTRA_CALCULATORS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const config = TECHNOLOGY_EXTRA_BY_SLUG[slug];
  if (!config) return {};

  return generateCalculatorPageMetadata({
    path: `/technology/${slug}`,
    cmsSlug: slug,
    fallbackTitle: config.title,
    fallbackDescription: config.description,
  });
}

function TechnologyTool({ config }: { config: TechnologyExtraCalculator }) {
  switch (config.toolKey) {
    case "ohms-law":
      return <OhmsLaw_Calculator />;
    case "hex":
      return <Hex_Calculator />;
    case "resistor":
      return <Resistor_Calculator />;
    case "aspect-ratio":
      return <AspectRatio_Calculator />;
    case "download-time":
      return <DownloadTime_Calculator />;
    default:
      return null;
  }
}

export default async function TechnologyExtraCalculatorPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const config = TECHNOLOGY_EXTRA_BY_SLUG[slug];
  if (!config) notFound();

  const path = `/technology/${slug}`;

  return (
    <TechnologyCalculatorPageLayout
      path={path}
      title={config.title}
      description={config.description}
      breadcrumbLabel={config.breadcrumbLabel}
    >
      <TechnologyTool config={config} />
    </TechnologyCalculatorPageLayout>
  );
}
