export type DaysUntilResult = {
  days: number;
  targetDate: Date;
  targetLabel: string;
  isToday: boolean;
};

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function daysUntilHoliday(
  month: number,
  day: number,
  holidayName: string,
  from: Date = new Date(),
): DaysUntilResult {
  const today = startOfDay(from);
  let year = today.getFullYear();
  let target = startOfDay(new Date(year, month - 1, day));

  if (target.getTime() < today.getTime()) {
    year += 1;
    target = startOfDay(new Date(year, month - 1, day));
  }

  const days = Math.round((target.getTime() - today.getTime()) / 86400000);
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return {
    days,
    targetDate: target,
    targetLabel: `${holidayName} — ${formatter.format(target)}`,
    isToday: days === 0,
  };
}

export function rollDice(
  count: number,
  sides: number,
): { ok: true; rolls: number[]; total: number } | { ok: false; error: string } {
  if (!Number.isInteger(count) || count < 1 || count > 20) {
    return { ok: false, error: "Use between 1 and 20 dice." };
  }
  if (!Number.isInteger(sides) || sides < 2 || sides > 100) {
    return { ok: false, error: "Sides must be between 2 and 100." };
  }
  const rolls = Array.from(
    { length: count },
    () => Math.floor(Math.random() * sides) + 1,
  );
  return { ok: true, rolls, total: rolls.reduce((a, b) => a + b, 0) };
}

const SUITS = ["Spades", "Hearts", "Diamonds", "Clubs"] as const;
const SUIT_SYMBOLS: Record<(typeof SUITS)[number], string> = {
  Spades: "♠",
  Hearts: "♥",
  Diamonds: "♦",
  Clubs: "♣",
};
const RANKS = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
] as const;

export type PlayingCard = {
  rank: (typeof RANKS)[number];
  suit: (typeof SUITS)[number];
  label: string;
};

function buildDeck(): PlayingCard[] {
  const deck: PlayingCard[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({
        rank,
        suit,
        label: `${rank} of ${suit} (${SUIT_SYMBOLS[suit]})`,
      });
    }
  }
  return deck;
}

const FULL_DECK = buildDeck();

export function pickRandomCards(
  count: number,
): { ok: true; cards: PlayingCard[] } | { ok: false; error: string } {
  if (!Number.isInteger(count) || count < 1 || count > 52) {
    return { ok: false, error: "Pick between 1 and 52 cards." };
  }
  const pool = [...FULL_DECK];
  const cards: PlayingCard[] = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    cards.push(pool.splice(idx, 1)[0]);
  }
  return { ok: true, cards };
}
