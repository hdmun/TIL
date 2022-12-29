// reference
// https://github.com/reduxjs/redux/blob/master/examples/counter-ts/src/app/store.ts

import { configureStore } from "@reduxjs/toolkit"
import { authApi } from "./service/authAPI";
import authReducer from "./slice/auth"

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
    ]),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
