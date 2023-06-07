import app from "./src/app.js";
import "dotenv/config";
import connectDB from "./src/config/db.js";

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  console.log(`Listening on port ${PORT}`);
});
