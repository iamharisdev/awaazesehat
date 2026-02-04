import { setEmr } from "@/features/patientSlice";
import { api } from "../api";

export const EmrApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listEMRs: builder.query({
      query: ({ phoneNumber }) => ({
        url: `emr/getAllEmrsFromPhone/${phoneNumber}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        const { emrs, prevPregnancies } = response;
        return { emrs, prevPregnancies };
      },
      providesTags: ["emr"],
      async onQueryStarted(
        { phoneNumber }: { phoneNumber: string },
        { dispatch, queryFulfilled },
      ) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setEmr(data.emrs[0]));
        } catch (err: any) {
          console.error("❌ EMR fetch error:", err?.error || err?.message);
        }
      },
    }),
  }),
  overrideExisting: true,
});

// Hooks
export const { useListEMRsQuery } = EmrApi;
