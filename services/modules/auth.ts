import { persistor, store } from "@/store";
import { api, formHeader } from "../api";
import { errorMessage } from "@/utils/helperFunction";

export const AuthApi = api.injectEndpoints({
  endpoints: (builder: any) => ({
    getCurrentUserData: builder.query({
      query: (url: string) => {
        const _id = "";
        return {
          url: `users/${_id}`,
          method: "get",
        };
      },
      transformResponse: (result: any) => result,
      providesTags: (result: any, error: any, id: any) => [
        { type: "user", id },
      ],
      async onQueryStarted(
        args: any,
        { dispatch, queryFulfilled, getState }: any,
      ) {
        try {
          const { data } = await queryFulfilled;

          dispatch(data);
        } catch (e: any) {
          errorMessage(e?.error?.data?.message || e?.error?.error);
        }
      },
    }),

    registerUser: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: "users/register",
          method: "post",
          body,
          headers: formHeader,
        };
      },
      transformResponse: (result: any) => result,
      async onQueryStarted(
        args: any,
        { dispatch, queryFulfilled, getState }: any,
      ) {
        try {
          const { data } = await queryFulfilled;
        } catch (e: any) {
          errorMessage(e?.error?.data?.message || e?.error?.error);
        }
      },
    }),
    loginUser: builder.mutation({
      query: ({ body }: { body: { email: string; password: string } }) => ({
        url: "user/login", // your backend login route
        method: "POST",
        body,
      }),
      transformResponse: (result: any) => result,
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
