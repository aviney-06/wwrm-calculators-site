export type GradeRow = {
  score: number;
  weight: number;
};

export function calculateWeightedGrade(
  rows: GradeRow[],
): { ok: true; grade: number } | { ok: false; error: string } {
  const valid = rows.filter((r) => r.weight > 0 || r.score > 0);
  if (valid.length === 0) {
    return { ok: false, error: "Add at least one assignment with score and weight." };
  }

  let totalWeight = 0;
  let weightedSum = 0;
  for (const row of valid) {
    if (row.score < 0 || row.score > 100) {
      return { ok: false, error: "Each score must be between 0 and 100." };
    }
    if (row.weight < 0) {
      return { ok: false, error: "Weights cannot be negative." };
    }
    totalWeight += row.weight;
    weightedSum += row.score * row.weight;
  }

  if (totalWeight <= 0) {
    return { ok: false, error: "Total weight must be greater than 0." };
  }

  const grade = weightedSum / totalWeight;
  return { ok: true, grade };
}

export const LETTER_GRADE_POINTS: Record<string, number> = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0.0,
};

export const GPA_GRADE_OPTIONS = Object.keys(LETTER_GRADE_POINTS);

export type GpaCourse = {
  grade: string;
  credits: number;
};

export function calculateGpa(
  courses: GpaCourse[],
): { ok: true; gpa: number; totalCredits: number } | { ok: false; error: string } {
  const valid = courses.filter((c) => c.credits > 0);
  if (valid.length === 0) {
    return { ok: false, error: "Add at least one course with credit hours." };
  }

  let points = 0;
  let credits = 0;
  for (const course of valid) {
    const gp = LETTER_GRADE_POINTS[course.grade];
    if (gp == null) {
      return { ok: false, error: `Invalid grade: ${course.grade}` };
    }
    if (course.credits <= 0 || !Number.isFinite(course.credits)) {
      return { ok: false, error: "Credit hours must be greater than 0." };
    }
    points += gp * course.credits;
    credits += course.credits;
  }

  return { ok: true, gpa: points / credits, totalCredits: credits };
}

export function requiredFinalExamScore(
  currentGrade: number,
  targetGrade: number,
  finalWeightPercent: number,
): { ok: true; required: number } | { ok: false; error: string } {
  if (currentGrade < 0 || currentGrade > 100 || targetGrade < 0 || targetGrade > 100) {
    return { ok: false, error: "Grades must be between 0 and 100." };
  }
  if (finalWeightPercent <= 0 || finalWeightPercent > 100) {
    return { ok: false, error: "Final exam weight must be between 1 and 100." };
  }

  const w = finalWeightPercent / 100;
  const required = (targetGrade - currentGrade * (1 - w)) / w;
  return { ok: true, required };
}

export function testScorePercent(
  correct: number,
  total: number,
): { ok: true; percent: number } | { ok: false; error: string } {
  if (total <= 0) {
    return { ok: false, error: "Total questions must be greater than 0." };
  }
  if (correct < 0 || correct > total) {
    return { ok: false, error: "Correct answers must be between 0 and total questions." };
  }
  return { ok: true, percent: (correct / total) * 100 };
}

export function letterGradeFromPercent(percent: number): string {
  if (percent >= 97) return "A+";
  if (percent >= 93) return "A";
  if (percent >= 90) return "A-";
  if (percent >= 87) return "B+";
  if (percent >= 83) return "B";
  if (percent >= 80) return "B-";
  if (percent >= 77) return "C+";
  if (percent >= 73) return "C";
  if (percent >= 70) return "C-";
  if (percent >= 67) return "D+";
  if (percent >= 63) return "D";
  if (percent >= 60) return "D-";
  return "F";
}
