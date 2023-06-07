import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(express.json({ extended: false }));
app.use(cors("*"));
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("App is running");
});

export default app;
