import express from "express";

import authRoute from "./routes/authRoutes.js";
import donationsRoute from "./routes/donationsRoutes.js";
import inventoryRoute from "./routes/inventoryRoutes.js";
import requestRoute from "./routes/requestRoutes.js";
import dotenv from "dotenv";
import requestRoutes from "./routes/requestRoutes.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  cors({
    origin: true, // Allow all origins
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  }),
);

const PORT = process.env.PORT || 3000;

app.use("/api/user", authRoute);
app.use("/api/donations", donationsRoute);
app.use("/api/inventory", inventoryRoute);
app.use("/api/request", requestRoute);


app.listen(process.env.PORT, () => {
  console.log(`Server running on ports ${PORT}`);
});
