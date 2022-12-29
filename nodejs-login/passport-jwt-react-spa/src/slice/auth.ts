import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  token: string;
}

const initialState = {
  token: ''
} as AuthState

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
  },
})

export const { setToken } = authSlice.actions
export default authSlice.reducer
