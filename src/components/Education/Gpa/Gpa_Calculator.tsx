"use client";

import { useRef, useState } from "react";
import { btnCalculate, fieldBase } from "@/components/Health-Fitness/shared/calculatorStyles";
import {
  CalculatorTwoPanel,
  scrollResultIntoViewMobile,
} from "@/components/Health-Fitness/shared/CalculatorTwoPanel";
import { CustomSelect } from "@/components/Health-Fitness/shared/CustomSelect";
import { FormError } from "@/components/Health-Fitness/shared/StandardFormRows";
import { formatNum } from "@/components/Maths/shared/mathUtils";
import {
  calculateGpa,
  GPA_GRADE_OPTIONS,
  type GpaCourse,
} from "@/components/Education/shared/educationUtils";

type CourseRow = { grade: string; credits: string };

const DEFAULT_COURSES: CourseRow[] = [
  { grade: "A", credits: "3" },
  { grade: "B+", credits: "4" },
  { grade: "A-", credits: "3" },
];

const gradeOptions = GPA_GRADE_OPTIONS.map((g) => ({ value: g, label: g }));

export function Gpa_Calculator() {
  const resultRef = useRef<HTMLElement>(null);
  const [courses, setCourses] = useState<CourseRow[]>(DEFAULT_COURSES);
  const [error, setError] = useState<string | null>(null);
  const [gpa, setGpa] = useState<number | null>(null);
  const [totalCredits, setTotalCredits] = useState<number | null>(null);

  const updateCourse = (index: number, field: keyof CourseRow, value: string) => {
    setCourses((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c)),
    );
  };

  const addCourse = () => {
    setCourses((prev) => [...prev, { grade: "B", credits: "3" }]);
  };

  const run = () => {
    setError(null);
    const parsed: GpaCourse[] = courses.map((c) => ({
      grade: c.grade,
      credits: Number(c.credits),
    }));
    if (parsed.some((c) => !Number.isFinite(c.credits))) {
      setError("Enter valid credit hours for each course.");
      setGpa(null);
      return;
    }
    const out = calculateGpa(parsed);
    if (!out.ok) {
      setError(out.error);
      setGpa(null);
      return;
    }
    setGpa(out.gpa);
    setTotalCredits(out.totalCredits);
    scrollResultIntoViewMobile(resultRef.current);
  };

  const form = (
    <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6">
      <p className="text-[12px] text-[#64748b] sm:text-[13px]">
        Enter letter grade and credit hours for each course (4.0 scale).
      </p>
      <div className="space-y-2">
        {courses.map((course, i) => (
          <div
            key={i}
            className="grid grid-cols-2 gap-2 rounded-md border border-[#E8ECF0] bg-[#fafbfc] p-2.5 sm:gap-3 sm:p-3"
          >
            <div>
              <label className="mb-1 block text-[11px] font-medium text-[#64748b]">
                Grade
              </label>
              <CustomSelect
                id={`gpa-grade-${i}`}
                value={course.grade}
                onChange={(v) => updateCourse(i, "grade", v)}
                options={gradeOptions}
              />
            </div>
            <div>
              <label
                htmlFor={`gpa-credits-${i}`}
                className="mb-1 block text-[11px] font-medium text-[#64748b]"
              >
                Credits
              </label>
              <input
                id={`gpa-credits-${i}`}
                type="number"
                min={0}
                step="0.5"
                value={course.credits}
                onChange={(e) => updateCourse(i, "credits", e.target.value)}
                className={`${fieldBase} w-full font-mono`}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addCourse}
        className="self-start text-[13px] font-medium text-secondary underline-offset-2 hover:underline"
      >
        + Add course
      </button>
      <FormError message={error} />
      <button type="button" className={btnCalculate} onClick={run}>
        Calculate GPA
      </button>
    </div>
  );

  const resultPanel =
    gpa != null ? (
      <div className="text-center">
        <p className="text-[13px] text-[#64748b] sm:text-[14px]">GPA (4.0 scale)</p>
        <p className="mt-1 text-4xl font-semibold text-[#d66844]">
          {formatNum(gpa, 2)}
        </p>
        {totalCredits != null ? (
          <p className="mt-2 text-[13px] text-[#94a3b8]">
            Based on {formatNum(totalCredits, 1)} credit hours
          </p>
        ) : null}
      </div>
    ) : (
      <p className="max-w-[14rem] text-center text-[11px] text-[#9ca3af] sm:text-[14px]">
        Add courses to calculate your semester or cumulative GPA.
      </p>
    );

  return (
    <CalculatorTwoPanel form={form} result={resultPanel} resultRef={resultRef} />
  );
}
