import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  patientRecord: object;
}

const initialState: UserState = {
  patientRecord: {},
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatientRecord: (state, action: PayloadAction<object>) => {
      state.patientRecord = action.payload;
    },
  },
});

export const { setPatientRecord } = patientSlice.actions;
export default patientSlice.reducer;
