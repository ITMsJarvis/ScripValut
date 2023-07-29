import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import UserAuthRoutes from "./routes/UserAuthRoutes.js";
import StockRoutes from "./routes/StockRoutes.js";
import MutualFundRoutes from "./routes/MutualFundRoutes.js";
import Connect from "./db/connect.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "https://socket-api-backend.onrender.com",
    ],
  })
);

app.use("/api/user_auth/", UserAuthRoutes);

app.use("/api/stocks", StockRoutes);

app.use("/api/mutualfund", MutualFundRoutes);

app.listen(PORT, () => {
  Connect();
  console.log(`Server is running at ${PORT}`);
});
