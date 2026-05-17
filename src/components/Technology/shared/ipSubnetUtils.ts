export type SubnetInfo = {
  ip: string;
  cidr: number;
  subnetMask: string;
  wildcardMask: string;
  networkAddress: string;
  broadcastAddress: string;
  firstUsableHost: string | null;
  lastUsableHost: string | null;
  totalAddresses: bigint;
  usableHosts: bigint;
  ipClass: string;
};

export function parseIpv4(ip: string): number | null {
  const parts = ip.trim().split(".");
  if (parts.length !== 4) return null;
  let n = 0;
  for (const part of parts) {
    if (!/^\d{1,3}$/.test(part)) return null;
    const octet = Number(part);
    if (octet < 0 || octet > 255) return null;
    n = (n << 8) + octet;
  }
  return n >>> 0;
}

export function ipv4FromNumber(n: number): string {
  const v = n >>> 0;
  return [
    (v >>> 24) & 255,
    (v >>> 16) & 255,
    (v >>> 8) & 255,
    v & 255,
  ].join(".");
}

export function cidrToMask(cidr: number): number {
  if (cidr <= 0) return 0;
  if (cidr >= 32) return 0xffffffff;
  return (0xffffffff << (32 - cidr)) >>> 0;
}

function isValidSubnetMask(mask: number): boolean {
  if (mask === 0) return true;
  const inv = (~mask) >>> 0;
  return (inv & (inv + 1)) === 0;
}

export function parseCidr(input: string): number | null {
  const raw = input.trim();
  const normalized = raw.startsWith("/") ? raw.slice(1) : raw;
  if (!/^\d{1,2}$/.test(normalized)) return null;
  const cidr = Number(normalized);
  if (cidr < 0 || cidr > 32) return null;
  return cidr;
}

export function parseSubnetMask(maskStr: string): number | null {
  const mask = parseIpv4(maskStr);
  if (mask === null || !isValidSubnetMask(mask)) return null;
  return mask;
}

export function maskToCidr(mask: number): number {
  if (mask === 0) return 0;
  let cidr = 0;
  let m = mask >>> 0;
  while (m & 0x80000000) {
    cidr += 1;
    m = (m << 1) >>> 0;
  }
  return m === 0 ? cidr : -1;
}

export function ipv4Class(firstOctet: number): string {
  if (firstOctet < 128) return "A";
  if (firstOctet < 192) return "B";
  if (firstOctet < 224) return "C";
  if (firstOctet < 240) return "D (multicast)";
  return "E (reserved)";
}

export function calculateIpv4Subnet(
  ipStr: string,
  cidr: number,
): { ok: true; data: SubnetInfo } | { ok: false; error: string } {
  const ip = parseIpv4(ipStr);
  if (ip === null) {
    return { ok: false, error: "Enter a valid IPv4 address (e.g. 192.168.1.10)." };
  }
  if (!Number.isInteger(cidr) || cidr < 0 || cidr > 32) {
    return { ok: false, error: "CIDR prefix must be between 0 and 32." };
  }

  const mask = cidrToMask(cidr);
  const network = (ip & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;
  const wildcard = (~mask) >>> 0;

  const total = BigInt(1) << BigInt(32 - cidr);
  let usable: bigint;
  let first: string | null;
  let last: string | null;

  if (cidr === 32) {
    usable = BigInt(1);
    first = ipv4FromNumber(network);
    last = first;
  } else if (cidr === 31) {
    usable = BigInt(2);
    first = ipv4FromNumber(network);
    last = ipv4FromNumber(broadcast);
  } else if (cidr === 0) {
    usable = BigInt(0);
    first = null;
    last = null;
  } else {
    usable = total > BigInt(2) ? total - BigInt(2) : BigInt(0);
    first = ipv4FromNumber(network + 1);
    last = ipv4FromNumber(broadcast - 1);
  }

  const firstOctet = (ip >>> 24) & 255;

  return {
    ok: true,
    data: {
      ip: ipv4FromNumber(ip),
      cidr,
      subnetMask: ipv4FromNumber(mask),
      wildcardMask: ipv4FromNumber(wildcard),
      networkAddress: ipv4FromNumber(network),
      broadcastAddress: ipv4FromNumber(broadcast),
      firstUsableHost: first,
      lastUsableHost: last,
      totalAddresses: total,
      usableHosts: usable,
      ipClass: ipv4Class(firstOctet),
    },
  };
}

export function formatHostCount(n: bigint): string {
  return n.toLocaleString("en-US");
}
