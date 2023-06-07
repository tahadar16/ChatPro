import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo connected...");
  } catch (error) {
    console.log("Error connected mongo=> " + error);
    process.exit(1);
  }
};

export default connectDB;
