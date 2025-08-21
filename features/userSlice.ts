import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  token:string;
  isStatus:string;
}

const initialState: UserState = {
  name: '',
  token:'',
  isStatus:'startup',
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
    setIsStatus:(state, action: PayloadAction<string>) => {
      state.isStatus = action.payload;
    },
  },
});

export const { setName,setToken,setIsStatus} = userSlice.actions;
export default userSlice.reducer;
