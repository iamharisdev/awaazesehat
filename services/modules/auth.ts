import { api } from "../api";
import { errorMessage } from "@/utils/helperFunction";

export const AuthApi = api.injectEndpoints({
  endpoints: (builder: any) => ({
    loginUser: builder.mutation({
      query: ({ body }: { body: { email: string; password: string } }) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      transformResponse: (result: any) => result,
      providesTags: ["auth"],
      async onQueryStarted(_args: any, { queryFulfilled }: any) {
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

    logoutUser: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_args: any, { queryFulfilled }: any) {
        try {
          await queryFulfilled;
        } catch (e: any) {
          errorMessage(
            e?.error?.data?.message || e?.error?.error || "Logout failed",
          );
        }
      },
    }),

    forgotPassword: builder.mutation({
      query: (body: { email: string }) => ({
        url: "auth/forgot-password",
        method: "POST",
        body,
      }),
      async onQueryStarted(_args: any, { queryFulfilled }: any) {
        try {
          await queryFulfilled;
        } catch (e: any) {
          errorMessage(
            e?.error?.data?.message || e?.error?.error || "Failed to send OTP",
          );
        }
      },
    }),

    verifyOtp: builder.mutation({
      query: (body: { email: string; otp: string }) => ({
        url: "auth/verify-otp",
        method: "POST",
        body,
      }),
      async onQueryStarted(_args: any, { queryFulfilled }: any) {
        try {
          await queryFulfilled;
        } catch (e: any) {
          errorMessage(
            e?.error?.data?.message || e?.error?.error || "Invalid OTP",
          );
        }
      },
    }),

    resetPassword: builder.mutation({
      query: (body: { email: string; otp: string; newPassword: string }) => ({
        url: "auth/reset-password",
        method: "POST",
        body,
      }),
      async onQueryStarted(_args: any, { queryFulfilled }: any) {
        try {
          await queryFulfilled;
        } catch (e: any) {
          errorMessage(
            e?.error?.data?.message ||
              e?.error?.error ||
              "Password reset failed",
          );
        }
      },
    }),

    resendOtp: builder.mutation({
      query: (body: { email: string }) => ({
        url: "auth/resend-otp",
        method: "POST",
        body,
      }),
      async onQueryStarted(_args: any, { queryFulfilled }: any) {
        try {
          await queryFulfilled;
        } catch (e: any) {
          errorMessage(
            e?.error?.data?.message ||
              e?.error?.error ||
              "Failed to resend OTP",
          );
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useResendOtpMutation,
} = AuthApi;
