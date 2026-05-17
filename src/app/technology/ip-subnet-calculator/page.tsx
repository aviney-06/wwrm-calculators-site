import { IpSubnet_Calculator } from "@/components/Technology/IpSubnet/IpSubnet_Calculator";
import { TechnologyCalculatorPageLayout } from "@/components/Technology/shared/TechnologyCalculatorPageLayout";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

const PATH = "/technology/ip-subnet-calculator";
const FALLBACK_TITLE = "IP Subnet Calculator";
const FALLBACK_DESCRIPTION =
  "Calculate network address, broadcast, subnet mask, and usable host range from an IPv4 address and CIDR prefix.";

export async function generateMetadata() {
  return generateCalculatorPageMetadata({
    path: PATH,
    fallbackTitle: FALLBACK_TITLE,
    fallbackDescription: FALLBACK_DESCRIPTION,
  });
}

export default function Page() {
  return (
    <TechnologyCalculatorPageLayout
      path={PATH}
      title="IP Subnet Calculator"
      description="Calculate network address, broadcast, subnet mask, wildcard mask, and usable host range from an IPv4 address and CIDR prefix."
      breadcrumbLabel="ip subnet calculator"
    >
      <IpSubnet_Calculator />
    </TechnologyCalculatorPageLayout>
  );
}
