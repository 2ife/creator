"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const market_1 = require("../controllers/market");
const common_1 = require("./common");
const router = express_1.default.Router();
router.post("/register/:code", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, (0, common_1.checkParams)("itemCode"), market_1.registerItem);
router.post("/cancel/:id", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, (0, common_1.checkParams)("id"), market_1.cancelSale);
router.post("/buy/:id", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, (0, common_1.checkParams)("id"), market_1.buyItem);
router.post("/search", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, market_1.searchItem);
router.post("/receive/:id", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, (0, common_1.checkParams)("id"), market_1.receivePayment);
router.post("/sale", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, market_1.getSaleInfo);
exports.default = router;
