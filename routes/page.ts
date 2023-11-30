import express from "express";
import { isLoggedIn, apiLimiter } from "../middlewares";
import { renderMain, renderHelp, renderProfile } from "../controllers/page";

const router = express.Router();

router.get("/", apiLimiter, renderMain);
router.get("/help", apiLimiter, isLoggedIn, renderHelp);
router.get("/profile", apiLimiter, isLoggedIn, renderProfile);

export default router;
