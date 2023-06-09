import express from "express";
import { signup, login } from "../../controller/auth.js";
import {
  loginRules,
  signupRules,
} from "../../middleware/reqRules/authRules.js";

const authRouter = express.Router();

authRouter.route("/signup").post(signupRules, signup);
authRouter.route("/login").post(loginRules, login);

export default authRouter;
