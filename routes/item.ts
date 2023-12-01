import express from "express";
import { isLoggedIn, apiLimiter } from "../middlewares";
import {
  makeItem,
  enhanceMark,
  disassembleItem,
  buyCashItem,
} from "../controllers/item";
import { checkRequest, checkParams } from "./common";
const router = express.Router();

router.post(
  "/make/:code",
  apiLimiter,
  isLoggedIn,
  checkRequest,
  checkParams("itemCode"),
  makeItem
);
router.post(
  "/mark/:code",
  apiLimiter,
  isLoggedIn,
  checkRequest,
  checkParams("itemCode"),
  enhanceMark
);
router.post(
  "/disassemble/:code",
  apiLimiter,
  isLoggedIn,
  checkRequest,
  checkParams("itemCode"),
  disassembleItem
);
router.post(
  "/buyCashItem/:code",
  apiLimiter,
  isLoggedIn,
  checkRequest,
  checkParams("itemCode"),
  buyCashItem
);

export default router;
