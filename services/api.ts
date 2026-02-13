import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const dev_url = "http://192.168.18.84:8000/";

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
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const { dispatch, endpoint, getState }: any = api;

  console.log(
    "URL:=>   ",
    result?.meta?.request?.url +
      "<=: request :=> " +
      result?.meta?.request?.method,
    "   ======   ",
    JSON.stringify(result?.error),
  );
  return result;
};
export const formHeader = {
  "Content-Type": "multipart/form-data",
};

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["auth", "patients", "emr","visit"],
  endpoints: () => ({}),
});
