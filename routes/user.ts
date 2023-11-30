import express from "express";
import { isLoggedIn, apiLimiter } from "../middlewares";
import {
  useMarketDiscountTicket,
  useOldBook,
} from "../controllers/user";
import { checkRequest, checkParams } from "./common";

const router = express.Router();

router.post(
  "/marketDiscount/:code",
  apiLimiter,
  isLoggedIn,
  checkRequest,
  checkParams("itemCode"),
  useMarketDiscountTicket
);
router.post(
  "/oldBook/:code",
  apiLimiter,
  isLoggedIn,
  checkRequest,
  checkParams("itemCode"),
  useOldBook
);
// router.post("/makable", apiLimiter,isLoggedIn, checkRequest, getMakableList);

export default router;
