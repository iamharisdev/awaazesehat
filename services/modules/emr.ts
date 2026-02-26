import { setEmr } from "@/features/patientSlice";
import { api } from "../api";
import { errorMessage } from "@/utils/helperFunction";

export const EmrApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listEMRs: builder.query({
      query: ({ phoneNumber }) => ({
        url: `emr/getAllEmrsFromPhone/${phoneNumber}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        const { emrs, prevPregnancies } = response;
        return { emrs };
      },
      providesTags: ["emr"],
      async onQueryStarted(
        { phoneNumber }: { phoneNumber: string },
        { dispatch, queryFulfilled },
      ) {
        try {
          const { data } = await queryFulfilled;
        console.log("Fetched EMRs:", data.emrs[0]);

          dispatch(setEmr(data.emrs[0]));
        } catch (e: any) {
          errorMessage(e?.error.message || e?.error || "❌ EMR fetch error");
        }
      },
    }),
    createEmr: builder.mutation({
      query: (body: any) => ({
        url: "emr/create", // your backend login route
        method: "POST",
        body,
      }),
      transformResponse: (result: any) => result,
      invalidatesTags: ["emr"],
      async onQueryStarted(args: any, { dispatch, queryFulfilled }: any) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          return data;
        } catch (e: any) {
          errorMessage(
            e?.error?.data?.message || e?.error?.error || "Create new faild",
          );
        }
      },
    }),
    updateEmr: builder.mutation({
      query: (body: any) => ({
        url: "/emr/update", // your backend login route
        method: "Patch",
        body,
      }),
      transformResponse: (result: any) => result,
      invalidatesTags: ["emr"],
      async onQueryStarted(args: any, { dispatch, queryFulfilled }: any) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          return data;
        } catch (e: any) {
          errorMessage(
            e?.error?.data?.message || e?.error?.error || "Update emr failed",
          );
        }
      },
    }),
  }),
  overrideExisting: true,
});

// Hooks
export const { useListEMRsQuery, useCreateEmrMutation, useUpdateEmrMutation } =
  EmrApi;
