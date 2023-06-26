import express from "express";
import {
  AllSectorData,
  AllTopstocksAllCap,
  Get52WeekSummary,
  GetIndices,
  GetStockDetails,
} from "../controllers/StockControllers.js";

const router = express.Router();

//*Get Stock price by symbol

router.get("/allindices", GetIndices);

//*Get all Top Top gainers, losers,by volumes, 52W high, 52W low

router.get("/alltopstocks", AllTopstocksAllCap);

//*Get sector wise data

router.get("/sector-wise-data", AllSectorData);

//!Add all stocks in db only not for user

// router.post("/addallstocks", AddStocks);

//*Get individual stock details

router.get("/stock-details", GetStockDetails);

//*Get 52 Week data

router.get("/fifty-two-week", Get52WeekSummary);

export default router;
