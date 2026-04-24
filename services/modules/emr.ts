import { setEmr } from "@/features/patientSlice";
import { errorMessage } from "@/utils/helperFunction";
import { api } from "../api";

export const EmrApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listEMRs: builder.query({
      query: ({ patientId }) => ({
        url: `/emr/by-patient-id`,
        method: "GET",
        params: { patientId },
      }),
      // new API returns single EMR object directly (not an array)
      transformResponse: (response: any) => response?.data ?? response,
      providesTags: ["emr"],
      async onQueryStarted(
        _args: { patientId: string },
        { dispatch, queryFulfilled },
      ) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setEmr(data));
        } catch (e: any) {
          errorMessage(e?.error?.message || e?.error || "❌ EMR fetch error");
        }
      },
    }),

    createEmr: builder.mutation({
      query: (body: any) => ({
        url: "/emr/bulk",
        method: "POST",
        body,
      }),
      transformResponse: (result: any) => result?.data ?? result,
      invalidatesTags: ["emr"],
      async onQueryStarted(_args: any, { queryFulfilled }: any) {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (e: any) {
          errorMessage(
            e?.error?.data?.message || e?.error?.error || "Create EMR failed",
          );
        }
      },
    }),

    updateEmr: builder.mutation({
      query: ({ emrId, ...body }: any) => ({
        url: `/emr/${emrId}/bulk`,
        method: "PATCH",
        body,
      }),
      transformResponse: (result: any) => result?.data ?? result,
      invalidatesTags: ["emr"],
      async onQueryStarted(_args: any, { queryFulfilled }: any) {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (e: any) {
          errorMessage(
            e?.error?.data?.message || e?.error?.error || "Update EMR failed",
          );
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useListEMRsQuery, useCreateEmrMutation, useUpdateEmrMutation } =
  EmrApi;
