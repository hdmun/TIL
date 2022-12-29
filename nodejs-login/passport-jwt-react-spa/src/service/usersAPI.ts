import { createApi } from "@reduxjs/toolkit/dist/query/react"
import baseQueryWithReauth from "./fetchBaseReauth";

interface UsersResponse {
  message: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, null>({
      query: () => ({
        url: `users`,
      })
    }),
  })
})

export const {
  useLazyGetUsersQuery,
} = userApi;
