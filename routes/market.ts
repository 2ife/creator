import express from "express";
import { isLoggedIn, apiLimiter } from "../middlewares";
import {
  registerItem,
  cancelSale,
  buyItem,
  searchItem,
  getSaleInfo,
  receivePayment,
} from "../controllers/market";
import { checkRequest, checkParams } from "./common";

const router = express.Router();

router.post(
  "/register/:code",
  apiLimiter,
  isLoggedIn,
  checkRequest,
  checkParams("itemCode"),
  registerItem
);
router.post(
  "/cancel/:id",
  apiLimiter,
  isLoggedIn,
  checkRequest,
  checkParams("id"),
  cancelSale
);
router.post(
  "/buy/:id",
  apiLimiter,
  isLoggedIn,
  checkRequest,
  checkParams("id"),
  buyItem
);
router.post("/search", apiLimiter, isLoggedIn, checkRequest, searchItem);
router.post(
  "/receive/:id",
  apiLimiter,
  isLoggedIn,
  checkRequest,
  checkParams("id"),
  receivePayment
);
router.post("/sale", apiLimiter, isLoggedIn, checkRequest, getSaleInfo);

export default router;
