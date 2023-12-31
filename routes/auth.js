"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const auth_1 = require("../controllers/auth");
const common_1 = require("./common");
const router = express_1.default.Router();
router.post("/join", middlewares_1.apiLimiter, middlewares_1.isNotLoggedIn, auth_1.join);
// router.post("/reqPhone", apiLimiter,isNotLoggedIn,requestPhoneVerify);
// router.post("/checkPhone", apiLimiter,isNotLoggedIn,checkVerifyCode);
router.post("/checkNick", middlewares_1.apiLimiter, middlewares_1.isNotLoggedIn, auth_1.checkNick);
router.post("/checkId", middlewares_1.apiLimiter, middlewares_1.isNotLoggedIn, auth_1.checkId);
router.post("/login", middlewares_1.apiLimiter, middlewares_1.isNotLoggedIn, auth_1.login);
router.get("/logout", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, auth_1.logout);
router.post("/leave", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, auth_1.leave);
router.post("/changeNick", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, auth_1.changeNick);
router.post("/changePassword", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, auth_1.changePassword);
exports.default = router;
