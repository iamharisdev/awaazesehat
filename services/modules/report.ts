import { api } from "../api";
import { errorMessage } from "@/utils/helperFunction";

export const ReportApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllReports: builder.query({
      query: ({ id }) => ({
        url: `/diagnostics/patient/${id}`,
        method: "GET",
      }),

      providesTags: ["reports"],
      async onQueryStarted(
        { id }: { id: string },
        { dispatch, queryFulfilled },
      ) {
        try {
          const { data } = await queryFulfilled;
        } catch (e: any) {
          errorMessage(
            e?.error.message || e?.error || "❌ Reports fetch error",
          );
        }
      },
    }),

    getDoctorNotes: builder.query({
      query: ({ id }) => ({
        url: `/doctor-notes/patient/${id}`,
        method: "GET",
      }),

      providesTags: ["notes"],
      async onQueryStarted(
        { id }: { id: string },
        { dispatch, queryFulfilled },
      ) {
        try {
          const { data } = await queryFulfilled;
        } catch (e: any) {
          errorMessage(
            e?.error.message || e?.error || "❌ Doctor Notes fetch error",
          );
        }
      },
    }),
  }),
  overrideExisting: true,
});

// Hooks
export const { useGetAllReportsQuery, useGetDoctorNotesQuery } = ReportApi;
