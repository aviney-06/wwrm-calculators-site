"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [menuStyle, setMenuStyle] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = useId().replace(/:/g, "");

  const updateMenuPosition = () => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    setMenuStyle({
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
    });
  };

  useLayoutEffect(() => {
    if (!open) {
      setMenuStyle(null);
      return;
    }
    updateMenuPosition();
    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);
    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [open]);

  useEffect(() => {
    function handleDoc(e: MouseEvent) {
      const target = e.target as Node;
      if (
        rootRef.current?.contains(target) ||
        document.getElementById(listId)?.contains(target)
      ) {
        return;
      }
      setOpen(false);
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
  }, [listId]);

  const current = options.find((o) => o.value === value) ?? options[0];

  const menu =
    open && menuStyle ? (
      <ul
        id={listId}
        role="listbox"
        aria-labelledby={id}
        style={{
          position: "fixed",
          top: menuStyle.top,
          left: menuStyle.left,
          width: menuStyle.width,
          zIndex: 9999,
        }}
        className="max-h-[min(16rem,50dvh)] overflow-y-auto rounded border border-[#E0E0E0] bg-white py-1 shadow-[0_4px_14px_rgba(15,23,42,0.12)]"
      >
        {options.map((opt) => (
          <li key={opt.value} role="presentation">
            <button
              type="button"
              role="option"
              aria-selected={value === opt.value}
              className={`flex min-h-[44px] w-full items-center px-3 py-2.5 text-left text-[15px] text-[#334155] transition-colors hover:bg-[#f8fafc] active:bg-[#f1f5f9] ${value === opt.value ? "bg-[#f1f5f9] font-medium" : ""}`}
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
    ) : null;

  return (
    <div className="relative w-full min-w-0 sm:min-w-[12rem]" ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={ariaLabel}
        className={unitsTriggerClass}
        onClick={() => {
          setOpen((o) => {
            const next = !o;
            if (next) requestAnimationFrame(updateMenuPosition);
            return next;
          });
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            setOpen(true);
            requestAnimationFrame(updateMenuPosition);
          }
        }}
      >
        <span className="truncate">{current.label}</span>
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 text-[#64748b] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {typeof document !== "undefined" && menu
        ? createPortal(menu, document.body)
        : null}
    </div>
  );
}
