import { errorMessage } from "@/utils/helperFunction";
import { api } from "../api";

interface PatientListParams {
  searchKey?: string;
  page?: number;
  pageSize?: number;
}

interface AudioFile {
  uri: string;
  type: string;
  name: string;
}

export const PatientApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 List Patients
    listPatients: builder.query<any, PatientListParams>({
      query: ({ searchKey = "", page = 1, pageSize = 20 }) => ({
        url: "/patient/search",
        method: "GET",
        params: { searchKey, page, pageSize },
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

    // 🔹 Audio to Text
    audioToText: builder.mutation<{ text: string }, { file: AudioFile }>({
      query: ({ file }) => {
        const formData = new FormData();

        console.log("🎙 Audio file:", file);

        formData.append("file", {
          uri: file.uri,
          type: file.type,
          name: file.name,
        } as any);

        return {
          url: "/audio-to-text",
          method: "POST",
          body: formData,
          // ❌ DO NOT set Content-Type manually in React Native
        };
      },
    }),

    // 🔹 Create new patient
    createPatient: builder.mutation({
      query: (body: any) => ({
        url: "patient", // your backend login route
        method: "POST",
        body,
      }),
      transformResponse: (result: any) => result,
      invalidatesTags: ["patients"],
      async onQueryStarted(args: any, { dispatch, queryFulfilled }: any) {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (e: any) {
         
          errorMessage(
            e?.error?.data?.error || e?.error?.error || "Create new faild",
          );
        }
      },
    }),
    updatePatient: builder.mutation({
      query: (body: any) => ({
        url: "patient", // your backend login route
        method: "PUT",
        body,
      }),
      transformResponse: (result: any) => result,
      invalidatesTags: ["patients"],
      async onQueryStarted(args: any, { dispatch, queryFulfilled }: any) {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (e: any) {
          errorMessage(
            e?.error?.data?.message || e?.error?.error || "Create new faild",
          );
        }
      },
    }),
  }),

  overrideExisting: true,
});

// Hooks
export const {
  useListPatientsQuery,
  useAudioToTextMutation,
  useCreatePatientMutation,
  useUpdatePatientMutation,
} = PatientApi;
