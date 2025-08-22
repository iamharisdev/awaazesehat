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

const userSlice = createSlice({
  name: 'user',
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
  },
});

export const { setName,setToken,setStatusBar} = userSlice.actions;
export default userSlice.reducer;
