import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

import { RootState } from '../store'
import { setToken } from '../slice/auth'


interface SilentResponse {
  token: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3001/',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
  credentials: 'include',
})

function hasToken(data?: unknown): data is SilentResponse {
  return typeof data === 'object' && !!data && 'token' in data
}

// 인증에 실패 했을 때만 락 잡는다
// 토큰 재발행 중복 요청을 막기 위해
// https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#automatic-re-authorization-by-extending-fetchbasequery

const mutex = new Mutex()

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()

  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshResult = await baseQuery(
          '/auth/silent',
          api,
          extraOptions
        )

        if (hasToken(refreshResult.data)) {
          api.dispatch(setToken(refreshResult.data.token))
          result = await baseQuery(args, api, extraOptions)
        } else {
          console.log(refreshResult)
          // api call logout
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()

      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}

export default baseQueryWithReauth;
