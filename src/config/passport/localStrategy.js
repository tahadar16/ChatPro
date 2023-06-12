import passportLocal from "passport-local";
import User from "../../model/User.js";

const Strategy = passportLocal.Strategy;

const localStrategy = new Strategy(
  {
    usernameField: "email",
  },
  async (email, password, next) => {
    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        const error = new Error("User not found");
        return next(error);
        // return next(null, false, { message: "User not found" });
      }

      const isPasswordValid = await user.isPasswordValid(password);
      if (!isPasswordValid) {
        // return next(null, false, { message: "Invalid credentials" });
        const error = new Error("Invalid credentials");
        return next(error);
      } else {
        return next(
          null,
          { id: user.id, email, password },
          { message: "Loggin Successful" }
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

export default localStrategy;
