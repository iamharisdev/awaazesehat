export type Symptom = {
  icon: keyof typeof import("@/assets/svgs").Icons; // reference to the icon key
  title: string;
  status: string;
  time: string;
};

export const Symptoms: Symptom[] = [
  {
    icon: "bleeding",
    title: "Bleeding",
    status: "Critical",
    time: "10h ago",
  },
  {
    icon: "bp",
    title: "High blood pressure",
    status: "Mild",
    time: "from start",
  },
  {
    icon: "backPain",
    title: "Back pain",
    status: "Normal",
    time: "since 1st trimester",
  },
];

export const tabSwitcher=["Patient record", "Follow-up questions", "Reports", "EMR"]

export const steps = [
  "Add patient profile",
  "Record obstetric history",
  "Record gynecological history",
  "Review past medical history",
];

  export const tabConfig = [
    { name: "index", title: "Home", icon: "home"},
    { name: "search", title: "Search", icon: "search"},
    { name: "patients", title: "Patients", icon: "patients"},
    { name: "activity", title: "Activity", icon: "activity" },
  ];