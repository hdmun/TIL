import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setToken } from '../slice/auth';
import baseQueryWithReauth from './fetchBaseReauth';

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface SignupResponse {
  token: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface SigninResponse {
  token: string;
}

// https://velog.io/@defaultkyle/rtk-query-1#rtk-query-essentials
// https://redux-toolkit.js.org/rtk-query/usage/examples

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (body: SignupRequest) => ({
        url: 'auth/register',
        method: 'POST',
        body
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await dispatch(setToken(data.token));
        } catch (error) {
          console.log(error);
          // todo: handling
        }
      },
    }),
    signin: builder.mutation<SigninResponse, SigninRequest>({
      query: (body: SigninRequest) => ({
        url: 'auth/login',
        method: 'POST',
        body
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await dispatch(setToken(data.token));
        } catch (error) {
          console.log(error);
          // todo: handling
        }
      },
    }),
    silent: builder.mutation<SigninResponse, null>({
      query: (_body) => ({
        url: 'auth/silent',
        method: 'POST',
      })
    })
  })
})

export const {
  useSignupMutation,
  useSigninMutation,
} = authApi
