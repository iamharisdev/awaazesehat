import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  token:string;
  statusBar:string;
}

const initialState: UserState = {
  name: '',
  token:'',
  statusBar:'startup',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setStatusBar:(state, action: PayloadAction<string>) => {
      state.statusBar = action.payload;
    },
    logoutReset: () => initialState,
  },
});

export const { setName, setToken, setStatusBar, logoutReset } = authSlice.actions;
export default authSlice.reducer;
