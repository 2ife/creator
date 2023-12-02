"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLimiter = exports.isAdminLoggedIn = exports.isNotLoggedIn = exports.isLoggedIn = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_rate_limit_1 = require("express-rate-limit");
dotenv_1.default.config();
const apiLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 24 * 60 * 60 * 1000,
    max: 100000,
    handler(req, res) {
        if (req.isAuthenticated()) {
            req.logout(() => { });
        }
        res
            .status(429)
            .send("단기간 내 너무 많은 데이터를 요청하여 이후에 접속 바랍니다.");
    },
});
exports.apiLimiter = apiLimiter;
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect("/");
    }
};
exports.isLoggedIn = isLoggedIn;
const isAdminLoggedIn = (req, res, next) => {
    if (req.isAuthenticated() &&
        process.env.ADMIN_ID.includes(req.user.loginId)) {
        next();
    }
    else {
        res.redirect("/");
    }
};
exports.isAdminLoggedIn = isAdminLoggedIn;
const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        req.logout(() => {
            res.redirect("/");
        });
    }
};
exports.isNotLoggedIn = isNotLoggedIn;
