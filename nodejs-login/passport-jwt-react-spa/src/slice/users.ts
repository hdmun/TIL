import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  message: string;
}

const initialState = {
  message: ''
} as UserState

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload
    },
  },
})

export const { setMessage } = usersSlice.actions
export default usersSlice.reducer
