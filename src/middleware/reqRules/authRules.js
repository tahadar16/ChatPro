import { check } from "express-validator";

export const signupRules = [
  check("name", "Name should not be empty").not().isEmpty(),
  check("email", "Invalid Email").isEmail(),
  check(
    "password",
    "Password should be alphanumeric and atleast 8 in length"
  ).matches("^(?=.*[a-zA-Z0-9]).{8,128}$"),
];

export const loginRules = [
  check("email", "Invalid Email").isEmail(),
  check("password", "Password is required").exists(),
];
