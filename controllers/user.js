"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOldBook = exports.useMarketDiscountTicket = void 0;
const models_1 = require("../models");
const common_1 = require("./common");
// info:
// fail: weirdCode, noTicket
const useMarketDiscountTicket = async (req, res, next) => {
    try {
        const code = req.params.code;
        const UserId = req.user.id;
        const { itemClass, itemGrade, itemDetail } = (0, common_1.splitCodeToInfoWithoutInspection)(code);
        if (itemClass !== 7 || itemDetail !== "2") {
            const errorObj = {
                status: 400,
                place: "controllers-user-useMarketDiscountTicket",
                content: `weird code! code: ${code}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const creator = await models_1.User.findOne({
            where: { id: UserId },
        });
        if (!creator) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-user-useMarketDiscountTicket",
                content: `no creator!`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const ticket = await models_1.Item.findOne({
            where: { UserId, code, saleCode: 0 },
        });
        if (!ticket || ticket.amounts < 1) {
            const errorObj = {
                status: 400,
                place: "controllers-user-useMarketDiscountTicket",
                content: `no ticket!`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const marketDiscount = `${itemGrade}:${new Date().getTime() + 1000 * 60 * 60}`;
        const transaction = await models_1.sequelize.transaction();
        try {
            creator.marketCommisionDiscount = marketDiscount;
            await creator.save({ transaction });
            ticket.amounts -= 1;
            if (ticket.amounts) {
                await ticket.save({ transaction });
            }
            else {
                await ticket.destroy({ transaction });
            }
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                status: 400,
                place: "controllers-user-useMarketDiscountTicket",
                content: `useMarketDiscountTicket transaction error! ${err}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        res.status(200).json({ marketDiscount });
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-user-useMarketDiscountTicket";
            err.content = "useMarketDiscountTicketError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.useMarketDiscountTicket = useMarketDiscountTicket;
const useOldBook = async (req, res, next) => {
    try {
        const UserId = req.user.id;
        const code = req.params.code;
        const amounts = req.body.amounts;
        const { itemClass, itemGrade, itemDetail } = (0, common_1.splitCodeToInfoWithoutInspection)(code);
        if (itemClass !== 7 || itemDetail !== "4") {
            const errorObj = {
                status: 400,
                place: "controllers-user-useOldBook",
                content: `weird code! code: ${code}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        if (!Number.isInteger(amounts) || amounts < 1) {
            const errorObj = {
                status: 400,
                place: "controllers-user-useOldBook",
                content: `invalid amounts! amounts: ${amounts}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const creator = await models_1.User.findOne({
            where: { id: UserId },
        });
        if (!creator) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-user-useOldBook",
                content: `no creator!`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const book = await models_1.Item.findOne({
            where: { UserId, code, saleCode: 0 },
        });
        if (!book || book.amounts < amounts) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-user-useOldBook",
                content: `insufficient book! amounts: ${book ? book.amounts : 0}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const cash = amounts * (common_1.cashItemPriceArr[itemGrade - 1] * 2.1);
        const transaction = await models_1.sequelize.transaction();
        try {
            creator.cash += cash;
            await creator.save({ transaction });
            book.amounts -= amounts;
            if (book.amounts) {
                await book.save({ transaction });
            }
            else {
                await book.destroy({ transaction });
            }
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                status: 400,
                place: "controllers-user-useOldBook",
                content: `useOldBook transaction error! ${err}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        res.status(200).json("ok");
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-user-useOldBook";
            err.content = "useOldBookError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.useOldBook = useOldBook;
