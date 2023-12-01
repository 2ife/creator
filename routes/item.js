"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const item_1 = require("../controllers/item");
const common_1 = require("./common");
const router = express_1.default.Router();
router.post("/make/:code", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, (0, common_1.checkParams)("itemCode"), item_1.makeItem);
router.post("/mark/:code", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, (0, common_1.checkParams)("itemCode"), item_1.enhanceMark);
router.post("/disassemble/:code", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, (0, common_1.checkParams)("itemCode"), item_1.disassembleItem);
router.post("/buyCashItem/:code", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, (0, common_1.checkParams)("itemCode"), item_1.buyCashItem);
exports.default = router;
