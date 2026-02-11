import { PatientFormValues } from "@/components/NewPatient";
import { removeCountryCode } from "@/utils/helperFunction";

const loginSchema = () => {
  return {
    email: "healthworker@awaazesehat.com",
    password: "health@worker@123",
  };
};

const newPatientSchema = (
  patient: PatientFormValues,
  weeks: string,
  days: string,
) => {
  return {
    name: patient?.name || "",
    husbandName: patient?.husbandName || "",
    cnic: patient?.cnic || "",
    age: patient?.age || "",
    weeks: weeks || "",
    days: days || "",
    phoneNumber: removeCountryCode(patient) || "",
  };
};

export { loginSchema, newPatientSchema };
