import { PatientFormValues } from "@/components/NewPatient";
import { removeCountryCode } from "@/utils/helperFunction";

const loginSchema = () => {
  return {
    email: "admin@test.com",
    password: "Password123!",
  };
};

const newPatientSchema = (patient: any) => {
  return {
    name: patient?.name || "",
    husbandName: patient?.husbandName || "",
    cnic: patient?.cnic || "",
    age: patient?.age || "",
    phoneNumber: removeCountryCode(patient) || "",
  };
};

export { loginSchema, newPatientSchema };
