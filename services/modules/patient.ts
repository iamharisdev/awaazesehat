import { persistor, store } from "@/store";
import { api, formHeader } from "../api";
import { errorMessage } from "@/utils/helperFunction";

export const PatientApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Existing endpoint
    listPatients: builder.query({
      query: ({ searchKey = "", page = 1, pageSize = 20 }) => ({
        url: "/patient/search",
        method: "GET",
        params: { searchKey, page, pageSize },
      }),
      transformResponse: (response: any) => response,
      providesTags: ["patients"],
      async onQueryStarted(
        args: { searchKey?: string; page?: number; pageSize?: number },
        { queryFulfilled },
      ) {
        try {
          const { data } = await queryFulfilled;
          // optional store updates
        } catch (e: any) {
          console.error(
            "❌ Patients error:",
            e?.error?.data?.message || e?.error?.error,
          );
        }
      },
    }),

    // 🔹 New: Audio to Text endpoint
    audioToText: builder.mutation<
      { text: string },
      { file: { uri: string; type: string; name: string } }
    >({
      query: ({ file }) => {
        const formData = new FormData();
        console.log("Audio file:", file);
        formData.append("file", file as any); // RN file format
        return {
          url: "/audio-to-text",
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
    }),
  }),
  overrideExisting: true,
});

// Hooks
export const { useListPatientsQuery, useAudioToTextMutation } = PatientApi;
