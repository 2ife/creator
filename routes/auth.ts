import express from "express";
import { isLoggedIn, isNotLoggedIn, apiLimiter } from "../middlewares";
import {
  join,
  // requestPhoneVerify,
  // checkVerifyCode,
  checkNick,
  checkId,
  login,
  logout,
  leave,
  changeNick,
  changePassword,
} from "../controllers/auth";
import { checkRequest, checkParams } from "./common";

const router = express.Router();

router.post("/join", apiLimiter, isNotLoggedIn, join);
// router.post("/reqPhone", apiLimiter,isNotLoggedIn,requestPhoneVerify);
// router.post("/checkPhone", apiLimiter,isNotLoggedIn,checkVerifyCode);
router.post("/checkNick", apiLimiter, isNotLoggedIn, checkNick);
router.post("/checkId", apiLimiter, isNotLoggedIn, checkId);
router.post("/login", apiLimiter, isNotLoggedIn, login);
router.get("/logout", apiLimiter, isLoggedIn, checkRequest, logout);
router.post("/leave", apiLimiter, isLoggedIn, checkRequest, leave);
router.post("/changeNick", apiLimiter, isLoggedIn, checkRequest, changeNick);
router.post("/changePassword", apiLimiter, isLoggedIn, checkRequest, changePassword);

export default router;
