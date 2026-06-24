import { notFound } from "next/navigation";
import { Birthday_Calculator } from "@/components/Other/Birthday/Birthday_Calculator";
import { BirthYear_Calculator } from "@/components/Other/BirthYear/BirthYear_Calculator";
import { Btu_Calculator } from "@/components/Other/Btu/Btu_Calculator";
import { Concrete_Calculator } from "@/components/Other/Concrete/Concrete_Calculator";
import { BoardFoot_Calculator } from "@/components/Other/Construction/BoardFoot_Calculator";
import { CubicFeet_Calculator } from "@/components/Other/Construction/CubicFeet_Calculator";
import { CubicYards_Calculator } from "@/components/Other/Construction/CubicYards_Calculator";
import { FeetInches_Calculator } from "@/components/Other/Construction/FeetInches_Calculator";
import { Gravel_Calculator } from "@/components/Other/Construction/Gravel_Calculator";
import { RoofPitch_Calculator } from "@/components/Other/Construction/RoofPitch_Calculator";
import { Stair_Calculator } from "@/components/Other/Construction/Stair_Calculator";
import { TankVolume_Calculator } from "@/components/Other/Construction/TankVolume_Calculator";
import { Age_Calculator } from "@/components/Other/DateTime/Age_Calculator";
import { DateShift_Calculator } from "@/components/Other/DateTime/DateShift_Calculator";
import { DayCounter_Calculator } from "@/components/Other/DateTime/DayCounter_Calculator";
import { DayOfWeek_Calculator } from "@/components/Other/DateTime/DayOfWeek_Calculator";
import { DaysBetween_Calculator } from "@/components/Other/DateTime/DaysBetween_Calculator";
import { Hours_Calculator } from "@/components/Other/DateTime/Hours_Calculator";
import { HoursMinutes_Calculator } from "@/components/Other/DateTime/HoursMinutes_Calculator";
import { SunriseSunset_Calculator } from "@/components/Other/DateTime/SunriseSunset_Calculator";
import { TimeAdd_Calculator } from "@/components/Other/DateTime/TimeAdd_Calculator";
import { TimeCard_Calculator } from "@/components/Other/DateTime/TimeCard_Calculator";
import { TimeDuration_Calculator } from "@/components/Other/DateTime/TimeDuration_Calculator";
import { TimeZone_Calculator } from "@/components/Other/DateTime/TimeZone_Calculator";
import { WorkHours_Calculator } from "@/components/Other/DateTime/WorkHours_Calculator";
import { DewPoint_Calculator } from "@/components/Other/DewPoint/DewPoint_Calculator";
import { DogSize_Calculator } from "@/components/Other/DogSize/DogSize_Calculator";
import { Electricity_Calculator } from "@/components/Other/Electricity/Electricity_Calculator";
import { Love_Calculator } from "@/components/Other/Love/Love_Calculator";
import { Mulch_Calculator } from "@/components/Other/Mulch/Mulch_Calculator";
import { Tile_Calculator } from "@/components/Other/Tile/Tile_Calculator";
import { MinecraftCircle_Calculator } from "@/components/Other/MinecraftCircle/MinecraftCircle_Calculator";
import { Powerball_Calculator } from "@/components/Other/Powerball/Powerball_Calculator";
import { SquareFootage_Calculator } from "@/components/Other/SquareFootage/SquareFootage_Calculator";
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
    case "age":
      return <Age_Calculator />;
    case "time-add":
      return <TimeAdd_Calculator />;
    case "date-shift":
      return <DateShift_Calculator />;
    case "time-duration":
      return <TimeDuration_Calculator />;
    case "work-hours":
      return <WorkHours_Calculator />;
    case "day-counter":
      return <DayCounter_Calculator />;
    case "square-footage":
      return <SquareFootage_Calculator />;
    case "time-card":
      return <TimeCard_Calculator />;
    case "hours":
      return <Hours_Calculator />;
    case "day-of-week":
      return <DayOfWeek_Calculator />;
    case "hours-minutes":
      return <HoursMinutes_Calculator />;
    case "days-between":
      return <DaysBetween_Calculator />;
    case "time-zone":
      return <TimeZone_Calculator />;
    case "sunrise-sunset":
      return <SunriseSunset_Calculator />;
    case "feet-inches":
      return <FeetInches_Calculator />;
    case "gravel":
      return <Gravel_Calculator />;
    case "cubic-yards":
      return <CubicYards_Calculator />;
    case "tank-volume":
      return <TankVolume_Calculator />;
    case "stair":
      return <Stair_Calculator />;
    case "board-foot":
      return <BoardFoot_Calculator />;
    case "roof-pitch":
      return <RoofPitch_Calculator />;
    case "cubic-feet":
      return <CubicFeet_Calculator />;
    case "mulch":
      return <Mulch_Calculator />;
    case "tile":
      return <Tile_Calculator />;
    case "dog-size":
      return <DogSize_Calculator />;
    case "dew-point":
      return <DewPoint_Calculator />;
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
