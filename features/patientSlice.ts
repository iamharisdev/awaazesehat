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

type VisitS = {
  id: string;
  patientId: string;
  visitDate: string;
  createdAt: string;
  updatedAt: string;
  vitals?: Vitals;
  examination?: Examination;
  diagnostics?: any;
  proposedPlan?: ProposedPlan;
};

export interface Vitals {
  presentingComplaint: string;
  visitId: string;
  bloodPressure: string;
  pulseRate: string;
  temperature: string;
  respiratoryRate: string;
  weight: string;
  visitDate: string;
}

export interface Examination {
  bilateralPedalEdema: string;
  clubbing: string;
  koilonychia: string;
  lymphNodes: string;
  pallor: string;
  spine: string;
  abnormalSpine: string;
  nippleDeformity: string;
  nippleDischarge: string;
  sizeComparison: string;
  swelling: string;
  abdominalWallEdema: string;
  estimatedFetalWeight: string;
  fetalHeartRate: string;
  fundalHeight: string;
  hernialOrfices: string;
  lie: string;
  liquor: string;
  leukonychia: string;
  presentation: string;
  prominentVeins: string;
  pulsations: string;
  scarTenderness: string;
  shapeOfAbdomen: string;
  striae: string;
  umbilicus: string;
  perSpeculumFindings: string;
  perVaginalFindings: string;
  physicalFindings: string;
}

export interface ProposedPlan {
  diagnosisPregnency: string;
  advisedLabTests: labTestEnum[];
  doctorNotes: string;
  nextFollowUpTiming: Date;
  additionalNotes: string;
  generalPlan: string;
  nextFollowUpPurpose: string;
  instructions: string;
  medication: string;
  emrId: string;
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
  emr: emr;
  visit: VisitS;
  visitSteps: number;
  emrSteps: number;
  activeVisit: boolean;
  viewVisit: boolean;
  followUpSteps: number;
  followUpRecord: FollowUpRecord;
}

const initialState: UserState = {
  currentPatient: null,
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
