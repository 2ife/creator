import express from "express";
import { isLoggedIn, apiLimiter } from "../middlewares";
import {
  createSummoner,
  summonItem,
  awakenSummoner,
  blessSummoner,
  equipMark,
  unequipMark,
  getSummonerInfo,
} from "../controllers/summoner";
import { checkRequest, checkParams } from "./common";

const router = express.Router();

router.post(
  "/create/:id",
  apiLimiter,
  isLoggedIn,
  checkRequest,
  checkParams("summonerTotemIndex"),
  createSummoner
);
router.post(
  "/summon/:id",
  apiLimiter,
  isLoggedIn,
  checkRequest,
  checkParams("summonerTotemIndex"),
  summonItem
);
router.post(
  "/awaken/:id",
  apiLimiter,
  isLoggedIn,
  checkRequest,
  checkParams("summonerTotemIndex"),
  awakenSummoner
);
router.post(
  "/bless/:id",
  apiLimiter,
  isLoggedIn,
  checkRequest,
  checkParams("summonerTotemIndex"),
  blessSummoner
);
router.post(
  "/mark/:id",
  apiLimiter,
  isLoggedIn,
  checkRequest,
  checkParams("summonerTotemIndex"),
  equipMark
);
router.post(
  "/unequip/:id",
  apiLimiter,
  isLoggedIn,
  checkRequest,
  checkParams("summonerTotemIndex"),
  unequipMark
);
router.post(
  "/:id",
  apiLimiter,
  isLoggedIn,
  checkRequest,
  checkParams("summonerTotemIndex"),
  getSummonerInfo
);

export default router;
