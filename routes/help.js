"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const help_1 = require("../controllers/help");
const router = express_1.default.Router();
router.get("/:part", middlewares_1.apiLimiter, help_1.renderHelp);
exports.default = router;
