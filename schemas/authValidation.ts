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


export { LoginValidation, SignupValidation,  passwordValidation };
