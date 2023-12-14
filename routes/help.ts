import express from "express";
import { apiLimiter } from "../middlewares";
import { renderHelp } from "../controllers/help";

const router = express.Router();

router.get("/:part", apiLimiter, renderHelp);

export default router;
