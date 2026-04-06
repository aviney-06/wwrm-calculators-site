import { HomeExploreSection } from "@/components/Home/HomeExploreSection";
import { ScientificCalculator } from "@/components/Maths/ScientificCalculator";

export function HomePage() {
  return (
    <div className="pb-8">
      <ScientificCalculator />
      <HomeExploreSection />
    </div>
  );
}
