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
