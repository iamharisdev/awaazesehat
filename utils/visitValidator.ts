import { Vitals, Examination, ProposedPlan } from "@/features/patientSlice";

export const validateVitals = (
  v?: Vitals,
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!v?.presentingComplaint || v.presentingComplaint.trim() === "")
    errors.presentingComplaint = "Presenting complaint is required";

  return errors;
};

export const validateExamination = (
  fields?: Examination,
  type: string = "Structured Fields",
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (type === "Free Text / Voice Note") {
    if (!fields?.physicalFindings || fields.physicalFindings.trim() === "") {
      errors.physicalFindings = "Please enter physical findings";
    }
  }

  return errors;
};

export const validateTreatmentPlan = (
  v?: ProposedPlan,
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!v?.generalPlan || v.generalPlan.trim() === "")
    errors.generalPlan = "General plan is required";

  if (!v?.medication || (typeof v.medication === "string" && v.medication.trim() === "") || (Array.isArray(v.medication) && v.medication.length === 0))
    errors.medication = "Medication details are required";

  return errors;
};
