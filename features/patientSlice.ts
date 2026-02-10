import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  emrSteps: number;
  followUpSteps: number;
  followUpRecord: FollowUpRecord;
}

const initialState: UserState = {
  currentPatient: null,
  emrSteps: 0,
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
  setFollowUpSteps,
  resetEmr,
} = patientSlice.actions;

export default patientSlice.reducer;
