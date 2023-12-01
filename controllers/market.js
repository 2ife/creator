"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receivePayment = exports.getSaleInfo = exports.searchItem = exports.buyItem = exports.cancelSale = exports.registerItem = void 0;
const models_1 = require("../models");
const sequelize_1 = require("sequelize");
const common_1 = require("./common");
const itemKorNameList = [
    [
        "원소: 공기",
        "원소: 흙",
        "원소: 물",
        "원소: 불",
        "원소 결정: 공기",
        "원소 결정: 흙",
        "원소 결정: 물",
        "원소 결정: 불",
        "태초의 공기",
        "태초의 흙",
        "태초의 물",
        "태초의 불",
    ],
    [
        "시간의 힘(방울)",
        "공간의 힘(방울)",
        "빛의 힘(방울)",
        "혼돈의 힘(방울)",
        "시간의 힘(덩어리)",
        "공간의 힘(덩어리)",
        "빛의 힘(덩어리)",
        "혼돈의 힘(덩어리)",
        "시간의 정수",
        "공간의 정수",
        "빛의 정수",
        "혼돈의 정수",
    ],
    [
        "나무",
        "재규어 토템 몸체",
        "곰 토템 몸체",
        "독수리 토템 몸체",
        "올빼미 토템 몸체",
    ],
    [
        "축복: 신속",
        "축복: 성장",
        "축복: 창조",
        "축복: 환상",
        "태초의 축복: 신속",
        "태초의 축복: 성장",
        "태초의 축복: 창조",
    ],
    ["소환사의 문양"],
    [
        "조합서 | 창조의 숨결",
        "조합서 | 재규어 토템 몸체",
        "조합서 | 곰 토템 몸체",
        "조합서 | 독수리 토템 몸체",
        "조합서 | 올빼미 토템 몸체",
        "조합서 | 소환사의 문양",
        "조합서 | 축복: 신속",
        "조합서 | 축복: 성장",
        "조합서 | 축복: 창조",
        "조합서 | 축복: 환상",
        "조합서 | 태초의 축복: 신속",
        "조합서 | 태초의 축복: 성장",
        "조합서 | 태초의 축복: 창조",
        "조합서 | 거래소 수수료 인하 티켓",
    ],
    ["창조의 파편", "창조의 숨결", "거래소 수수료 인하 티켓"],
];
const searchByKorName = (itemClass, text) => {
    const targetDetailList = [];
    if (!text) {
        return targetDetailList;
    }
    const itemList = itemKorNameList[itemClass - 1];
    for (let i = 0; i < itemList.length; i++) {
        const item = itemList[i];
        if (item.includes(text)) {
            if ([1, 2, 4].includes(itemClass)) {
                targetDetailList.push((i + 1).toString());
            }
            else if (itemClass === 5) {
                break;
            }
            else {
                targetDetailList.push(i.toString());
            }
        }
    }
    return targetDetailList;
};
// info:
// fail:
const registerItem = async (req, res, next) => {
    try {
        const UserId = req.user.id;
        const creator = await models_1.User.findOne({
            where: { id: UserId },
        });
        if (!creator) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-market-registerItem",
                content: `no creator! UserId: ${UserId}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        if (creator.lockMemo) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-market-registerItem",
                content: `locked creator! UserId: ${UserId}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const code = req.params.code;
        const { registerAmounts, registerPrice } = req.body;
        if (!Number.isInteger(registerAmounts) || registerAmounts <= 0) {
            const errorObj = {
                status: 400,
                place: "controllers-market-registerItem",
                content: `invalid amounts! amounts: ${registerAmounts}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        if (!Number.isInteger(registerPrice) || registerPrice < 1) {
            const errorObj = {
                status: 400,
                place: "controllers-market-registerItem",
                content: `invalid price! price: ${registerPrice}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const item = await models_1.Item.findOne({
            where: { UserId, saleCode: 0, code },
        });
        if (!item || item.amounts < registerAmounts) {
            const errorObj = {
                status: 400,
                place: "controllers-market-registerItem",
                content: `insufficient item! register amounts / item amounts: ${registerAmounts} / ${item ? item.amounts : 0}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        let sellingItem = null;
        const transaction = await models_1.sequelize.transaction();
        try {
            const { name, korName, code, itemClass, itemGrade, itemDetail, markSpeedEnhanceGrade, markGrowthEnhanceGrade, markCreationEnhanceGrade, markFantasyEnhanceGrade, } = item;
            sellingItem = await models_1.Item.create({
                name,
                korName,
                code,
                itemClass,
                itemGrade,
                itemDetail,
                markSpeedEnhanceGrade,
                markGrowthEnhanceGrade,
                markCreationEnhanceGrade,
                markFantasyEnhanceGrade,
                amounts: registerAmounts,
                saleCode: 1,
                price: registerPrice,
                UserId,
            }, { transaction });
            item.amounts -= registerAmounts;
            if (item.amounts) {
                await item.save({ transaction });
            }
            else {
                await item.destroy({ transaction });
            }
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                status: 400,
                place: "controllers-market-registerItem",
                content: `registerItem transaction error! ${err}`,
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
            err.place = "controllers-market-registerItem";
            err.content = "registerItemError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.registerItem = registerItem;
// info:
// fail:
const cancelSale = async (req, res, next) => {
    try {
        const UserId = req.user.id;
        const creator = await models_1.User.findOne({
            where: { id: UserId },
        });
        if (!creator) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-market-cancelSale",
                content: `no creator! UserId: ${UserId}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        if (creator.lockMemo) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-market-cancelSale",
                content: `locked creator! UserId: ${UserId}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const itemId = Number(req.params.id);
        const { cancelAmounts } = req.body;
        if (!Number.isInteger(cancelAmounts) || cancelAmounts < 1) {
            const errorObj = {
                status: 400,
                place: "controllers-market-cancelSale",
                content: `invalid amounts! amounts: ${cancelAmounts}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const item = await models_1.Item.findOne({
            where: { id: itemId },
        });
        if (!item ||
            item.UserId !== UserId ||
            item.saleCode !== 1 ||
            item.amounts < cancelAmounts) {
            const errorObj = {
                status: 400,
                place: "controllers-market-cancelSale",
                content: `no item! itemId: ${itemId}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const { name, korName, code, itemClass, itemGrade, itemDetail, markSpeedEnhanceGrade, markGrowthEnhanceGrade, markCreationEnhanceGrade, markFantasyEnhanceGrade, } = item;
        const transaction = await models_1.sequelize.transaction();
        try {
            item.amounts -= cancelAmounts;
            if (item.amounts) {
                await item.save({ transaction });
            }
            else {
                await item.destroy({ transaction });
            }
            const itemExist = await models_1.Item.findOne({
                where: { UserId, code, saleCode: 0 },
                transaction,
            });
            if (itemExist) {
                itemExist.amounts += cancelAmounts;
                await itemExist.save({ transaction });
            }
            else {
                await models_1.Item.create({
                    name,
                    korName,
                    code,
                    itemClass,
                    itemGrade,
                    itemDetail,
                    markSpeedEnhanceGrade,
                    markGrowthEnhanceGrade,
                    markCreationEnhanceGrade,
                    markFantasyEnhanceGrade,
                    saleCode: 0,
                    amounts: cancelAmounts,
                    UserId,
                }, { transaction });
            }
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                status: 400,
                place: "controllers-market-cancelSale",
                content: `cancelSale transaction error! ${err}`,
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
            err.place = "controllers-market-cancelSale";
            err.content = "cancelSaleError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.cancelSale = cancelSale;
// info:
// fail:
const buyItem = async (req, res, next) => {
    try {
        const UserId = req.user.id;
        const itemId = Number(req.params.id);
        const { buyingAmounts } = req.body;
        if (!Number.isInteger(buyingAmounts) || buyingAmounts < 1) {
            const errorObj = {
                status: 400,
                place: "controllers-market-buyItem",
                content: `invalid amounts! amounts: ${buyingAmounts}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const item = await models_1.Item.findOne({
            where: { id: itemId },
        });
        if (!item ||
            item.UserId === UserId ||
            item.saleCode !== 1 ||
            item.amounts < buyingAmounts) {
            return res.status(200).json({ info: "noItem" });
        }
        const { name, korName, itemClass, itemGrade, itemDetail, code, price, markSpeedEnhanceGrade, markGrowthEnhanceGrade, markCreationEnhanceGrade, markFantasyEnhanceGrade, } = item;
        const creator = await models_1.User.findOne({ where: { id: UserId } });
        if (!creator) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-market-buyItem",
                content: `no creator! UserId: ${UserId}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        if (creator.lockMemo) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-market-buyItem",
                content: `locked creator! UserId: ${UserId}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const totalPrice = price * buyingAmounts;
        if (creator.gold < totalPrice) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-market-buyItem",
                content: `insufficient gold!`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const transaction = await models_1.sequelize.transaction();
        try {
            creator.gold -= totalPrice;
            await creator.save({ transaction });
            const itemExist = await models_1.Item.findOne({
                where: {
                    UserId,
                    saleCode: 0,
                    code,
                },
                transaction,
            });
            if (itemExist) {
                itemExist.amounts += buyingAmounts;
                await itemExist.save({ transaction });
            }
            else {
                await models_1.Item.create({
                    name,
                    korName,
                    code,
                    itemClass,
                    itemGrade,
                    itemDetail,
                    markSpeedEnhanceGrade,
                    markGrowthEnhanceGrade,
                    markCreationEnhanceGrade,
                    markFantasyEnhanceGrade,
                    saleCode: 0,
                    amounts: buyingAmounts,
                    UserId,
                }, { transaction });
            }
            if (item.amounts === buyingAmounts) {
                item.saleCode = 2;
                await item.save({ transaction });
            }
            else {
                item.amounts -= buyingAmounts;
                await item.save({ transaction });
                await models_1.Item.create({
                    name,
                    korName,
                    code,
                    itemClass,
                    itemGrade,
                    itemDetail,
                    markSpeedEnhanceGrade,
                    markGrowthEnhanceGrade,
                    markCreationEnhanceGrade,
                    markFantasyEnhanceGrade,
                    amounts: buyingAmounts,
                    saleCode: 2,
                    price,
                    UserId: item.UserId,
                }, { transaction });
            }
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                status: 400,
                place: "controllers-market-buyItem",
                content: `buyItem transaction error! ${err}`,
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
            err.place = "controllers-market-buyItem";
            err.content = "buyItemError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.buyItem = buyItem;
// info:
// fail: bannedText, weirdCondition
const searchItem = async (req, res, next) => {
    try {
        const UserId = req.user.id;
        const creator = await models_1.User.findOne({ where: { id: UserId } });
        if (!creator) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-market-searchItem",
                content: `no creator! UserId: ${UserId}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        if (creator.lockMemo) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-market-searchItem",
                content: `locked creator! UserId: ${UserId}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const { searchText, searchClass, searchGrade, markSpeedEnhanceGrade, markGrowthEnhanceGrade, markCreationEnhanceGrade, markFantasyEnhanceGrade, } = req.body;
        // 텍스트 입력 철저히 확인 필요!!!
        const tester = /^[가-힣|: ]{1,}$/;
        const textTest = tester.test(searchText);
        if (searchText && !textTest) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-market-searchItem",
                content: `weird text! ${searchText}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        if (!(0, common_1.inspectItemClass)(searchClass) ||
            ![0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(searchGrade)) {
            const errorObj = {
                status: 400,
                place: "controllers-market-searchItem",
                content: `weird condition! searchClass / searchGrade: ${searchClass} / ${searchGrade}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        let items = [];
        if (searchClass === 5) {
            const markAvailableEnhanceGrade = [0, 1, 2, 3, 4, 5, null];
            if (!markAvailableEnhanceGrade.includes(markSpeedEnhanceGrade) ||
                !markAvailableEnhanceGrade.includes(markGrowthEnhanceGrade) ||
                !markAvailableEnhanceGrade.includes(markCreationEnhanceGrade) ||
                !markAvailableEnhanceGrade.includes(markFantasyEnhanceGrade)) {
                const errorObj = {
                    fatal: true,
                    status: 400,
                    place: "controllers-market-searchItem",
                    content: `weird markDetail! markDetail: ${markSpeedEnhanceGrade}${markGrowthEnhanceGrade}${markCreationEnhanceGrade}${markFantasyEnhanceGrade}`,
                    user: UserId,
                };
                throw new common_1.ReqError(errorObj, errorObj.content);
            }
            if (!searchText || "소환사의 문양".includes(searchText)) {
                items = await models_1.Item.findAll({
                    where: {
                        saleCode: 1,
                        itemClass: searchClass,
                        markSpeedEnhanceGrade: markSpeedEnhanceGrade
                            ? markSpeedEnhanceGrade
                            : { [sequelize_1.Op.lte]: 5 },
                        markGrowthEnhanceGrade: markGrowthEnhanceGrade
                            ? markGrowthEnhanceGrade
                            : { [sequelize_1.Op.lte]: 5 },
                        markCreationEnhanceGrade: markCreationEnhanceGrade
                            ? markCreationEnhanceGrade
                            : { [sequelize_1.Op.lte]: 5 },
                        markFantasyEnhanceGrade: markFantasyEnhanceGrade
                            ? markFantasyEnhanceGrade
                            : { [sequelize_1.Op.lte]: 5 },
                        itemGrade: searchGrade,
                        amounts: { [sequelize_1.Op.gte]: 1 },
                        UserId: { [sequelize_1.Op.not]: UserId },
                    },
                    order: [
                        ["price", "ASC"],
                        ["markSpeedEnhanceGrade", "DESC"],
                        ["markGrowthEnhanceGrade", "DESC"],
                        ["markCreationEnhanceGrade", "DESC"],
                        ["markFantasyEnhanceGrade", "DESC"],
                    ],
                    limit: 300,
                });
            }
        }
        else if (searchText) {
            const targetDetailList = searchByKorName(searchClass, searchText);
            if (targetDetailList.length) {
                items = await models_1.Item.findAll({
                    where: {
                        saleCode: 1,
                        itemClass: searchClass,
                        itemDetail: { [sequelize_1.Op.in]: targetDetailList },
                        itemGrade: searchGrade === 11 ? { [sequelize_1.Op.lte]: 10 } : searchGrade,
                        amounts: { [sequelize_1.Op.gte]: 1 },
                        UserId: { [sequelize_1.Op.not]: UserId },
                    },
                    order: [
                        ["price", "ASC"],
                        ["itemDetail", "DESC"],
                    ],
                    limit: 300,
                });
            }
        }
        else {
            items = await models_1.Item.findAll({
                where: {
                    saleCode: 1,
                    itemClass: searchClass,
                    itemGrade: searchGrade === 11 ? { [sequelize_1.Op.lte]: 10 } : searchGrade,
                    amounts: { [sequelize_1.Op.gte]: 1 },
                    UserId: { [sequelize_1.Op.not]: UserId },
                },
                order: [
                    ["price", "ASC"],
                    ["itemDetail", "DESC"],
                ],
                limit: 300,
            });
        }
        const itemsData = items
            .filter(async (item) => {
            const updateTime = item.updatedAt.getTime();
            const seller = await models_1.User.findOne({ where: { id: item.UserId } });
            return (updateTime < new Date().getTime() + Math.random() * 600000 &&
                seller &&
                seller.lockMemo === null);
        })
            .map((item) => {
            const { id, code, amounts, price } = item;
            return {
                id,
                code,
                amounts,
                price,
            };
        });
        return res.status(200).json({ itemsData });
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-market-searchItem";
            err.content = "searchItemError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.searchItem = searchItem;
const receivePayment = async (req, res, next) => {
    try {
        const UserId = req.user.id;
        const itemId = Number(req.params.id);
        const item = await models_1.Item.findOne({
            where: { id: itemId },
        });
        if (!item || item.UserId !== UserId || item.saleCode !== 2) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-market-receivePayment",
                content: `no item! itemId: ${itemId}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const creator = await models_1.User.findOne({ where: { id: UserId } });
        if (!creator) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-market-receivePayment",
                content: `no creator! UserId: ${UserId}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        if (creator.lockMemo) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-market-receivePayment",
                content: `locked creator! UserId: ${UserId}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const { marketCommisionDiscount } = creator;
        let marketDiscountRate = 0;
        const colonIndex = marketCommisionDiscount.indexOf(":");
        const discountEndTime = Number(marketCommisionDiscount.slice(colonIndex + 1));
        const currentTime = new Date().getTime();
        if (discountEndTime < currentTime) {
            creator.marketCommisionDiscount = "0";
            await creator.save();
        }
        else {
            const discountGrade = Number(marketCommisionDiscount.slice(0, colonIndex));
            marketDiscountRate = discountGrade * 1.5;
        }
        const { amounts, price } = item;
        const payment = Math.floor((amounts * price * (85 + marketDiscountRate)) / 100);
        const transaction = await models_1.sequelize.transaction();
        try {
            creator.gold += payment;
            await creator.save({ transaction });
            await item.destroy({ transaction });
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                status: 400,
                place: "controllers-market-receivePayment",
                content: `receivePayment transaction error! ${err}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        res.status(200).json({ payment });
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-market-receivePayment";
            err.content = "receivePaymentError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.receivePayment = receivePayment;
// info:
// fail:
const getSaleInfo = async (req, res, next) => {
    try {
        const UserId = req.user.id;
        const creator = await models_1.User.findOne({ where: { id: UserId } });
        if (!creator) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-market-getSaleInfo",
                content: `no creator! UserId: ${UserId}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        if (creator.lockMemo) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-market-getSaleInfo",
                content: `locked creator! UserId: ${UserId}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        let sellingItems = [];
        const mySellingItems = await models_1.Item.findAll({
            where: {
                UserId,
                saleCode: { [sequelize_1.Op.in]: [1, 2] },
                amounts: { [sequelize_1.Op.gte]: 1 },
            },
            order: [["code", "ASC"]],
        });
        for (const item of mySellingItems) {
            const { id, code, amounts, saleCode, price } = item;
            sellingItems.push({ id, code, amounts, saleCode, price });
        }
        res.status(200).json({ sellingItems });
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-market-getSaleInfo";
            err.content = "getSaleInfoError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.getSaleInfo = getSaleInfo;
