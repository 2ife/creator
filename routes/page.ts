import express from "express";
import {  apiLimiter } from "../middlewares";
import { renderMain } from "../controllers/page";

const router = express.Router();

router.get("/", apiLimiter, renderMain);

export default router;
