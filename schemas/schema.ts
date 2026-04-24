import { PatientFormValues } from "@/components/NewPatient";
import { removeCountryCode } from "@/utils/helperFunction";

const loginSchema = () => {
  return {
    email: "admin@test.com",
    password: "Password123!",
  };
};

const newPatientSchema = (
  patient: any,
  weeks: string,
  days: string,
) => {
  return {
    name: patient?.name || "",
    husbandName: patient?.husbandName || "",
    cnic: patient?.cnic || "",
    age: patient?.age || "",
    lmp: patient?.lmp || patient?.lastMenstruationDate || "",
    weeks: weeks || "",
    days: days || "",
    phoneNumber: removeCountryCode(patient) || "",
  };
};

export { loginSchema, newPatientSchema };
