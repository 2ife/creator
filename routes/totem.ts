import express from "express";
import { isLoggedIn, apiLimiter } from "../middlewares";
import { createTotem, awakenTotem, getTotemInfo } from "../controllers/totem";
import { checkRequest, checkParams } from "./common";

const router = express.Router();

router.post(
  "/create/:id",
  apiLimiter,
  isLoggedIn,
  checkRequest,
  checkParams("summonerTotemIndex"),
  createTotem
);
router.post(
  "/awaken/:id",
  apiLimiter,
  isLoggedIn,
  checkRequest,
  checkParams("summonerTotemIndex"),
  awakenTotem
);
router.post(
  "/:id",
  apiLimiter,
  isLoggedIn,
  checkRequest,
  checkParams("summonerTotemIndex"),
  getTotemInfo
);

export default router;
