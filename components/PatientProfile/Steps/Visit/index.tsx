import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Icons } from "@/assets/svgs";
import AppHeader from "@/components/AppHeader";
import BottomSheet from "@/components/BottomSheet";
import KeyboardAvoidingWrapper from "@/components/KeyboardAvoidingWrapper";
import StepProgressBar from "@/components/StepProgressBar";
import {
  Diagnostics as LabTests,
  PhysicalExamination,
  PatientVital,
  TreatmentPlan,
  VisitList,
} from "@/components/VisitSteps";
import { setVisitSteps } from "@/features/patientSlice";
import type {
  AdvisedTest,
  PregnancyDiagnosis,
} from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useTranslation } from "react-i18next";
import { styles } from "./style";
import {
  useCreateVisitMutation,
  useUpdateVisitMutation,
} from "@/services/modules/visit";
import AppLoader from "@/components/AppLoader";
import {
  validateVitals,
  validateExamination,
  validateTreatmentPlan,
} from "@/utils/visitValidator";
import { cleanPayload } from "@/utils/helperFunction";

const Visit = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const sheetRef = useRef<any>(null);

  const {
    visitSteps,
    visit,
    currentPatient: { id },
  } = useAppSelector((s) => s.patient);

  const [createVisit, { isLoading: createLoading }] = useCreateVisitMutation();
  const [updateVisit, { isLoading: updateLoading }] = useUpdateVisitMutation();
  const isLoading = createLoading || updateLoading;

  const [vitalsErrors, setVitalsErrors] = useState<Record<string, string>>({});
  const [examinationErrors, setExaminationErrors] = useState<
    Record<string, string>
  >({});
  const [treatmentErrors, setTreatmentErrors] = useState<Record<string, string>>(
    {},
  );
  const [examinationType, setExaminationType] = useState<string>(
    "Structured Fields",
  );

  // Lab tests local state — initialised by VisitList based on edit/create mode
  const [tests, setTests] = useState<AdvisedTest[]>([]);
  const [nextVisitNumber, setNextVisitNumber] = useState<number>(1);

  // Mode is set by which button the user clicks in VisitList:
  //   "Add Visit"  -> "create"
  //   "Edit"       -> "edit"
  const [mode, setMode] = useState<"create" | "edit">("create");
  const editable = mode === "edit";

  const stepScreens = [
    { key: "Vitials", component: <PatientVital errors={vitalsErrors} /> },
    {
      key: "Examination",
      component: (
        <PhysicalExamination
          errors={examinationErrors}
          onTypeChange={setExaminationType}
        />
      ),
    },
    {
      key: "LabTests",
      component: (
        <LabTests tests={tests} setTests={setTests} isEdit={editable} />
      ),
    },
    {
      key: "Treatment Plan",
      component: <TreatmentPlan errors={treatmentErrors} />,
    },
  ];

  const totalSteps = stepScreens.length;

  const handleApi = async () => {
    const toYMD = (d: any): string => {
      const date = d ? new Date(d) : new Date();
      const valid = !isNaN(date.getTime()) ? date : new Date();
      return valid.toISOString().split("T")[0];
    };

    const vitalsPayload = cleanPayload(visit?.vitals ?? {});
    const examPayload = cleanPayload(visit?.examination ?? {});

    const plan = visit?.proposedPlan ?? ({} as any);

    // Convert PregnancyDiagnosis[] to ID array
    const { diagnosisPregnancy, advisedLabTests: _legacy, ...restPlan } = plan;

    const diagnosisIds: string[] = Array.isArray(diagnosisPregnancy)
      ? diagnosisPregnancy.map((d: any) => (typeof d === "string" ? d : d?.id))
          .filter(Boolean)
      : [];

    const planPayload = cleanPayload({
      ...restPlan,
      ...(restPlan?.nextFollowUpTiming && {
        nextFollowUpTiming: toYMD(restPlan.nextFollowUpTiming),
      }),
      ...(diagnosisIds.length > 0 && { diagnosisPregnancy: diagnosisIds }),
    });

    // Selected diagnostic tests → advisedTests payload
    const selectedTests = Array.isArray(visit?.advisedTests)
      ? visit.advisedTests
      : [];
    const advisedTestsPayload = selectedTests
      .filter((t: AdvisedTest) => !!t?.id)
      .map((t: AdvisedTest) => ({
        diagnosticTestId: t.id,
        status: t.status || "not_submitted",
      }));

    const presentingComplaint = visit?.vitals?.presentingComplaint || "";
    const visitDate = toYMD((visit?.vitals as any)?.visitDate);

    let res: any;

    if (editable) {
      res = await updateVisit({
        visitId: visit.id,
        visit: cleanPayload({
          visitNumber: visit.visitNumber,
          visitDate,
          chiefComplaint: presentingComplaint,
        }),
        vitals: vitalsPayload,
        examination: examPayload,
        proposedPlan: planPayload,
        ...(advisedTestsPayload.length > 0 && {
          advisedTests: advisedTestsPayload,
        }),
      });
    } else {
      res = await createVisit({
        visit: cleanPayload({
          patientId: id ?? null,
          visitNumber: nextVisitNumber,
          visitDate,
          chiefComplaint: presentingComplaint,
        }),
        vitals: vitalsPayload,
        examination: examPayload,
        proposedPlan: planPayload,
        ...(advisedTestsPayload.length > 0 && {
          advisedTests: advisedTestsPayload,
        }),
      });
    }

    if (res?.data) {
      sheetRef?.current.close();
    }
  };

  const onPressNext = () => {
    if (visitSteps === 0) {
      const errors = validateVitals(visit?.vitals);
      setVitalsErrors(errors);
      if (Object.keys(errors).length > 0) return;
    }

    if (visitSteps === 1) {
      const errors = validateExamination(visit?.examination, examinationType);
      setExaminationErrors(errors);
      if (Object.keys(errors).length > 0) return;
    }

    if (visitSteps === 3) {
      const errors = validateTreatmentPlan(visit?.proposedPlan);
      setTreatmentErrors(errors);
      if (Object.keys(errors).length > 0) return;
    }

    if (visitSteps < totalSteps - 1) {
      dispatch(setVisitSteps(visitSteps + 1));
    } else {
      handleApi();
    }
  };

  const onPressLeft = () => {
    if (visitSteps === 0) {
      sheetRef?.current.close();
      return;
    }
    dispatch(setVisitSteps(visitSteps - 1));
  };

  const onPressRight = () => {
    sheetRef?.current.close();
  };

  return (
    <View>
      <VisitList
        ref={sheetRef}
        onAdvisedTestsLoad={setTests}
        onNextVisitNumberChange={setNextVisitNumber}
        onModeChange={setMode}
      />

      <BottomSheet ref={sheetRef} sheetHeight={1000}>
        <AppHeader
          leftIcon={<Icons.left />}
          title={t("Visit")}
          rightIcon={<Icons.cross />}
          onLeftPress={onPressLeft}
          onRightPress={onPressRight}
        />
        <KeyboardAvoidingWrapper>
          {stepScreens[visitSteps]?.component}
        </KeyboardAvoidingWrapper>
        {isLoading && <AppLoader fullScreen />}
        <View style={styles.footerContainer}>
          <StepProgressBar totalSteps={totalSteps} currentStep={visitSteps} />
          <View style={styles.subContainer}>
            <Text style={styles.stepText}>
              {t("Visit {{current}} of {{total}}", {
                current: visitSteps + 1,
                total: totalSteps,
              })}
            </Text>
            <TouchableOpacity style={styles.buttonStyle} onPress={onPressNext}>
              <Text style={styles.buttonText}>
                {visitSteps < totalSteps - 1
                  ? t("Save & Next")
                  : t("Save questions")}
              </Text>
              {visitSteps < totalSteps - 1 && (
                <Icons.whiteArrow marginLeft={10} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Visit;
