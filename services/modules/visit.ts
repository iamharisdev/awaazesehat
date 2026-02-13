import { setEmr, setVisit } from "@/features/patientSlice";
import { api } from "../api";
import { errorMessage } from "@/utils/helperFunction";

export const visitApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listVisits: builder.query({
      query: ({ id }) => ({
        url: `/visits?patientId=${id}`,
        method: "GET",
      }),

      providesTags: ["visit"],
      async onQueryStarted(
        { id }: { id: string },
        { dispatch, queryFulfilled },
      ) {
        try {
          const { data } = await queryFulfilled;
        } catch (e: any) {
          errorMessage(e?.error.message || e?.error || "❌ EMR fetch error");
        }
      },
    }),
    VisitDetail: builder.query({
      query: ({ id }) => ({
        url: `visits/${id}`,
        method: "GET",
      }),

      providesTags: ["visit"],
      async onQueryStarted(
        { id }: { id: string },
        { dispatch, queryFulfilled },
      ) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            setVisit({
              ...data,
              vitals: data.vitals ?? {},
              examination: data.examination ?? {},
              diagnostics: data.diagnostics ?? {},
              proposedPlan: data.proposedPlan ?? {},
            }),
          );
        } catch (e: any) {
          errorMessage(e?.error.message || e?.error || "❌ EMR fetch error");
        }
      },
    }),
    // createvisit: builder.mutation({
    //   query: (body: any) => ({
    //     url: "emr/create", // your backend login route
    //     method: "POST",
    //     body,
    //   }),
    //   transformResponse: (result: any) => result,
    //   invalidatesTags: ["emr"],
    //   async onQueryStarted(args: any, { dispatch, queryFulfilled }: any) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       console.log(data);
    //       return data;
    //     } catch (e: any) {
    //       errorMessage(
    //         e?.error?.data?.message || e?.error?.error || "Create new faild",
    //       );
    //     }
    //   },
    // }),
    // updateVisit: builder.mutation({
    //   query: (body: any) => ({
    //     url: "/emr/update", // your backend login route
    //     method: "Patch",
    //     body,
    //   }),
    //   transformResponse: (result: any) => result,
    //   invalidatesTags: ["emr"],
    //   async onQueryStarted(args: any, { dispatch, queryFulfilled }: any) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       console.log(data);
    //       return data;
    //     } catch (e: any) {
    //       errorMessage(
    //         e?.error?.data?.message || e?.error?.error || "Update emr failed",
    //       );
    //     }
    //   },
    // }),
  }),
  overrideExisting: true,
});

// Hooks
export const {
  useListVisitsQuery,
  useLazyVisitDetailQuery,
  //   useCreatevisitMutation,
  //   useUpdateVisitMutation,
} = visitApi;
