import { api } from "../api";

interface DiagnosticTestsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const DiagnosticTestsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listDiagnosticTests: builder.query<any, DiagnosticTestsParams>({
      query: ({ page = 1, limit = 50, search = "" }) => ({
        url: "/diagnostic-tests",
        method: "GET",
        params: { page, limit, search },
      }),
      transformResponse: (response: any) => response?.data ?? response,
      providesTags: ["diagnosticTests"],
    }),
  }),
  overrideExisting: true,
});

export const { useListDiagnosticTestsQuery } = DiagnosticTestsApi;
