"use client";

import { useEffect, useId, useRef, useState } from "react";
import { unitsTriggerClass } from "./calculatorStyles";

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function CustomSelect<T extends string>({
  id,
  value,
  onChange,
  options,
  ariaLabel,
}: {
  id: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  ariaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId().replace(/:/g, "");

  useEffect(() => {
    function handleDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleDoc);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleDoc);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const current = options.find((o) => o.value === value) ?? options[0];

  return (
    <div className="relative w-full min-w-0 sm:min-w-[12rem]" ref={rootRef}>
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={ariaLabel}
        className={unitsTriggerClass}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        <span className="truncate">{current.label}</span>
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 text-neutral-1/60 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={id}
          className="absolute left-0 right-0 z-50 mt-1 overflow-hidden rounded-md border border-neutral-3 bg-neutral-2 py-1 shadow-[0_4px_14px_rgba(31,41,51,0.08)]"
        >
          {options.map((opt) => (
            <li key={opt.value} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={value === opt.value}
                className={`flex min-h-[44px] w-full items-center px-3 py-2.5 text-left text-[14px] text-neutral-1 transition-colors hover:bg-neutral-3 active:bg-neutral-3 ${value === opt.value ? "bg-neutral-3 font-medium" : ""}`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
