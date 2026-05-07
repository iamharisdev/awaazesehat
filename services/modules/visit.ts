import { setVisit } from "@/features/patientSlice";
import { errorMessage } from "@/utils/helperFunction";
import { api } from "../api";

export const visitApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listVisits: builder.query({
      query: ({ id }) => ({
        url: `/visits?patientId=${id}`,
        method: "GET",
      }),
      providesTags: ["visit"],
      transformResponse: (response: any) => {
        const visits = response?.data ?? response;
        return Array.isArray(visits) ? visits : [];
      },
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (e: any) {
          errorMessage(e?.error?.message || e?.error || "❌ Visits fetch error");
        }
      },
    }),

    labTests: builder.query({
      query: ({ patientId }) => ({
        url: `/visits/advised-tests/patient/${patientId}/not-submitted`,
        method: "GET",
      }),
      providesTags: ["labTest"],
      transformResponse: (response: any) => {
        const advisedTests =
          response?.data ?? response?.advisedTests ?? response ?? [];
        return {
          advisedTests: Array.isArray(advisedTests) ? advisedTests : [],
        };
      },
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (e: any) {
          errorMessage(
            e?.error?.message || e?.error || "❌ Lab tests fetch error",
          );
        }
      },
    }),

    VisitDetail: builder.query({
      query: ({ id }) => ({
        url: `/visits/${id}/full-data`,
        method: "GET",
      }),
      transformResponse: (result: any) => {
        const visit = result?.data ?? result;
        return {
          ...visit,
          proposedPlan: {
            ...visit?.proposedPlan,
            advisedLabTests: (
              visit?.proposedPlan?.advisedLabTests || []
            ).join(","),
          },
          advisedTests: Array.isArray(visit?.advisedTests)
            ? visit.advisedTests
            : [],
        };
      },
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setVisit({
              ...data,
              id: data?.id ?? id, // fallback to query arg if API omits id
              vitals: data.vitals ?? {},
              examination: data.examination ?? {},
              diagnostics: data.diagnostics ?? {},
              proposedPlan: data.proposedPlan ?? {},
              advisedTests: data.advisedTests ?? [],
            }),
          );
        } catch (e: any) {
          errorMessage(
            e?.error?.message || e?.error || "❌ Visit detail error",
          );
        }
      },
    }),

    uploadPatientFile: builder.mutation({
      query: ({
        patientId,
        file,
        description = "Lab Test Report",
        advisedTestId,
      }) => {
        const formData = new FormData();
        formData.append("patientId", String(patientId));
        formData.append("description", description);
        if (advisedTestId) {
          formData.append("advisedTestId", String(advisedTestId));
        }
        formData.append("file", {
          uri: file.uri,
          type: file.mimeType || "application/pdf",
          name: file.name || "upload.pdf",
        } as any);
        return {
          url: `/patient-files/${patientId}/upload-file`,
          method: "POST",
          body: formData,
        };
      },
      transformResponse: (result: any) => {
        const data = result?.data ?? result;
        if (!data?.fileUrl) {
          throw new Error("File upload failed: Missing fileUrl in response");
        }
        return data;
      },
      async onQueryStarted(_args, { queryFulfilled }) {
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

    uploadAdvisedTest: builder.mutation({
      query: ({ visitId, file, diagnosticTestId, status = "submitted" }) => {
        const formData = new FormData();
        formData.append("diagnosticTestId", String(diagnosticTestId));
        formData.append("status", status);
        formData.append("file", {
          uri: file.uri,
          type: file.mimeType || "application/pdf",
          name: file.name || "upload.pdf",
        } as any);
        return {
          url: `/visits/${visitId}/advised-tests`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["labTest"],
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (e: any) {
          errorMessage(
            e?.error?.data?.message ||
              e?.error?.error ||
              "Advised test upload failed",
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
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled;
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
        url: "/visits/bulk",
        method: "POST",
        body,
      }),
      transformResponse: (result: any) => result?.data ?? result,
      invalidatesTags: ["visit"],
      async onQueryStarted(_args: any, { queryFulfilled }: any) {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (e: any) {
          errorMessage(
            e?.error?.data?.message ||
              e?.error?.error ||
              "Create visit failed",
          );
        }
      },
    }),

    updateVisit: builder.mutation({
      query: ({ visitId, ...body }: any) => ({
        url: `/visits/${visitId}/bulk`,
        method: "PATCH",
        body,
      }),
      transformResponse: (result: any) => result?.data ?? result,
      invalidatesTags: ["visit"],
      async onQueryStarted(_args: any, { queryFulfilled }: any) {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (e: any) {
          errorMessage(
            e?.error?.data?.message ||
              e?.error?.error ||
              "Update visit failed",
          );
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useListVisitsQuery,
  useLazyVisitDetailQuery,
  useLazyLabTestsQuery,
  useUploadPatientFileMutation,
  useUploadAdvisedTestMutation,
  useDeletePatientFileMutation,
  useCreateVisitMutation,
  useUpdateVisitMutation,
} = visitApi;
