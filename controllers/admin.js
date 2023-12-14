"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUserItem = exports.changeUserCash = exports.changeUserGold = exports.changeUserNick = exports.lockOrUnlockUser = exports.deleteUser = exports.deleteError = exports.deleteCashCode = exports.getUserInfo = exports.logoutAdmin = exports.loginAdmin = exports.renderAdmin = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const common_1 = require("./common");
dotenv_1.default.config();
const renderAdmin = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.render("admin", {
                title: "Admin",
            });
        }
        const userId = Number(req.user.id);
        const creator = await models_1.User.findOne({ where: { id: userId } });
        if (!creator) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-admin-renderAdmin",
                content: `no creator! userId: ${userId}`,
                user: userId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        if (!process.env.ADMIN_ID.includes(creator.loginId)) {
            return req.logout(() => {
                res.redirect("/admin");
            });
        }
        const usersData = {};
        const errorsData = {};
        const creators = await models_1.User.findAll({});
        for (const creator of creators) {
            const { id, nick, loginId, cashCode, lockMemo, level, gold, cash } = creator;
            usersData[id] = {
                id,
                nick,
                loginId,
                cashCode,
                lockMemo,
                level,
                gold,
                cash,
            };
        }
        const errors = await models_1.Error.findAll({});
        for (const error of errors) {
            const { id, fatal, user, status, place, content } = error;
            errorsData[id] = { id, fatal, user, status, place, content };
        }
        return res.render("admin", {
            title: "Manager",
            usersStrData: JSON.stringify(usersData),
            errorsStrData: JSON.stringify(errorsData),
        });
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-admin-renderAdmin";
            err.content = "renderAdminError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.renderAdmin = renderAdmin;
const loginAdmin = (req, res, next) => {
    passport_1.default.authenticate("local", (authError, user) => {
        if (authError) {
            authError.fatal = false;
            authError.status = 400;
            authError.place = "controllers-admin-loginAdmin";
            authError.content = "authError";
            authError.user = null;
            return next(authError);
        }
        if (!user) {
            return res.status(200).json({ info: "noUser" });
        }
        if (!process.env.ADMIN_ID.includes(user.loginId)) {
            return res.redirect("/admin");
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                authError.fatal = false;
                authError.status = 400;
                authError.place = "controllers-admin-loginAdmin";
                authError.content = "loginError";
                authError.user = null;
                return next(loginError);
            }
            return res.redirect("/admin");
        });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};
exports.loginAdmin = loginAdmin;
const logoutAdmin = (req, res) => {
    req.logout(() => {
        res.redirect("/admin");
    });
};
exports.logoutAdmin = logoutAdmin;
const getUserInfo = async (req, res, next) => {
    try {
        const UserId = Number(req.params.id);
        const summoners = await models_1.Summoner.findAll({
            where: { UserId },
            order: [["summonerIndex", "ASC"]],
        });
        const summonersData = [];
        for (const summoner of summoners) {
            const { summonerIndex, grade, level } = summoner;
            const summonerData = { summonerIndex, grade, level };
            summonersData.push(summonerData);
        }
        const totems = await models_1.Totem.findAll({
            where: { UserId },
            order: [["totemIndex", "ASC"]],
        });
        const totemsData = [];
        for (const totem of totems) {
            const { totemIndex, grade, level } = totem;
            const totemData = { totemIndex, grade, level };
            totemsData.push(totemData);
        }
        res.status(200).json({ summonersData, totemsData });
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-admin-getUserInfo";
            err.content = "getUserInfoError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.getUserInfo = getUserInfo;
const deleteCashCode = async (req, res, next) => {
    try {
        const { userIds } = req.body;
        const users = await models_1.User.findAll({ where: { id: { [sequelize_1.Op.in]: userIds } } });
        const transaction = await models_1.sequelize.transaction();
        try {
            for (const user of users) {
                user.cashCode = null;
                await user.save({ transaction });
            }
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                status: 400,
                place: "controllers-admin-deleteCashCode",
                content: `deleteCashCode transaction error! ${err}`,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        res.status(200).json("ok");
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-admin-deleteCashCode";
            err.content = "deleteCashCodeError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.deleteCashCode = deleteCashCode;
const deleteError = async (req, res, next) => {
    try {
        const { errorIds } = req.body;
        const errors = await models_1.Error.findAll({
            where: { id: { [sequelize_1.Op.in]: errorIds } },
        });
        const transaction = await models_1.sequelize.transaction();
        try {
            for (const error of errors) {
                await error.destroy({ transaction });
            }
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                status: 400,
                place: "controllers-admin-deleteError",
                content: `deleteError transaction error! ${err}`,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        res.status(200).json("ok");
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-admin-deleteError";
            err.content = "deleteErrorError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.deleteError = deleteError;
const deleteUser = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const user = await models_1.User.findOne({
            where: { id: userId },
        });
        if (!user) {
            const errorObj = {
                status: 400,
                place: "controllers-admin-deleteUser",
                content: `no creator! userId: ${userId}`,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const errors = await models_1.Error.findAll({
            where: { user: userId },
        });
        const transaction = await models_1.sequelize.transaction();
        try {
            await user.destroy({ transaction });
            for (const error of errors) {
                await error.destroy({ transaction });
            }
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                status: 400,
                place: "controllers-admin-deleteUser",
                content: `deleteUser transaction error! ${err}`,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        res.status(200).json("ok");
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-admin-deleteUser";
            err.content = "deleteUserError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.deleteUser = deleteUser;
const lockOrUnlockUser = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        let { lockMemo } = req.body;
        lockMemo = `${lockMemo}`;
        const user = await models_1.User.findOne({ where: { id: userId } });
        if (!user) {
            const errorObj = {
                status: 400,
                place: "controllers-admin-lockOrUnlockUser",
                content: `no creator! userId: ${userId}`,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const transaction = await models_1.sequelize.transaction();
        try {
            if (user.lockMemo !== null) {
                user.lockMemo = null;
            }
            else {
                user.lockMemo = lockMemo;
            }
            await user.save({ transaction });
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                status: 400,
                place: "controllers-admin-lockOrUnlockUser",
                content: `lockOrUnlockUser transaction error! ${err}`,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        res.status(200).json("ok");
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-admin-lockOrUnlockUser";
            err.content = "lockOrUnlockUserError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.lockOrUnlockUser = lockOrUnlockUser;
const changeUserNick = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        let { newNick } = req.body;
        newNick = `${newNick}`;
        const nickTester = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
        if (!nickTester.test(newNick)) {
            const errorObj = {
                status: 400,
                place: "controllers-admin-changeUserNick",
                content: `weird newNick! newNick: ${newNick}`,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const nickExist = await models_1.User.findOne({ where: { nick: newNick } });
        if (nickExist) {
            return res.status(200).json({ nickExist: true });
        }
        const user = await models_1.User.findOne({ where: { id: userId } });
        if (!user) {
            const errorObj = {
                status: 400,
                place: "controllers-admin-changeUserNick",
                content: `no creator! userId: ${userId}`,
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
                place: "controllers-admin-changeUserNick",
                content: `changeUserNick transaction error! ${err}`,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        res.status(200).json("ok");
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-admin-changeUserNick";
            err.content = "changeUserNickError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.changeUserNick = changeUserNick;
const changeUserGold = async (req, res, next) => {
    try {
        const { userId, gold } = req.body;
        if (userId !== "all" && (!Number.isInteger(userId) || userId < 0)) {
            const errorObj = {
                status: 400,
                place: "controllers-admin-changeUserGold",
                content: `weird userId! userId: ${userId}`,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        if (!Number.isInteger(gold) || gold === 0) {
            const errorObj = {
                status: 400,
                place: "controllers-admin-changeUserGold",
                content: `invalid gold type! gold(type): ${gold}(${typeof gold})`,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        if (userId === "all" && gold < 0) {
            const errorObj = {
                status: 400,
                place: "controllers-admin-changeUserGold",
                content: `decreasing all users gold is banned!`,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const user = await models_1.User.findOne({ where: { id: userId } });
        if (!user) {
            const errorObj = {
                status: 400,
                place: "controllers-admin-changeUserGold",
                content: `no creator! userId: ${userId}`,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const transaction = await models_1.sequelize.transaction();
        try {
            if (userId === "all") {
                await models_1.User.increment({ gold: gold }, { where: { lockMemo: null }, transaction });
            }
            else {
                user.gold = user.gold + gold < 0 ? 0 : user.gold + gold;
                await user.save({ transaction });
            }
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                status: 400,
                place: "controllers-admin-changeUserGold",
                content: `changeUserGold transaction error! ${err}`,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        res.status(200).json("ok");
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-admin-changeUserGold";
            err.content = "changeUserGoldError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.changeUserGold = changeUserGold;
const changeUserCash = async (req, res, next) => {
    try {
        const { userId, cash } = req.body;
        if (userId !== "all" && (!Number.isInteger(userId) || userId < 0)) {
            const errorObj = {
                status: 400,
                place: "controllers-admin-changeUserCash",
                content: `weird userId! userId: ${userId}`,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        if (!Number.isInteger(cash) || cash === 0) {
            const errorObj = {
                status: 400,
                place: "controllers-admin-changeUserCash",
                content: `invalid cash type! cash(type): ${cash}(${typeof cash})`,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        if (userId === "all" && cash < 0) {
            const errorObj = {
                status: 400,
                place: "controllers-admin-changeUserCash",
                content: `decreasing all users cash is banned!`,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const user = await models_1.User.findOne({ where: { id: userId } });
        if (!user) {
            const errorObj = {
                status: 400,
                place: "controllers-admin-changeUserCash",
                content: `no creator! userId: ${userId}`,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const transaction = await models_1.sequelize.transaction();
        try {
            if (userId === "all") {
                await models_1.User.increment({ cash: cash }, { where: { lockMemo: null }, transaction });
            }
            else {
                user.cash = user.cash + cash < 0 ? 0 : user.cash + cash;
                await user.save({ transaction });
            }
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                status: 400,
                place: "controllers-admin-changeUserCash",
                content: `changeUserCash transaction error! ${err}`,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        res.status(200).json("ok");
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-admin-changeUserCash";
            err.content = "changeUserCashError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.changeUserCash = changeUserCash;
const changeUserItem = async (req, res, next) => {
    try {
        const UserId = Number(req.params.id);
        const { itemCode, itemAmounts } = req.body;
        if (!Number.isInteger(itemAmounts) || itemAmounts === 0) {
            const errorObj = {
                status: 400,
                place: "controllers-admin-changeUserItem",
                content: `invalid itemAmounts! itemAmounts: ${itemAmounts}`,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const itemInfo = (0, common_1.splitCodeToInfo)(itemCode);
        if (!itemInfo) {
            const errorObj = {
                status: 400,
                place: "controllers-admin-changeUserItem",
                content: `weird code! itemCode: ${itemCode}`,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const user = await models_1.User.findOne({ where: { id: UserId } });
        if (!user) {
            const errorObj = {
                status: 400,
                place: "controllers-admin-changeUserItem",
                content: `no creator! UserId: ${UserId}`,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const transaction = await models_1.sequelize.transaction();
        try {
            const existItem = await models_1.Item.findOne({
                where: { UserId, code: itemCode, saleCode: 0 },
            });
            if (existItem) {
                if (itemAmounts < 0) {
                    existItem.amounts =
                        existItem.amounts + itemAmounts < 0
                            ? 0
                            : existItem.amounts + itemAmounts;
                }
                else {
                    existItem.amounts += itemAmounts;
                }
                if (existItem.amounts) {
                    await existItem.save({ transaction });
                }
                else {
                    await existItem.destroy({ transaction });
                }
            }
            else if (itemAmounts > 0) {
                const { itemClass, itemGrade, itemDetail } = itemInfo;
                const { name, korName } = (0, common_1.getNameInfoByCode)(itemCode);
                await models_1.Item.create({
                    itemClass,
                    itemGrade,
                    itemDetail,
                    saleCode: 0,
                    name,
                    korName,
                    code: itemCode,
                    amounts: itemAmounts,
                    UserId,
                }, { transaction });
            }
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                status: 400,
                place: "controllers-admin-changeUserItem",
                content: `changeUserItem transaction error! ${err}`,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        res.status(200).json("ok");
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-admin-changeUserItem";
            err.content = "changeUserItemError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.changeUserItem = changeUserItem;
