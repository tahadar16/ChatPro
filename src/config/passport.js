import passport from "passport";
import localStrategy from "./passport/localStrategy.js";

passport.use("login", localStrategy);
// passport.use(jwtStrategy);

export default passport;
