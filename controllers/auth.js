"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.changeNick = exports.leave = exports.logout = exports.login = exports.checkId = exports.checkNick = exports.join = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const models_1 = require("../models");
const common_1 = require("./common");
const testLoginInfo = (category, text) => {
    let tester = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
    switch (category) {
        case "id": {
            tester = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
            break;
        }
        case "password": {
            tester = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{6,16}$/;
            break;
        }
    }
    return tester.test(text);
};
const join = async (req, res, next) => {
    try {
        const { nick, id, password, passwordCheck } = req.body;
        const nickTest = testLoginInfo("nick", nick);
        const idTest = testLoginInfo("id", id);
        const passwordTest = testLoginInfo("password", password);
        if (!nick ||
            !id ||
            !password ||
            !passwordCheck ||
            password !== passwordCheck ||
            !nickTest ||
            !idTest ||
            !passwordTest) {
            const errorObj = {
                status: 400,
                place: "controllers-auth-join",
                content: "banned join",
            };
            const error = new common_1.ReqError(errorObj, errorObj.content);
            return next(error);
        }
        const exNick = await models_1.User.findOne({ where: { nick } });
        const exId = await models_1.User.findOne({ where: { loginId: id } });
        if (exNick || exId) {
            return res.status(200).json({
                nickExist: exNick === null ? false : true,
                idExist: exId === null ? false : true,
            });
        }
        const hash = await bcrypt_1.default.hash(password, 12);
        const transaction = await models_1.sequelize.transaction();
        try {
            const user = await models_1.User.create({
                loginId: id,
                nick,
                password: hash,
                level: 1,
                exp: 0,
                marketCommisionDiscount: "0",
                gold: 0,
                cash: 100000,
            }, { transaction });
            await models_1.Item.create({
                name: "breathe_of_creation",
                korName: "창조의 숨결",
                code: "7_0_1",
                itemClass: 7,
                itemGrade: 0,
                itemDetail: "1",
                amounts: 10,
                saleCode: 0,
                UserId: user.id,
            }, { transaction });
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                status: 400,
                place: "controllers-auth-join",
                content: "join transaction error",
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        return res.status(200).json("ok");
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-auth-join";
            err.content = "joinError";
            err.user = null;
        }
        return next(err);
    }
};
exports.join = join;
const checkNick = async (req, res, next) => {
    try {
        const { nick } = req.body;
        const nickTest = testLoginInfo("nick", nick);
        if (!nickTest) {
            const errorObj = {
                status: 400,
                place: "controllers-auth-checkNick",
                content: "nickTest fail",
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const exUser = await models_1.User.findOne({
            where: { nick },
        });
        if (exUser) {
            res.json({ nickExist: true });
        }
        else {
            res.json({ nickExist: false });
        }
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-auth-checkNick";
            err.content = "checkNickError";
            err.user = null;
        }
        return next(err);
    }
};
exports.checkNick = checkNick;
const checkId = async (req, res, next) => {
    try {
        const { id } = req.body;
        const idTest = testLoginInfo("id", id);
        if (!idTest) {
            const errorObj = {
                status: 400,
                place: "controllers-auth-checkId",
                content: "idTest fail",
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const exUser = await models_1.User.findOne({
            where: { loginId: id },
        });
        if (exUser) {
            res.json({ idExist: true });
        }
        else {
            res.json({ idExist: false });
        }
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-auth-checkId";
            err.content = "checkIdError";
            err.user = null;
        }
        return next(err);
    }
};
exports.checkId = checkId;
const login = (req, res, next) => {
    passport_1.default.authenticate("local", (authError, user) => {
        if (authError) {
            authError.fatal = false;
            authError.status = 400;
            authError.place = "controllers-auth-login";
            authError.content = "authError";
            authError.user = null;
            return next(authError);
        }
        if (!user) {
            return res.status(200).json({ info: "noUser" });
        }
        if (user.lockMemo) {
            return res.status(200).json({ info: "lock" });
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                authError.fatal = false;
                authError.status = 400;
                authError.place = "controllers-auth-login";
                authError.content = "loginError";
                authError.user = null;
                return next(loginError);
            }
            return res.redirect("/");
        });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};
exports.login = login;
const logout = (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
};
exports.logout = logout;
const leave = async (req, res, next) => { };
exports.leave = leave;
const changeNick = async (req, res, next) => {
    try {
        const UserId = Number(req.user.id);
        let { newNick } = req.body;
        newNick = `${newNick}`;
        const nickTester = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
        if (!nickTester.test(newNick)) {
            const errorObj = {
                status: 400,
                place: "controllers-auth-changeNick",
                content: `weird newNick! newNick: ${newNick}`,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const nickExist = await models_1.User.findOne({ where: { nick: newNick } });
        if (nickExist) {
            return res.status(200).json({ nickExist: true });
        }
        const user = await models_1.User.findOne({ where: { id: UserId } });
        if (!user) {
            const errorObj = {
                status: 400,
                place: "controllers-auth-changeNick",
                content: `no creator! UserId: ${UserId}`,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const transaction = await models_1.sequelize.transaction();
        try {
            user.nick = newNick;
            await user.save({ transaction });
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                status: 400,
                place: "controllers-auth-changeNick",
                content: `changeNick transaction error! ${err}`,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        res.status(200).json("ok");
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-auth-changeNick";
            err.content = "changeNickError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.changeNick = changeNick;
const changePassword = async (req, res, next) => {
    try {
        const UserId = Number(req.user.id);
        let { password } = req.body;
        password = `${password}`;
        const nickTester = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{6,16}$/;
        if (!nickTester.test(password)) {
            const errorObj = {
                status: 400,
                place: "controllers-auth-changePassword",
                content: `weird password! password: ${password}`,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const user = await models_1.User.findOne({ where: { id: UserId } });
        if (!user) {
            const errorObj = {
                status: 400,
                place: "controllers-auth-changePassword",
                content: `no creator! UserId: ${UserId}`,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const hash = await bcrypt_1.default.hash(password, 12);
        const transaction = await models_1.sequelize.transaction();
        try {
            user.password = hash;
            await user.save({ transaction });
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                status: 400,
                place: "controllers-auth-changePassword",
                content: `changePassword transaction error! ${err}`,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        res.status(200).json("ok");
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-auth-changePassword";
            err.content = "changePasswordError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.changePassword = changePassword;
