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

    labTests: builder.query({
      query: ({ patientId }) => ({
        url: `/visits/${patientId}/advised-tests`,
        method: "GET",
      }),

      providesTags: ["labTest"],
      transformResponse: (response: any) => {
        const { advisedTests } = response;
        return { advisedTests };
      },
      async onQueryStarted(
        { id }: { id: string },
        { dispatch, queryFulfilled },
      ) {
        try {
          const { data } = await queryFulfilled;
        } catch (e: any) {
          errorMessage(
            e?.error.message || e?.error || "❌ LAB Test fetch error",
          );
        }
      },
    }),

    VisitDetail: builder.query({
      query: ({ id }) => ({
        url: `visits/${id}`,
        method: "GET",
      }),

      transformResponse: (result: any) => {
        let temp = {
          ...result,
          proposedPlan: {
            ...result?.proposedPlan,
            advisedLabTests: (result?.proposedPlan?.advisedLabTests || []).join(","),
          },
        };
        return temp;
      },
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

    uploadPatientFile: builder.mutation({
      query: ({ patientId, file, description = "Lab Test Report" }) => {
        const formData = new FormData();

        formData.append("patientId", String(patientId));
        formData.append("description", description);

        formData.append("file", {
          uri: file.uri,
          type: file.mimeType || "application/pdf",
          name: file.name || "upload.pdf",
        } as any);

        return {
          url: "files/upload",
          method: "POST",
          body: formData,
        };
      },

      transformResponse: (result: any) => {
        if (!result?.fileUrl) {
          throw new Error("File upload failed: Missing fileUrl in response");
        }
        return result;
      },

      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          return data;
        } catch (e: any) {
          errorMessage(
            e?.error?.data?.message || e?.error?.error || "File upload failed",
          );
        }
      },
    }),

    deletePatientFile: builder.mutation<void, { fileId: string }>({
      query: ({ fileId }) => ({
        url: `files/${fileId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["labTest"],

      async onQueryStarted(args, { queryFulfilled }) {
        try {
          await queryFulfilled;
          console.log("File deleted successfully");
        } catch (e: any) {
          errorMessage(
            e?.error?.data?.message ||
              e?.error?.error ||
              "Failed to delete file",
          );
        }
      },
    }),

    createVisit: builder.mutation({
      query: (body: any) => ({
        url: "visits", // your backend login route
        method: "POST",
        body,
      }),
      transformResponse: (result: any) => result,
      invalidatesTags: ["visit"],
      async onQueryStarted(args: any, { dispatch, queryFulfilled }: any) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          return data;
        } catch (e: any) {
          errorMessage(
            e?.error?.data?.message ||
              e?.error?.error ||
              "Create new visit faild",
          );
        }
      },
    }),
    updateVisit: builder.mutation({
      query: (body: any) => ({
        url: `/visits/${body.visitId}`, // your backend login route
        method: "Patch",
        body,
      }),
      transformResponse: (result: any) => result,
      invalidatesTags: ["visit"],
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
export const {
  useListVisitsQuery,
  useLazyVisitDetailQuery,
  useLazyLabTestsQuery,
  useUploadPatientFileMutation,
  useDeletePatientFileMutation,
  useCreateVisitMutation,
  useUpdateVisitMutation,
} = visitApi;
