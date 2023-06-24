import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import { City, Doctor, Speciality } from '../../models'

export const todoApi = createApi({
  reducerPath: 'todo/api',
  tagTypes: ['Todos'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://run.mocky.io/v3'
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    fetchCities: build.query<City[], void>({
      query: () => ({
        url: '/9fcb58ca-d3dd-424b-873b-dd3c76f000f4'
      })
    }),
    fetchSpecialities: build.query<Speciality[], void>({
      query: () => ({
        url: '/e8897b19-46a0-4124-8454-0938225ee9ca'
      })
    }),
    fetchDoctors: build.query<Doctor[], void>({
      query: () => ({
        url: '/3d1c993c-cd8e-44c3-b1cb-585222859c21'
      })
    })
  })
})

export const {useLazyFetchCitiesQuery, useFetchCitiesQuery, useLazyFetchSpecialitiesQuery, useFetchSpecialitiesQuery, useLazyFetchDoctorsQuery, useFetchDoctorsQuery} = todoApi
