import { persistor, store } from "@/store";
import { api, formHeader } from "../api";
import { errorMessage } from "@/utils/helperFunction";

export const AuthApi = api.injectEndpoints({
  endpoints: (builder: any) => ({
    loginUser: builder.mutation({
      query: ({ body }: { body: { email: string; password: string } }) => ({
        url: "user/login", // your backend login route
        method: "POST",
        body,
      }),
      transformResponse: (result: any) => result,
      providesTags: ["auth"],
      async onQueryStarted(args: any, { dispatch, queryFulfilled }: any) {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (e: any) {
          errorMessage(
            e?.error?.data?.message || e?.error?.error || "Login failed",
          );
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useLoginUserMutation } = AuthApi;
