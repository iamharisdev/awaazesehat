import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logoutReset } from "../features/authSlice";

const development =
  "https://core-server-patient-centric-workflow-1036152259123.asia-southeast1.run.app";

const dev_url = "http://localhost:3000/api/v1/";

const baseQuery = fetchBaseQuery({
  baseUrl: dev_url,

  prepareHeaders: (headers, { getState }) => {
    const { auth } = getState() as any;

    if (auth?.token) {
      headers.set("Authorization", `Bearer ${auth?.token}`);
    }
    headers.set("Accept", "application/json");
    if (!headers?.has) {
      headers.set("Content-Type", "application/json");
    }

    return headers;
  },
});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, baseQueryApi, extraOptions) => {
  let result = await baseQuery(args, baseQueryApi, extraOptions);
  const { dispatch }: any = baseQueryApi;

  console.log(
    "URL:=>   ",
    result?.meta?.request?.url +
      "<=: request :=> " +
      result?.meta?.request?.method,
    "   ======   ",
    JSON.stringify(result?.error),
  );

  if (result?.error?.status === 401) {
    dispatch(logoutReset());
    dispatch(api.util.resetApiState());
  }

  return result;
};
export const formHeader = {
  "Content-Type": "multipart/form-data",
};

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["auth", "patients", "emr", "visit", "labTest", "reports", "notes", "dashboard", "diagnosticTests", "pregnancyDiagnoses"],
  endpoints: () => ({}),
});
