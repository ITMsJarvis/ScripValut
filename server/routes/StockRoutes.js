import express from "express";
import {
  AllSectorData,
  AllTopstocksAllCap,
  GetIndices,
} from "../controllers/StockControllers.js";

const router = express.Router();

//Get Stock price by symbol

router.get("/allindices", GetIndices);

//Get all Top Top gainers, losers,by volumes, 52W high, 52W low

router.get("/alltopstocks", AllTopstocksAllCap);

//Get sector wise data

router.get("/sector-wise-data", AllSectorData);

export default router;
