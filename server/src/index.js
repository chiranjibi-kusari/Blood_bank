import express from "express";

import adminRoute from "./routes/adminRoutes.js";
import authRoute from "./routes/authRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api/admin", adminRoute);
app.use("/api/user", authRoute);

//app.use("/api/user",userRoute);
//app.use("/api/donor",donorRoute);
//app.use("/api/inventory",inventoryRoute);
//app.use("/api/matching",matchingRoute);
//app.use("/api/recipient",recipientRoute);
//app.use("/api/request",requestRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ports ${PORT}`);
});
