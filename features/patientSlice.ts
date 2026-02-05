import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface emr {
  patient?: Record<string, any>;
  obsHistory?: Record<string, any>;
  gynecologicalHistory?: Record<string, any>;
  pastMedicalHistory?: Record<string, any>;
  surgicalHistory?: Record<string, any>;
  currentPregnancy?: Record<string, any>;
  familyHistory?: Record<string, any>;
  personalHistory?: Record<string, any>;
  socioEconomicHistory?: Record<string, any>;
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
    patient: {},
    obsHistory: {},
    gynecologicalHistory: {},
    pastMedicalHistory: {},
    surgicalHistory: {},
    currentPregnancy: {},
    familyHistory: {},
    personalHistory: {},
    socioEconomicHistory: {},
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
      state.emr = action.payload;
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
        step: keyof emr;
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
      state.emr = {};
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
