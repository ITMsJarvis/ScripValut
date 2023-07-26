import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import UserAuthRoutes from "./routes/UserAuthRoutes.js";
import StockRoutes from "./routes/StockRoutes.js";
import Connect from "./db/connect.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
  })
);

app.use("/api/user_auth/", UserAuthRoutes);

app.use("/api/stocks", StockRoutes);

app.listen(PORT, () => {
  Connect();
  console.log(`Server is running at ${PORT}`);
});
