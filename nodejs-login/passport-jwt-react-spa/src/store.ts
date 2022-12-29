// reference
// https://github.com/reduxjs/redux/blob/master/examples/counter-ts/src/app/store.ts

import { configureStore } from "@reduxjs/toolkit"
import { authApi } from "./service/authAPI";
import { userApi } from "./service/usersAPI";
import authReducer from "./slice/auth"
import userReducer from "./slice/users"

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
    ]),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
