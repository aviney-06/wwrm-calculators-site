/** Shared design tokens for Health & Fitness calculators (match BMI reference) */
export const fieldBase =
  "min-h-[44px] rounded border border-[#E0E0E0] bg-white pl-2 pr-8 text-[14px] text-[#334155] outline-none transition-shadow focus:border-[#2374ac] focus:ring-2 focus:ring-[#2374ac]/30 sm:min-h-0 sm:h-10 sm:pl-2.5 sm:pr-9 sm:text-[15px] sm:focus:ring-1";

/** Hide browser steppers on number inputs — use with fieldBase. */
export const numberInputNoSpinnerClass =
  "[appearance:textfield] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0";

export function numberFieldClass(extra = ""): string {
  return [fieldBase, numberInputNoSpinnerClass, extra].filter(Boolean).join(" ");
}

export const panelInner =
  "flex min-h-0 flex-col p-3 sm:p-5 md:min-h-[500px] md:p-7";

export const btnCalculate =
  "mt-auto min-h-[48px] w-full rounded-md bg-[#4CAF50] px-4 py-3 text-center text-[15px] font-semibold text-white shadow-sm transition hover:brightness-[1.03] active:scale-[0.99] active:brightness-95 sm:min-h-0";

export const unitsTriggerClass =
  "flex min-h-[44px] w-full min-w-0 max-w-full items-center justify-between gap-1.5 rounded border border-[#E0E0E0] bg-white px-2.5 py-2 text-left text-[13px] text-[#334155] outline-none transition-shadow hover:border-[#cbd5e1] focus:border-[#2374ac] focus:ring-2 focus:ring-[#2374ac]/30 sm:min-h-10 sm:gap-2 sm:pl-2.5 sm:pr-2 sm:text-[15px] sm:focus:ring-1";

export const resultAccent = "#d66844";

/** Outer card shell — same on server and client (no grid here). */
export const twoPanelShellClass =
  "overflow-hidden rounded-md border border-[#E0E0E0] bg-white max-md:overflow-x-hidden";

/** Mobile: horizontal track. Desktop: 2 columns with a 1px hairline gap. */
export const twoPanelTrackClass =
  "flex w-[200%] max-md:transition-transform max-md:duration-300 max-md:ease-out motion-reduce:max-md:transition-none md:grid md:w-full md:min-h-[500px] md:grid-cols-2 md:gap-px md:bg-[#eef1f4] md:translate-x-0 md:transition-none";

export const formPanelClass = `${panelInner} md:bg-white`;
export const resultPanelClass = `${panelInner} md:bg-[#fafbfc]`;

export const formSectionScroll = panelInner;
export const resultSectionScroll = panelInner;

export const cardGroup =
  "rounded-md border border-[#E8ECF0] bg-[#f8fafc] p-3";

/** Imperial ft/in row — fills the height column on mobile (avoid fixed 3rem inputs). */
export const imperialHeightRowClass = "flex w-full min-w-0 gap-1.5 sm:gap-2";
export const imperialHeightFieldClass = "min-w-0 flex-1";
export const imperialHeightInputClass = "w-full";
