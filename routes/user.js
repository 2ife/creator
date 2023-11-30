"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const user_1 = require("../controllers/user");
const common_1 = require("./common");
const router = express_1.default.Router();
router.post("/marketDiscount/:code", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, (0, common_1.checkParams)("itemCode"), user_1.useMarketDiscountTicket);
router.post("/oldBook/:code", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, (0, common_1.checkParams)("itemCode"), user_1.useOldBook);
// router.post("/makable", apiLimiter,isLoggedIn, checkRequest, getMakableList);
exports.default = router;
