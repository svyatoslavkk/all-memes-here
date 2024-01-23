import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const GIPHY_API_KEY = "1zlTbIJOzZlKwgt08mHZFRC9QThRhHkL";

export const api = createApi({
  reducerPath: "memesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.giphy.com/v1/`,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTrendingGifs: builder.query({
      query: () => `gifs/trending?api_key=${GIPHY_API_KEY}&limit=20`,
    }),
    getRandomGifs: builder.query({
      query: () => `gifs/random?api_key=${GIPHY_API_KEY}`,
    }),
    getSearchGifs: builder.query({
      query: (searchTerm: string) => `gifs/search?q=${searchTerm}&api_key=${GIPHY_API_KEY}`,
    }),
  }),
});

export const { useGetTrendingGifsQuery, useGetRandomGifsQuery, useGetSearchGifsQuery } = api;
