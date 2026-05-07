import { api } from "../api";

interface PregnancyDiagnosesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const PregnancyDiagnosesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listPregnancyDiagnoses: builder.query<any, PregnancyDiagnosesParams>({
      query: ({ page = 1, limit = 50, search = "" }) => {
        const params: Record<string, any> = { page, limit };
        if (search && search.trim() !== "") {
          params.search = search.trim();
        }
        return {
          url: "/pregnancy-diagnoses",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: any) => response?.data ?? response,
      providesTags: ["pregnancyDiagnoses"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useListPregnancyDiagnosesQuery,
  useLazyListPregnancyDiagnosesQuery,
} = PregnancyDiagnosesApi;
