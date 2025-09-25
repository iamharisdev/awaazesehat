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

interface UserState {
  patientRecord: PatientRecord;
  patientRecordSteps: number;
}

const initialState: UserState = {
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
  patientRecordSteps: 0,
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    // ✅ merge step data instead of replacing
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
    setPatientRecordSteps: (state, action: PayloadAction<number>) => {
      state.patientRecordSteps = action.payload;
    },
    resetPatientRecord: (state) => {
      state.patientRecord = {};
      state.patientRecordSteps = 0;
    },
  },
});

export const {
  updatePatientRecord,
  setPatientRecordSteps,
  resetPatientRecord,
} = patientSlice.actions;

export default patientSlice.reducer;
