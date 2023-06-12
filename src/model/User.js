import mongoose from "mongoose";
import bycrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    max: 255,
    select: false,
    required: true,
  },
  profileUrl: {
    type: String,
    required: false,
    default: "",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    select: false,
  },
});

UserSchema.methods.isPasswordValid = async function (password) {
  const isPasswordValid = await bycrypt.compare(password, this.password);
  return isPasswordValid;
};

UserSchema.pre("save", function (next) {
  if (this.isNew && this.role == "admin") {
    const user = mongoose.model("User");
    user
      .countDocuments({ role: "admin" })
      .then((count) => {
        console.log("count => ", count);
        if (count > 0) {
          const error = new Error("An admin user already exists");
          return next(error);
        } else {
          console.log("count else condition ran i.e count > 0 = false", count);
          return next();
        }
      })
      .catch((error) => {
        console.log("error occurred=> ", error);
        return next(error);
      });
  } else {
    next();
  }
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const saltRound = 10;
  const password = this.password;

  const salt = await bycrypt.genSalt(saltRound);
  const hash = await bycrypt.hash(password, salt);

  this.password = hash;
  next();
});

export default mongoose.model("User", UserSchema);
