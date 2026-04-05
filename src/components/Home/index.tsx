import { HomeCategorySection } from "./component/CategorySection";
import { homeCategorySections } from "./data";

export function HomePage() {
  return (
    <div className="flex flex-col gap-12 pb-8">
      {homeCategorySections.map((section, index) => (
        <HomeCategorySection
          key={section.title}
          {...section}
          imagePriority={index === 0}
        />
      ))}
    </div>
  );
}
