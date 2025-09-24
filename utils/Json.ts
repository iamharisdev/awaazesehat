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

export const bloodGroup = [
  { name: "A+" },
  { name: "A-" },
  { name: "B+" },
  { name: "B-" },
  { name: "AB+" },
  { name: "AB-" },
  { name: "O+" },
  { name: "O-" },
];

export const healthCondition=[
  {name:"Diabetes"},
  {name:"Hypertension"},
  {name:"Asthma"},
  {name:"Jaundice"},
  {name:"Cardiac"},
  {name:"Fever"},
  {name:"Renal"},
  {name:"Headache / dizziness"},
  {name:"Nausea / vomiting"},
  {name:"Foul-smelling discharge"},
  {name:"Burning urination / hematuria"},
  {name:"Lower abdominal / leg pain"},

]


export const DietaryHabits=[
  {name:"Fruits"},
  {name:"Vegetables"},
  {name:"Meat"},
  {name:"Eggs"},
  {name:"Milk"},
]

export const DomesticSituation=[
  {name:"None"},
  {name:"Verbal Abuse"},
  {name:"Physical Abuse"},
]