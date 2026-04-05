/** Shared design tokens for Health & Fitness calculators (match BMI reference) */
export const fieldBase =
  "min-h-[44px] rounded border border-[#E0E0E0] bg-white pl-2 pr-8 text-[14px] text-[#334155] outline-none transition-shadow focus:border-[#2374ac] focus:ring-2 focus:ring-[#2374ac]/30 sm:min-h-0 sm:h-10 sm:pl-2.5 sm:pr-9 sm:text-[15px] sm:focus:ring-1";

export const panelInner =
  "flex min-h-0 flex-col p-3 sm:p-5 md:min-h-[500px] md:p-7";

export const btnCalculate =
  "mt-auto min-h-[48px] w-full rounded-md bg-[#4CAF50] px-4 py-3 text-center text-[15px] font-semibold text-white shadow-sm transition hover:brightness-[1.03] active:scale-[0.99] active:brightness-95 sm:min-h-0";

export const unitsTriggerClass =
  "flex min-h-[44px] w-full min-w-0 max-w-full items-center justify-between gap-1.5 rounded border border-[#E0E0E0] bg-white px-2.5 py-2 text-left text-[13px] text-[#334155] outline-none transition-shadow hover:border-[#cbd5e1] focus:border-[#2374ac] focus:ring-2 focus:ring-[#2374ac]/30 sm:min-h-10 sm:gap-2 sm:pl-2.5 sm:pr-2 sm:text-[15px] sm:focus:ring-1";

export const resultAccent = "#d66844";

export const twoPanelGridClass = [
  "grid overflow-hidden rounded-md border border-[#E0E0E0] bg-white",
  "max-md:h-[min(72dvh,34rem)] max-md:grid-rows-2 max-md:divide-y max-md:divide-[#E0E0E0]",
  "md:min-h-[500px] md:grid-cols-2 md:grid-rows-1 md:divide-x md:divide-y-0 md:divide-[#E0E0E0]",
].join(" ");

export const formSectionScroll = `${panelInner} max-md:overflow-y-auto max-md:overscroll-contain`;
export const resultSectionScroll = `${panelInner} max-md:overflow-y-auto max-md:overscroll-contain`;

export const cardGroup =
  "rounded-md border border-[#E8ECF0] bg-[#f8fafc] p-3";
