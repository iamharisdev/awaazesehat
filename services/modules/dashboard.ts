import { api } from "../api";
import { errorMessage } from "@/utils/helperFunction";

export interface TrimesterData {
  count: number;
  percentage: number;
}

export interface PatientOverviewResponse {
  totalPatients: string;
  scheduledFollowupAppointments: number;
  highRiskPregnancy: number;
  patientsInThirdTrimester: number;
  missedAncVisits: number;
  expectedDeliveriesThisMonth: number;
  trimesterDistribution: {
    firstTrimester: TrimesterData;
    secondTrimester: TrimesterData;
    thirdTrimester: TrimesterData;
  };
}

export interface PatientProfileOverviewVitals {
  bloodPressure: string;
  pulseRate: string;
  temperature: string;
  respiratoryRate: string;
  weight: string;
  visitDate: string;
}

export interface PatientProfileOverviewResponse {
  name: string;
  age: string;
  bloodGroup: string;
  gravidaPara: string;
  lmp: string;
  expectedDeliveryDate: string;
  lastUltrasoundDate: string;
  medications: string;
  presentingComplaint: string;
  vitals: PatientProfileOverviewVitals;
}

export interface OverviewSummaryResponse {
  totalVisits: string;
  attendance: string;
  missedVisits: string;
  emrSummary: string;
  latestVisitDate: string;
}

export const DashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPatientOverview: builder.query<PatientOverviewResponse, void>({
      query: () => ({
        url: "/dashboard/patient-overview",
        method: "GET",
      }),
      providesTags: ["dashboard"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (e: any) {
          errorMessage(
            e?.error?.data?.message ||
              e?.error?.error ||
              "Dashboard fetch error",
          );
        }
      },
    }),

    getPatientProfileOverview: builder.query<
      PatientProfileOverviewResponse,
      { patientId: string }
    >({
      query: ({ patientId }) => ({
        url: `/patients/${patientId}/clinical-overview`,
        method: "GET",
      }),
      providesTags: ["dashboard"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (e: any) {
          errorMessage(
            e?.error?.data?.message ||
              e?.error?.error ||
              "Patient overview fetch error",
          );
        }
      },
    }),

    getOverviewSummary: builder.query<
      OverviewSummaryResponse,
      { patientId: string }
    >({
      query: ({ patientId }) => ({
        url: `/patients/${patientId}/visit-summary`,
        method: "GET",
      }),
      providesTags: ["dashboard"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (e: any) {
          errorMessage(
            e?.error?.data?.message ||
              e?.error?.error ||
              "Overview summary fetch error",
          );
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetPatientOverviewQuery,
  useGetPatientProfileOverviewQuery,
  useGetOverviewSummaryQuery,
} = DashboardApi;
