import express from "express";
import router from "./routes/authRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Hello from Express!"));
app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ports ${PORT}`);
});
