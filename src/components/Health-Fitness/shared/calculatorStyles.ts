/** Shared design tokens for Health & Fitness calculators (match BMI reference) */
export const fieldBase =
  "h-[44px] rounded-md border border-neutral-3 bg-neutral-3 pl-3.5 pr-9 text-[14px] text-neutral-1 outline-none transition-colors placeholder:text-neutral-1/45 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none focus:border-primary focus:ring-1 focus:ring-primary";

export const panelInner =
  "flex min-h-0 flex-col p-5 sm:p-6 md:min-h-[500px] md:p-10";

export const btnCalculate =
  "mt-auto h-[44px] w-full rounded-md bg-primary px-4 text-center text-sm font-semibold text-neutral-2 shadow-xs transition-opacity hover:opacity-95";

export const unitsTriggerClass =
  "flex h-[44px] w-full min-w-0 max-w-full items-center justify-between gap-1.5 rounded-md border border-neutral-3 bg-neutral-3 pl-3.5 pr-2.5 text-left text-[14px] text-neutral-1 outline-none transition-colors hover:border-neutral-300 focus:border-primary focus:ring-1 focus:ring-primary";

export const resultAccent = "#d66844";

export const twoPanelGridClass = [
  "grid overflow-hidden rounded-lg border border-neutral-3 bg-neutral-2",
  "max-md:h-[min(72dvh,34rem)] max-md:grid-rows-2 max-md:divide-y max-md:divide-neutral-3",
  "md:min-h-[500px] md:grid-cols-2 md:grid-rows-1 md:divide-x md:divide-y-0 md:divide-neutral-3",
].join(" ");

export const formSectionScroll = `${panelInner} max-md:overflow-y-auto max-md:overscroll-contain`;
export const resultSectionScroll = `${panelInner} max-md:overflow-y-auto max-md:overscroll-contain`;

export const cardGroup =
  "rounded-md border border-neutral-3 bg-neutral-2 p-3";
