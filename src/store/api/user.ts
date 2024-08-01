// rtk
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// variables
import {
  BASE_URL,
  CURRENT_USER,
  LOGIN,
  timeSession,
} from "../../variables/variables";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: { username: string; password: string }) => ({
        url: `/${LOGIN}`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: body.username,
          password: body.password,
          expiresInMins: timeSession,
        }),
      }),
    }),
    fetchCurrentUser: builder.query({
      query: () => ({
        url: `/${CURRENT_USER}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});
