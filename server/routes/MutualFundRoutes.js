import express from "express";
import {
  GetAllMF,
  OneTimeInvestMent,
} from "../controllers/MutualFundControllers.js";

const router = express.Router();

router.post("/buymutualfund", OneTimeInvestMent);

router.post("/getAllMF", GetAllMF);

export default router;
