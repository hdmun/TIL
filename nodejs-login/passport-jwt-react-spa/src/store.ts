// reference
// https://github.com/reduxjs/redux/blob/master/examples/counter-ts/src/app/store.ts

import { configureStore } from "@reduxjs/toolkit"
import AuthReducer from "./slice/auth"

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
