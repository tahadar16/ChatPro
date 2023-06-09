import { validationResult } from "express-validator";
import bycrypt from "bcrypt";
import User from "../model/User.js";

export const signup = async (req, res, next) => {
  const result = validationResult(req);
  const errors = result.array();
  console.log("errors is empty ? => ", errors.length > 0);
  if (errors.length > 0) {
    console.log("Error type=> ", errors);
    return next(errors);
  }

  try {
    const { name, email, password, profile, role } = req.body;

    let user = await User.findOne({ email });
    console.log("user=>", user);
    if (user) {
      return res.status(400).json({ error: { msg: "User already exists" } });
    }

    user = new User({ name, email, password, profile, role });

    user = await user.save();
    user.password = undefined;
    user.role = undefined;
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const result = validationResult(req);
  const errors = result.array();
  if (errors.length > 0) {
    console.log("Error type=> ", errors);
    return next(errors);
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    console.log("user in login=>", user);
    if (!user) {
      return res.status(400).json({ error: { msg: "Invalid credentials" } });
    }

    const isMatch = await bycrypt.compare(password, user.password);
    console.log("isMatch=> ", isMatch);
    if (!isMatch) {
      const error = new Error("Invalid credentials");
      return next(error);
    }
    user.password = undefined;
    res.status(200).json({ user, msg: "Login Successful" });
  } catch (error) {
    next(error);
  }
};
