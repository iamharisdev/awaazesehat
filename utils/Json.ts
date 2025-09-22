export type Symptom = {
  icon: keyof typeof import("@/assets/svgs").Icons; // reference to the icon key
  title: string;
  status: string;
  time: string;
  inactive: boolean;
};

export const Symptoms: Symptom[] = [
  {
    icon: "bleeding",
    title: "Bleeding",
    status: "Critical",
    time: "10h ago",
    inactive: false,
  },
  {
    icon: "bp",
    title: "High blood pressure",
    status: "Mild",
    time: "from start",
    inactive: false,
  },
  {
    icon: "backPain",
    title: "Back pain",
    status: "Normal",
    time: "since 1st trimester",
    inactive: false,
  },
  {
    icon: "flow",
    title: "Dizziness",
    status: "Normal",
    time: "since 1st trimester",
    inactive: true,
  },
  {
    icon: "flow",
    title: "Severe headache",
    status: "Critical",
    time: "since 1st trimester",
    inactive: true,
  },
];

export const tabSwitcher = [
  "Patient record",
  "Follow-up questions",
  "Reports",
  "EMR",
];

export const steps = [
  "Add patient profile",
  "Record obstetric history",
  "Record gynecological history",
  "Review past medical history",
];

export const tabConfig = [
  { name: "index", title: "Home", icon: "home" },
  { name: "search", title: "Search", icon: "search" },
  { name: "patients", title: "Patients", icon: "patients" },
  { name: "activity", title: "Activity", icon: "activity" },
];
