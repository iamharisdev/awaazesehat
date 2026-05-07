type EmrErrors = Record<string, string>;

const isEmpty = (v: any) =>
  v === undefined ||
  v === null ||
  (typeof v === "string" && v.trim() === "");

export const validateAddPatientProfile = (emr: any): EmrErrors => {
  const errors: EmrErrors = {};
  const patient = emr?.patient ?? {};
  const cp = emr?.currentPregnancy ?? {};

  if (isEmpty(patient.lastMenstruationDate))
    errors.lastMenstruationDate = "LMP is required";

  if (isEmpty(cp.firstPregnancy))
    errors.firstPregnancy = "Please select an option";

  if (isEmpty(patient.address))
    errors.address = "Area of residence is required";

  if (isEmpty(cp.durationOfMarriage))
    errors.durationOfMarriage = "Duration of marriage is required";

  if (isEmpty(patient.isHusbandCousin))
    errors.isHusbandCousin = "This field is required";

  return errors;
};

export const validateCurrentPregnancy = (emr: any): EmrErrors => {
  const errors: EmrErrors = {};
  const cp = emr?.currentPregnancy ?? {};

  if (isEmpty(cp.pregnancyDetectionMethod))
    errors.pregnancyDetectionMethod =
      "Please specify how the pregnancy was confirmed";

  return errors;
};

export const validateEmrStep = (
  stepKey: string,
  emr: any,
): EmrErrors => {
  switch (stepKey) {
    case "Patient Profile":
      return validateAddPatientProfile(emr);
    case "Current Pregnancy":
      return validateCurrentPregnancy(emr);
    default:
      return {};
  }
};
