// rtk
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// variables
import { BASE_URL, PRODUCTS } from "../../variables/variables";

export const catalogApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: ({ search, count }) => ({
        method: "GET",
        url: `auth/${PRODUCTS}/search?q=${search}&limit=${12 * count}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "application/json",
        },
      }),
    }),
    fetchProduct: builder.query({
      query: (id = 1) => ({
        method: "GET",
        url: `auth/${PRODUCTS}/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "application/json",
        },
      }),
    }),
  }),
});
