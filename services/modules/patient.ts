import { persistor, store } from "@/store";
import { api, formHeader } from "../api";
import { errorMessage } from "@/utils/helperFunction";

export const PatientApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listPatients: builder.query({
      query: ({ searchKey = "", page = 1, pageSize = 20 }) => ({
        url: "/patient/search",
        method: "GET",
        params: { searchKey, page, pageSize },
      }),
      transformResponse: (response: any) => response,
      providesTags: ["patients"],

      async onQueryStarted(
        args: { searchKey?: string; page?: number; pageSize?: number },
        { queryFulfilled },
      ) {
        try {
          const { data } = await queryFulfilled;
          // optional: you can handle store updates here if needed
        } catch (e: any) {
          console.error(
            "❌ Patients error:",
            e?.error?.data?.message || e?.error?.error,
          );
        }
      },
    }),
  }),
  overrideExisting: true,
});

// Hooks
export const { useListPatientsQuery } = PatientApi;
