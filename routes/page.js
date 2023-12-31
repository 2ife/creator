"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const page_1 = require("../controllers/page");
const router = express_1.default.Router();
router.get("/", middlewares_1.apiLimiter, page_1.renderMain);
exports.default = router;
