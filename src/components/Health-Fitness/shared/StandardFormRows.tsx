"use client";

import type { ReactNode } from "react";

type Gender = "male" | "female";

const ageLabelClass =
  "min-w-[2rem] text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-1/75 sm:min-w-[2.5rem]";

const ageInputClass =
  "h-[44px] w-[4.5rem] rounded-md border border-neutral-3 bg-neutral-3 px-3 text-[14px] text-neutral-1 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none focus:border-primary focus:ring-1 focus:ring-primary";

const ageRangeHintClass =
  "hidden text-[12px] italic text-neutral-1/45 sm:inline";

const genderTitleClass =
  "mb-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-1/75";

const radioLabelClass =
  "flex cursor-pointer items-center gap-1.5 text-[14px] text-neutral-1 sm:gap-2";

const radioInputClass = "h-3.5 w-3.5 accent-primary sm:h-4 sm:w-4";

/** Single age row — matches BMI calculator (inline label, compact input, range hint on sm+). */
export function AgeField({
  age,
  setAge,
  id,
  ageMin,
  ageMax,
}: {
  age: string;
  setAge: (v: string) => void;
  id: string;
  ageMin: number;
  ageMax: number;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 sm:gap-x-3 sm:gap-y-2">
      <label htmlFor={id} className={ageLabelClass}>
        Age
      </label>
      <input
        id={id}
        type="number"
        min={ageMin}
        max={ageMax}
        inputMode="numeric"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className={ageInputClass}
      />
      <span className={ageRangeHintClass}>
        (age {ageMin} to {ageMax} only)
      </span>
    </div>
  );
}

/** Gender radios — matches BMI calculator. */
export function GenderField({
  gender,
  setGender,
  namePrefix,
  label = "Gender",
  hint,
}: {
  gender: Gender;
  setGender: (g: Gender) => void;
  namePrefix: string;
  label?: string;
  hint?: string;
}) {
  const groupName = `${namePrefix}-gender`;
  return (
    <div>
      <p className={genderTitleClass}>{label}</p>
      <div className="flex gap-6 sm:gap-10">
        <label className={radioLabelClass}>
          <input
            type="radio"
            name={groupName}
            checked={gender === "male"}
            onChange={() => setGender("male")}
            className={radioInputClass}
          />
          Male
        </label>
        <label className={radioLabelClass}>
          <input
            type="radio"
            name={groupName}
            checked={gender === "female"}
            onChange={() => setGender("female")}
            className={radioInputClass}
          />
          Female
        </label>
      </div>
      {hint ? (
        <p className="mt-1.5 text-[11px] leading-snug text-neutral-1/55 sm:text-[12px]">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function AgeGenderRow({
  age,
  setAge,
  gender,
  setGender,
  ageId = "calc-age",
  ageMin = 2,
  ageMax = 65,
  ageHint,
}: {
  age: string;
  setAge: (v: string) => void;
  gender: Gender;
  setGender: (g: Gender) => void;
  ageId?: string;
  /** Shown on input and in the italic range hint — match your validation. */
  ageMin?: number;
  ageMax?: number;
  /** Optional muted helper below gender (e.g. formula note). */
  ageHint?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <AgeField
        age={age}
        setAge={setAge}
        id={ageId}
        ageMin={ageMin}
        ageMax={ageMax}
      />
      <GenderField
        gender={gender}
        setGender={setGender}
        namePrefix={ageId}
      />
      {ageHint ? (
        <p className="text-[11px] leading-snug text-neutral-1/55 sm:text-[12px]">
          {ageHint}
        </p>
      ) : null}
    </div>
  );
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p
      className="rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-[13px] leading-snug text-red-900"
      role="alert"
    >
      {message}
    </p>
  );
}

export function UnitsRow({
  label,
  selectId,
  select,
}: {
  label: string;
  selectId: string;
  select: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-2">
      <label
        htmlFor={selectId}
        className="shrink-0 text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-1/75 sm:min-w-[2.5rem]"
      >
        {label}
      </label>
      {select}
    </div>
  );
}
