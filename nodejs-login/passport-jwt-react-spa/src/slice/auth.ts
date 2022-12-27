import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSignin, fetchSignup, SigninRequest, SignupRequest } from '../service/authAPI';

export const fetchAuthSignup = createAsyncThunk(
  'auth/signup',
  async (dto: SignupRequest, thunkAPI) => {
    try {
      return await fetchSignup(dto);
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const fetchAuthSignin = createAsyncThunk(
  'auth/signin',
  async (dto: SigninRequest, thunkAPI) => {
    try {
      return await fetchSignin(dto);
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

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
  extraReducers: (builder) => {
    builder
    .addCase(fetchAuthSignup.fulfilled, (state, action) => {
      state.token = action.payload.token
    })
    .addCase(fetchAuthSignin.fulfilled, (state, action) => {
      state.token = action.payload.token
    })
  },
})

export const { setToken } = authSlice.actions
export default authSlice.reducer
