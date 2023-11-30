"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const summoner_1 = require("../controllers/summoner");
const common_1 = require("./common");
const router = express_1.default.Router();
router.post("/create/:id", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, (0, common_1.checkParams)("summonerTotemIndex"), summoner_1.createSummoner);
router.post("/summon/:id", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, (0, common_1.checkParams)("summonerTotemIndex"), summoner_1.summonItem);
router.post("/awaken/:id", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, (0, common_1.checkParams)("summonerTotemIndex"), summoner_1.awakenSummoner);
router.post("/bless/:id", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, (0, common_1.checkParams)("summonerTotemIndex"), summoner_1.blessSummoner);
router.post("/mark/:id", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, (0, common_1.checkParams)("summonerTotemIndex"), summoner_1.equipMark);
router.post("/unequip/:id", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, (0, common_1.checkParams)("summonerTotemIndex"), summoner_1.unequipMark);
router.post("/:id", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, common_1.checkRequest, (0, common_1.checkParams)("summonerTotemIndex"), summoner_1.getSummonerInfo);
exports.default = router;
