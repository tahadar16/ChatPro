import express from "express";
import cors from "cors";
import morgan from "morgan";
import handleError from "./middleware/errorHandler.js";
import authRouter from "./routes/api/auth.js";

const app = express();

app.use(express.json({ extended: false }));
app.use(cors("*"));
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("App is running");
});

app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  handleError(err, res, next);
});

export default app;
