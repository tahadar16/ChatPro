import express from "express";
import { signup, login } from "../../controller/auth.js";
import {
  loginRules,
  signupRules,
} from "../../middleware/reqRules/authRules.js";
import passport from "../../config/passport.js";

const authRouter = express.Router();

authRouter.route("/signup").post(signupRules, signup);
authRouter.route("/login").post(
  passport.authenticate("login", { session: false, failWithError: true }),
  // loginRules,
  login
);

export default authRouter;
