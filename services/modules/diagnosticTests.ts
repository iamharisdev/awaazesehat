import { api } from "../api";

interface DiagnosticTestsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const DiagnosticTestsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listDiagnosticTests: builder.query<any, DiagnosticTestsParams>({
      query: ({ page = 1, limit = 20, search = "" }) => {
        const params: Record<string, any> = { page, limit };
        if (search && search.trim() !== "") {
          params.search = search.trim();
        }
        return {
          url: "/diagnostic-tests",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: any) => {
        // PaginatedResponse shape: { success, data: [...], pagination: { page, limit, total, totalPages } }
        if (response?.pagination) {
          return {
            data: Array.isArray(response.data) ? response.data : [],
            total: response.pagination.total ?? 0,
            totalPages: response.pagination.totalPages ?? 1,
          };
        }
        // Fallback ApiResponse wrapping: { data: { data: [...], total } }
        const inner = response?.data ?? response;
        return {
          data: Array.isArray(inner?.data)
            ? inner.data
            : Array.isArray(inner)
              ? inner
              : [],
          total: inner?.total ?? 0,
          totalPages: inner?.totalPages ?? 1,
        };
      },
      providesTags: ["diagnosticTests"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useListDiagnosticTestsQuery,
  useLazyListDiagnosticTestsQuery,
} = DiagnosticTestsApi;
