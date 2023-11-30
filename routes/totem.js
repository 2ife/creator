"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const totem_1 = require("../controllers/totem");
const common_1 = require("./common");
const router = express_1.default.Router();
router.post("/create/:id", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, (0, common_1.checkParams)("summonerTotemIndex"), totem_1.createTotem);
router.post("/awaken/:id", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, (0, common_1.checkParams)("summonerTotemIndex"), totem_1.awakenTotem);
router.post("/:id", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, (0, common_1.checkParams)("summonerTotemIndex"), totem_1.getTotemInfo);
exports.default = router;
