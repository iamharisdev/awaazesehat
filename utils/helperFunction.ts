import Toast from "react-native-toast-message";

export const successMessage = (message: string) => {
  return Toast.show({ type: "success", text1: "Success", text2: message });
};

export const errorMessage = (message: string) => {
  return Toast.show({ type: "error", text1: "Error", text2: message });
};
export const infoMessage = (message: string) => {
  return Toast.show({ type: "info", text1: "Information", text2: message });
};
export function getUpdatedGestationalAge(
  pregnancyMonths: string,
  createdAt: string | Date,
  format: "full" | "short" = "full",
): string {
  const parsed = parseWeeksAndDays(pregnancyMonths);

  const pregWeeks = Number(parsed.weeks || 0);
  const pregDays = Number(parsed.days || 0);

  const start = new Date(createdAt);
  const today = new Date();

  const diffMs = today.getTime() - start.getTime();
  let diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Total days including pregWeeks and pregDays
  let totalDays = pregWeeks * 7 + pregDays + diffDays;
  if (format === "short") {
    const weeks = Math.floor(totalDays / 7);
    const days = totalDays % 7;
    return `${weeks} weeks, ${days} days`;
  } else {
    const months = Math.floor(totalDays / 30); // months = totalDays / 30
    totalDays -= months * 30;
    const weeks = Math.floor(totalDays / 7);
    const days = totalDays - weeks * 7;
    return `${months} months, ${weeks} weeks, ${days} days`;
  }
}

export function getWeeksAndDays(fromDate: string | Date): string {
  const start = new Date(fromDate);
  const today = new Date();

  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - start.getTime();
  if (diffTime < 0) return "0 weeks, 0 days";

  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;

  return `${weeks} weeks, ${days} days`;
}

export function parseWeeksAndDays(str: string) {
  const result = { weeks: "", days: "" };

  const weeksMatch = str?.match(/(\d+)\s*weeks?/i);
  if (weeksMatch) result.weeks = weeksMatch[1];

  const daysMatch = str?.match(/(\d+)\s*days?/i);
  if (daysMatch) result.days = daysMatch[1];

  return result;
}

type GPAInput = {
  prev: number;
  miscarriages: number;
};

export function calculateGPA({ prev, miscarriages }: GPAInput) {
  if (prev && miscarriages) {
    const G = prev + 1; // Gravida (including current)
    const P = prev - miscarriages; // Para (pregnancies reaching viability)
    const A = miscarriages; // Abortions (miscarriages)
    return `G${G}P${P}A${A}`;
  } else {
    return "--";
  }
}

export const onlyDigits = (value: string) => value.replace(/\D/g, "");

export const formatCNIC = (value: string) => {
  const digits = onlyDigits(value).slice(0, 13);

  if (digits.length <= 5) return digits;
  if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
};

export const removeCountryCode = (patient: any) => {
  let number = patient?.phoneNumber;
  return number?.startsWith("+92") ? number?.slice(3) : number;
};

// Strip keys whose values are "", "0", 0, null, or undefined.
export const cleanPayload = <T extends Record<string, any>>(
  obj: T | undefined | null,
): Partial<T> => {
  if (!obj || typeof obj !== "object") return {};
  const out: Partial<T> = {};
  Object.keys(obj).forEach((k) => {
    const v = (obj as any)[k];
    if (v === "" || v === "0" || v === 0 || v === null || v === undefined)
      return;
    (out as any)[k] = v;
  });
  return out;
};

// UI <-> API conversions for firstPregnancy.
export const firstPregnancyToBool = (
  v: unknown,
): boolean | undefined => {
  if (v === "Yes" || v === true || v === "true") return true;
  if (v === "No" || v === false || v === "false") return false;
  return undefined;
};

export const firstPregnancyToYesNo = (v: unknown): string => {
  if (v === true || v === "true" || v === "Yes") return "Yes";
  if (v === false || v === "false" || v === "No") return "No";
  return "";
};
