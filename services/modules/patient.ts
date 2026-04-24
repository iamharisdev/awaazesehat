import { errorMessage } from "@/utils/helperFunction";
import { api } from "../api";

interface PatientListParams {
  search?: string;
  page?: number;
  limit?: number;
}

interface AudioFile {
  uri: string;
  type: string;
  name: string;
}

export const PatientApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listPatients: builder.query<any, PatientListParams>({
      query: ({ search = "", page = 1, limit = 20 }) => ({
        url: "/patients/eligible",
        method: "GET",
        params: { search, page, limit },
      }),
      transformResponse: (response: any) => response,
      providesTags: ["patients"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (e: any) {
          console.error(
            "❌ Patients error:",
            e?.error?.data?.message || e?.error?.error,
          );
        }
      },
    }),

    getPatient: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/patients/${id}`,
        method: "GET",
      }),
      providesTags: ["patients"],
    }),

    audioToText: builder.mutation<{ text: string }, { file: AudioFile }>({
      query: ({ file }) => {
        const formData = new FormData();
        formData.append("file", {
          uri: file.uri,
          type: file.type,
          name: file.name,
        } as any);
        return {
          url: "/audio-to-text",
          method: "POST",
          body: formData,
        };
      },
    }),

    createPatient: builder.mutation({
      query: (body: any) => ({
        url: "/patients",
        method: "POST",
        body,
      }),
      transformResponse: (result: any) => result,
      invalidatesTags: ["patients"],
      async onQueryStarted(_args: any, { queryFulfilled }: any) {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (e: any) {
          errorMessage(
            e?.error?.data?.error || e?.error?.error || "Create patient failed",
          );
        }
      },
    }),

    updatePatient: builder.mutation({
      query: ({ id, ...body }: any) => ({
        url: `/patients/${id}`,
        method: "PATCH",
        body,
      }),
      transformResponse: (result: any) => result,
      invalidatesTags: ["patients"],
      async onQueryStarted(_args: any, { queryFulfilled }: any) {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (e: any) {
          errorMessage(
            e?.error?.data?.message ||
              e?.error?.error ||
              "Update patient failed",
          );
        }
      },
    }),
  }),

  overrideExisting: true,
});

export const {
  useListPatientsQuery,
  useGetPatientQuery,
  useAudioToTextMutation,
  useCreatePatientMutation,
  useUpdatePatientMutation,
} = PatientApi;
