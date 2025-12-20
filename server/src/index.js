import express from "express";
import router from "./routes/authRoutes.js";
import adminRoute from "./routes/adminRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api/admin", adminRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ports ${PORT}`);
});
