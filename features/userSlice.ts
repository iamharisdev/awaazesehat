import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  token:string;
}

const initialState: UserState = {
  name: '',
  token:'',
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
  },
});

export const { setName,setToken } = userSlice.actions;
export default userSlice.reducer;
