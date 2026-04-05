import { HomePage } from "@/components/Home";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Free online calculators",
  description:
    "Finance, health, fitness, math, and more — fast, free calculator tools.",
  path: "/",
});

export default function Home() {
  return <HomePage />;
}
