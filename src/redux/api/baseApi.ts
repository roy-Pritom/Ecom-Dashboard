import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3003/api/v1",
    credentials: "include",
  }),
  tagTypes: ["category", "course", "enroll", "sales","product","order"],
  endpoints: () => ({}),
});
