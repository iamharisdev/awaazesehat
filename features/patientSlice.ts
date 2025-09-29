import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PatientRecord {
  profile?: Record<string, any>;
  obstetricHistory?: Record<string, any>;
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
  patientRecord: PatientRecord;
  patientRecordSteps: number;
  followUpSteps: number;
  followUpRecord: FollowUpRecord;
}

const initialState: UserState = {
  patientRecordSteps: 0,
  followUpSteps: 0,
  patientRecord: {
    profile: {},
    obstetricHistory: {},
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
    setPatientRecordSteps: (state, action: PayloadAction<number>) => {
      state.patientRecordSteps = action.payload;
    },
    setFollowUpSteps: (state, action: PayloadAction<number>) => {
      state.followUpSteps = action.payload;
    },
    updatePatientRecord: (
      state,
      action: PayloadAction<{
        step: keyof PatientRecord;
        key: string;
        value: any;
      }>
    ) => {
      const { step, key, value } = action.payload;
      if (!state.patientRecord[step]) {
        state.patientRecord[step] = {};
      }
      state.patientRecord[step]![key] = value;
    },
    updateFollowUpRecord: (
      state,
      action: PayloadAction<{
        step: keyof FollowUpRecord;
        key: string;
        value: any;
      }>
    ) => {
      const { step, key, value } = action.payload;
      if (!state.followUpRecord[step]) {
        state.followUpRecord[step] = {};
      }
      state.followUpRecord[step]![key] = value;
    },

    resetPatientRecord: (state) => {
      state.patientRecord = {};
      state.followUpRecord = {};
      state.patientRecordSteps = 0;
    },
  },
});

export const {
  updatePatientRecord,
  updateFollowUpRecord,
  setPatientRecordSteps,
  setFollowUpSteps,
  resetPatientRecord,
} = patientSlice.actions;

export default patientSlice.reducer;
