import { errorMessage } from "@/utils/helperFunction";
import { api } from "../api";

export const ReportApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllReports: builder.query({
      query: ({ id }) => ({
        url: `/patient-files/patient/${id}`,
        method: "GET",
      }),
      providesTags: ["reports"],
      // new API returns flat FileUploadResponse[] — adapt to existing UI shape [{title, reports:[]}]
      transformResponse: (response: any) => {
        const files: any[] = response?.data ?? response ?? [];
        if (!Array.isArray(files) || files.length === 0) return [];

        const grouped: Record<string, any[]> = {};
        files.forEach((file: any) => {
          const key = file?.description || "Reports";
          if (!grouped[key]) grouped[key] = [];
          grouped[key].push({
            name: file?.fileName || file?.name || "Report",
            uri: file?.fileUrl || file?.uri || "",
            createdAt: file?.createdAt
              ? new Date(file.createdAt).toLocaleDateString()
              : undefined,
          });
        });

        return Object.entries(grouped).map(([title, reports]) => ({
          title,
          reports,
        }));
      },
      async onQueryStarted(_args: { id: string }, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (e: any) {
          errorMessage(
            e?.error?.message || e?.error || "❌ Reports fetch error",
          );
        }
      },
    }),

    getDoctorNotes: builder.query({
      query: ({ id }) => ({
        url: `/patients/${id}/doctor-notes`,
        method: "GET",
      }),
      providesTags: ["notes"],
      // API returns [{title, notes: [{content}]}] — pass through.
      // Also tolerate legacy shape [{visitNumber, doctorNotes}] if encountered.
      transformResponse: (response: any) => {
        const items: any[] = response?.data ?? response ?? [];
        if (!Array.isArray(items) || items.length === 0) return [];

        return items
          .map((item: any) => {
            if (Array.isArray(item?.notes)) {
              return {
                title: item?.title ?? "",
                notes: item.notes
                  .filter((n: any) => n?.content)
                  .map((n: any) => ({ content: n.content })),
              };
            }
            if (item?.doctorNotes) {
              return {
                title: `Visit ${item?.visitNumber ?? ""}`.trim(),
                notes: [{ content: item.doctorNotes }],
              };
            }
            return null;
          })
          .filter(
            (g: any): g is { title: string; notes: { content: string }[] } =>
              !!g && g.notes.length > 0,
          );
      },
      async onQueryStarted(_args: { id: string }, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (e: any) {
          errorMessage(
            e?.error?.message || e?.error || "❌ Doctor Notes fetch error",
          );
        }
      },
    }),

    uploadLabReport: builder.mutation({
      query: ({ patientId, file, description, advisedTestId }: any) => {
        const formData = new FormData();
        formData.append("patientId", String(patientId));
        if (description) formData.append("description", description);
        if (advisedTestId)
          formData.append("advisedTestId", String(advisedTestId));
        formData.append("file", {
          uri: file.uri,
          type: file.mimeType || file.type || "application/pdf",
          name: file.name || "report.pdf",
        } as any);
        return {
          url: `/patient-files/${patientId}/upload-file`,
          method: "POST",
          body: formData,
        };
      },
      transformResponse: (result: any) => result?.data ?? result,
      invalidatesTags: ["reports"],
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (e: any) {
          errorMessage(
            e?.error?.data?.message ||
              e?.error?.error ||
              "Lab report upload failed",
          );
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllReportsQuery,
  useGetDoctorNotesQuery,
  useUploadLabReportMutation,
} = ReportApi;
