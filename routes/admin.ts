import express from "express";
import {
  isLoggedIn,
  isNotLoggedIn,
  isAdminLoggedIn,
  apiLimiter,
} from "../middlewares";
import {
  renderAdmin,
  loginAdmin,
  logoutAdmin,
  getUserInfo,
  deleteCashCode,
  deleteError,
  deleteUser,
  lockOrUnlockUser,
  changeUserNick,
  changeUserGold,
  changeUserCash,
  changeUserItem,
} from "../controllers/admin";
import { checkParams } from "./common";

const router = express.Router();

router.get("/", apiLimiter, renderAdmin);
router.post("/login", apiLimiter, isNotLoggedIn, loginAdmin);
router.get("/logout", apiLimiter, isAdminLoggedIn, logoutAdmin);
router.post(
  "/userInfo/:id",
  apiLimiter,
  isAdminLoggedIn,
  checkParams("id"),
  getUserInfo
);
router.post("/deleteCashCode", apiLimiter, isAdminLoggedIn, deleteCashCode);
router.post("/deleteError", apiLimiter, isAdminLoggedIn, deleteError);
router.post(
  "/lock/:id",
  apiLimiter,
  isAdminLoggedIn,
  checkParams("id"),
  lockOrUnlockUser
);
router.post(
  "/deleteUser/:id",
  apiLimiter,
  isAdminLoggedIn,
  checkParams("id"),
  deleteUser
);
router.post(
  "/changeNick/:id",
  apiLimiter,
  isAdminLoggedIn,
  checkParams("id"),
  changeUserNick
);
router.post("/changeGold", apiLimiter, isAdminLoggedIn, changeUserGold);
router.post("/changeCash", apiLimiter, isAdminLoggedIn, changeUserCash);
router.post(
  "/changeItem/:id",
  apiLimiter,
  isAdminLoggedIn,
  checkParams("id"),
  changeUserItem
);

// router.get("/help", apiLimiter, isLoggedIn, renderHelp);
// router.get("/profile", apiLimiter, isLoggedIn, renderProfile);

export default router;
