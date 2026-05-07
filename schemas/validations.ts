import { onlyDigits } from "@/utils/helperFunction";
import * as Yup from "yup";

// Reusable field validators
const emailField = Yup.string()
  .email("Invalid email")
  .required("Email is required");

const passwordField = Yup.string()
  .min(6, "Password must be at least 6 characters")
  .required("Password is required");

// Login Schema
const LoginValidation = Yup.object().shape({
  email: emailField,
  password: passwordField,
});

// Signup Schema
const SignupValidation = Yup.object().shape({
  email: emailField,
});

//Password Schema
const passwordValidation = Yup.object().shape({
  password: passwordField,
});

const newPatientValidation = Yup.object().shape({
  name: Yup.string().required("Patient name is required"),
  husbandName: Yup.string().required("Husband name is required"),
  cnic: Yup.string()
    .test(
      "len",
      "CNIC must be exactly 13 digits",
      (val) => onlyDigits(val || "").length === 13,
    )
    .required("CNIC is required"),
  age: Yup.number()
    .typeError("Age must be numeric")
    .required("Age is required"),
  phoneNumber: Yup.string()
    .length(10, "Phone number must be 10 digits")
    .required("Phone number is required"),
});

export {
  LoginValidation,
  SignupValidation,
  passwordValidation,
  newPatientValidation,
};
