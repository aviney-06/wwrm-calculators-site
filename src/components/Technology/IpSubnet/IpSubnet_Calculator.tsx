"use client";

import { useRef, useState } from "react";
import { btnCalculate, fieldBase } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import {
  calculateIpv4Subnet,
  formatHostCount,
  type SubnetInfo,
} from "@/components/Technology/shared/ipSubnetUtils";

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full max-w-md flex-col gap-0.5 border-b border-[#E8ECF0] py-2.5 text-left last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      <dt className="shrink-0 text-[12px] font-medium text-[#64748b] sm:text-[13px]">
        {label}
      </dt>
      <dd className="break-all font-mono text-[13px] text-[#334155] sm:text-right sm:text-[14px]">
        {value}
      </dd>
    </div>
  );
}

export function IpSubnet_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [ip, setIp] = useState("192.168.1.10");
  const [cidr, setCidr] = useState("24");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SubnetInfo | null>(null);

  const run = () => {
    setError(null);
    const prefix = Number(cidr);
    const out = calculateIpv4Subnet(ip, prefix);
    if (!out.ok) {
      setError(out.error);
      setResult(null);
      return;
    }
    setResult(out.data);
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label
          htmlFor="ip-subnet-ip"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          IPv4 address
        </label>
        <input
          id="ip-subnet-ip"
          type="text"
          inputMode="decimal"
          autoComplete="off"
          spellCheck={false}
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="192.168.1.10"
          className={`${fieldBase} w-full font-mono`}
        />
      </div>
      <div>
        <label
          htmlFor="ip-subnet-cidr"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          CIDR prefix
        </label>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[15px] text-[#64748b]">/</span>
          <input
            id="ip-subnet-cidr"
            type="number"
            min={0}
            max={32}
            value={cidr}
            onChange={(e) => setCidr(e.target.value)}
            className={`${fieldBase} w-full max-w-[5rem] font-mono`}
          />
          <span className="text-[12px] text-[#94a3b8]">(0–32)</span>
        </div>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate subnet
      </button>
    </div>
  );

  const resultPanel =
    result != null ? (
      <dl className="w-full max-w-md">
        <ResultRow label="IP address" value={result.ip} />
        <ResultRow label="Network address" value={result.networkAddress} />
        <ResultRow label="Subnet mask" value={result.subnetMask} />
        <ResultRow label="Wildcard mask" value={result.wildcardMask} />
        <ResultRow label="Broadcast address" value={result.broadcastAddress} />
        <ResultRow
          label="First usable host"
          value={result.firstUsableHost ?? "—"}
        />
        <ResultRow
          label="Last usable host"
          value={result.lastUsableHost ?? "—"}
        />
        <ResultRow
          label="Total addresses"
          value={formatHostCount(result.totalAddresses)}
        />
        <ResultRow
          label="Usable hosts"
          value={formatHostCount(result.usableHosts)}
        />
        <ResultRow label="IP class" value={result.ipClass} />
        <ResultRow label="CIDR" value={`/${result.cidr}`} />
      </dl>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Enter an IPv4 address and CIDR prefix, then calculate.
      </p>
    );

  return (
    <CalculatorTwoPanel
      form={form}
      result={resultPanel}
      resultRef={resultRef}
      disclaimer={
        <p className="mt-4 text-center text-[11px] italic leading-snug text-[#9ca3af] sm:mt-8 sm:text-[13px] sm:leading-normal">
          For planning and education only. Verify production network settings
          with your administrator.
        </p>
      }
    />
  );
}
