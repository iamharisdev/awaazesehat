import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum labTestEnum {
  ultrasoundScan = "ultrasoundScan",
  bloodGlucoseRandom = "bloodGlucoseRandom",
  urineCulture = "urineCulture",
  hba1c = "hba1c",
  urineAnalysis = "urineAnalysis",
  rubellaAntibodyStatus = "rubellaAntibodyStatus",
  bloodGroup = "bloodGroup",
  antiHCV = "antiHCV",
  hbsag = "hbsag",
  gtt = "gtt",
  cbc = "cbc",
  lft = "lft",
  hvs = "hvs",
}

type EmrObjectSteps =
  | "patient"
  | "obsHistory"
  | "gynecologicalHistory"
  | "medicalHistory"
  | "surgicalHistory"
  | "currentPregnancy"
  | "familyHistory"
  | "personalHistory"
  | "socioEconomicHistory"
  | "trimester";

type VisitObjectSteps =
  | "vitals"
  | "examination"
  | "diagnostics"
  | "proposedPlan";

type Visits = {
  id: string | null;
  patientId: string | null;
  visitDate: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  vitals?: Vitals;
  examination?: Examination;
  diagnostics?: any;
  proposedPlan?: ProposedPlan;
};

export interface Vitals {
  presentingComplaint?: string | null;
  visitId: string;
  bloodPressure?: string | null;
  pulseRate?: string | null;
  temperature?: string | null;
  respiratoryRate?: string | null;
  weight?: string | null;
  visitDate?: string | null;
}
export interface Examination {
  bilateralPedalEdema: string | null;
  clubbing: string | null;
  koilonychia: string | null;
  lymphNodes: string | null;
  pallor: string | null;
  spine: string | null;
  abnormalSpine: string | null;
  nippleDeformity: string | null;
  nippleDischarge: string | null;
  sizeComparison: string | null;
  swelling: string | null;
  abdominalWallEdema: string | null;
  estimatedFetalWeight: string | null;
  fetalHeartRate: string | null;
  fundalHeight: string | null;
  hernialOrfices: string | null;
  lie: string | null;
  liquor: string | null;
  leukonychia: string | null;
  presentation: string | null;
  prominentVeins: string | null;
  pulsations: string | null;
  scarTenderness: string | null;
  shapeOfAbdomen: string | null;
  striae: string | null;
  umbilicus: string | null;
  perSpeculumFindings: string | null;
  perVaginalFindings: string | null;
  physicalFindings: string | null;
}

export interface ProposedPlan {
  diagnosisPregnency: string;
  advisedLabTests?: any | null;
  doctorNotes?: string | null;
  nextFollowUpTiming?: string | null; // keep string for API
  generalPlan?: string | null;
  createdBy?: "AI" | "Doctor" | null;
  medication?: string[] | null;
}

export interface Diagnostics {
  diagnostics?:
    | {
        id?: string;
        summary?: string;
        name?: string;
        uri?: string | null;
      }[]
    | null;
}

interface emr {
  id?: string | null;
  patient?: Record<string, any>;
  obsHistory?: Record<string, any>;
  gynecologicalHistory?: Record<string, any>;
  medicalHistory?: Record<string, any>;
  surgicalHistory?: Record<string, any>;
  currentPregnancy?: Record<string, any>;
  familyHistory?: Record<string, any>;
  trimester?: Record<string, any>;
  personalHistory?: Record<string, any>;
  socioEconomicHistory?: Record<string, any>;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
}

interface FollowUpRecord {
  question1?: Record<string, any>;
  question2?: Record<string, any>;
  question3?: Record<string, any>;
  question4?: Record<string, any>;
  question5?: Record<string, any>;
}

interface UserState {
  currentPatient: any;
  tab:number;
  emr: emr;
  visit: Visits;
  visitSteps: number;
  emrSteps: number;
  activeVisit: boolean;
  viewVisit: boolean;
  followUpSteps: number;
  followUpRecord: FollowUpRecord;
}

const initialState: UserState = {
  currentPatient: null,
  tab:0,
  emrSteps: 0,
  visitSteps: 0,
  followUpSteps: 0,
  emr: {
    id: null,
    patient: {},
    obsHistory: {},
    gynecologicalHistory: {},
    medicalHistory: {},
    surgicalHistory: {},
    currentPregnancy: {},
    familyHistory: {},
    personalHistory: {},
    socioEconomicHistory: {},
    trimester: {},
    createdAt: null,
    updatedAt: null,
  },
  visit: {
    id: "",
    patientId: "",
    visitDate: "",
    createdAt: "",
    updatedAt: "",
    vitals: {} as Vitals,
    examination: {} as Examination,
    diagnostics: {} as any,
    proposedPlan: {} as ProposedPlan,
  },
  activeVisit: false,
  viewVisit: false,
  followUpRecord: {
    question1: {},
    question2: {},
    question3: {},
    question4: {},
    question5: {},
  },
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setCurrentPatient: (state, action: PayloadAction<any>) => {
      state.currentPatient = action.payload;
    },
    setTab:(state,action:PayloadAction<number>)=>{
      state.tab=action.payload;
    },

    setEmr: (state, action: PayloadAction<any>) => {
      state.emr = {
        id: action.payload?.id ?? null,
        patient: action.payload?.patient ?? {},
        obsHistory: action.payload?.obsHistory ?? {},
        gynecologicalHistory: action.payload?.gynecologicalHistory ?? {},
        medicalHistory: action.payload?.medicalHistory ?? {},
        surgicalHistory: action.payload?.surgicalHistory ?? {},
        currentPregnancy: action.payload?.currentPregnancy ?? {},
        familyHistory: action.payload?.familyHistory ?? {},
        personalHistory: action.payload?.personalHistory ?? {},
        socioEconomicHistory: action.payload?.socioEconomicHistory ?? {},
        trimester: action.payload?.trimester ?? {},
        createdAt: action.payload?.createdAt ?? null,
        updatedAt: action.payload?.updatedAt ?? null,
      };
    },

    setEmrSteps: (state, action: PayloadAction<number>) => {
      state.emrSteps = action.payload;
    },
    setFollowUpSteps: (state, action: PayloadAction<number>) => {
      state.followUpSteps = action.payload;
    },
    updateEmr: (
      state,
      action: PayloadAction<{
        step: EmrObjectSteps;
        key: string;
        value: any;
      }>,
    ) => {
      const { step, key, value } = action.payload;

      if (!state.emr[step]) {
        state.emr[step] = {};
      }

      state.emr[step]![key] = value;
    },

    setVisit: (state, action: PayloadAction<Partial<VisitS>>) => {
      const payload = action.payload;

      state.visit = {
        id: payload?.id ?? "",
        patientId: payload?.patientId ?? "",
        visitDate: payload?.visitDate ?? "",
        createdAt: payload?.createdAt ?? "",
        updatedAt: payload?.updatedAt ?? "",
        vitals: payload?.vitals ?? ({} as Vitals),
        examination: payload?.examination ?? ({} as Examination),
        diagnostics: payload?.diagnostics ?? {},
        proposedPlan: payload?.proposedPlan ?? ({} as ProposedPlan),
      };
    },
    updateVisit: (
      state,
      action: PayloadAction<{
        step: VisitObjectSteps;
        key: string;
        value: any;
      }>,
    ) => {
      const { step, key, value } = action.payload;

      if (!state.visit[step]) {
        state.visit[step] = {} as any;
      }

      (state.visit[step] as any)[key] = value;
    },

    setActiveVisit: (state, action: PayloadAction<boolean>) => {
      state.activeVisit = action.payload;
    },

    setViewVisit: (state, action: PayloadAction<boolean>) => {
      state.viewVisit = action.payload;
    },

    setVisitSteps: (state, action: PayloadAction<number>) => {
      state.visitSteps = action.payload;
    },

    updateFollowUpRecord: (
      state,
      action: PayloadAction<{
        step: keyof FollowUpRecord;
        key: string;
        value: any;
      }>,
    ) => {
      const { step, key, value } = action.payload;
      if (!state.followUpRecord[step]) {
        state.followUpRecord[step] = {};
      }
      state.followUpRecord[step]![key] = value;
    },

    resetEmr: (state) => {
      state.followUpRecord = {};
      state.emrSteps = 0;
    },
  },
});

export const {
  setCurrentPatient,
  setTab,
  setEmr,
  updateEmr,
  updateFollowUpRecord,
  setEmrSteps,

  setVisit,
  updateVisit,
  setActiveVisit,
  setViewVisit,
  setVisitSteps,

  setFollowUpSteps,
  resetEmr,
} = patientSlice.actions;

export default patientSlice.reducer;
