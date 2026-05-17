"use client";

import { useRef, useState } from "react";
import { btnCalculate, fieldBase } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import {
  pickRandomCards,
  type PlayingCard,
} from "@/components/Other/shared/otherUtils";

export function RandomCardPicker_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [count, setCount] = useState("1");
  const [error, setError] = useState<string | null>(null);
  const [cards, setCards] = useState<PlayingCard[] | null>(null);

  const run = () => {
    setError(null);
    const out = pickRandomCards(Number(count));
    if (!out.ok) {
      setError(out.error);
      setCards(null);
      return;
    }
    setCards(out.cards);
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <div>
        <label
          htmlFor="card-count"
          className="mb-1.5 block text-[13px] font-medium text-[#334155] sm:text-[15px]"
        >
          Cards to draw
        </label>
        <input
          id="card-count"
          type="number"
          min={1}
          max={52}
          value={count}
          onChange={(e) => setCount(e.target.value)}
          className={`${fieldBase} w-full max-w-[6rem] font-mono`}
        />
        <p className="mt-1 text-[11px] text-[#94a3b8] sm:text-[12px]">
          Standard 52-card deck, no duplicates.
        </p>
      </div>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Pick cards
      </button>
    </div>
  );

  const resultPanel =
    cards != null ? (
      <div className="w-full max-w-sm text-center">
        <p className="mb-3 text-[13px] text-[#64748b]">
          {cards.length === 1 ? "Your card" : `${cards.length} cards`}
        </p>
        <ul className="space-y-2">
          {cards.map((card, i) => (
            <li
              key={`${card.rank}-${card.suit}-${i}`}
              className="rounded-md border border-[#E8ECF0] bg-[#fafbfc] px-3 py-2.5 font-mono text-[15px] font-medium text-[#334155] sm:text-[16px]"
            >
              {card.label}
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Draw random cards from a shuffled deck.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />
  );
}
