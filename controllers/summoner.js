"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSummonerInfo = exports.unequipMark = exports.equipMark = exports.blessSummoner = exports.awakenSummoner = exports.summonItem = exports.createSummoner = exports.updateSummonerInfo = void 0;
const models_1 = require("../models");
const common_1 = require("./common");
const checkItemGradeRate = (level, markGrade, markFantasyEnhanceGrade, blessOfFantasy, owlTotem, only) => {
    const owlTotemLevel = owlTotem ? owlTotem.level : 0;
    let levelWithFantasy = level;
    levelWithFantasy +=
        1.5 * (markGrade ? markGrade : 2 / 3) -
            1 +
            (markFantasyEnhanceGrade * 2) / 10 +
            (only === "item" || only === "exp"
                ? blessOfFantasy.onlyEffect
                : blessOfFantasy.effect) *
                1.5 +
            (owlTotemLevel * 15) / 100;
    levelWithFantasy = Math.floor(levelWithFantasy);
    const levelBasis = (levelWithFantasy - 1) / 16;
    const gradeBasis = Math.floor(levelBasis);
    const gradePoint = levelBasis - gradeBasis;
    const highGrade = gradeBasis + 2;
    return {
        highGrade,
        gradePoint: gradePoint * 100,
    };
};
const getItem = (summonerLevel, mark, BLESS_DATA, totems, only) => {
    let itemGrade = null;
    let itemClass = null;
    let itemDetail = null;
    let fragmentOfCreation = false;
    const randomForGrade = Math.random() * 100;
    const randomForItem = Math.random() * 100;
    const randomForCreation = Math.random() * 100;
    const { markGrade, markFantasyEnhanceGrade, markCreationEnhanceGrade } = getMarkInfo(mark);
    if (only === "fragmentOfCreation" || !only) {
        const eagleTotemLevel = totems[2] ? totems[2].level : 0;
        const CreationPoint = markGrade * 9 -
            6 +
            (markCreationEnhanceGrade * 12) / 10 +
            (!only ? BLESS_DATA[2].effect : BLESS_DATA[2].onlyEffect) * 9 +
            (eagleTotemLevel * 9) / 10;
        if (randomForCreation <= 1 + CreationPoint / 100) {
            fragmentOfCreation = true;
        }
        if (only === "fragmentOfCreation") {
            return { fragmentOfCreation };
        }
    }
    const { highGrade, gradePoint } = checkItemGradeRate(summonerLevel, markGrade, markFantasyEnhanceGrade, BLESS_DATA[3], totems[3], only);
    itemGrade = randomForGrade <= gradePoint ? highGrade : highGrade - 1;
    if (only === "exp") {
        return { itemGrade };
    }
    if (randomForItem <= 14) {
        itemClass = 1;
        itemDetail = "1";
    }
    else if (randomForItem <= 28) {
        itemClass = 1;
        itemDetail = "2";
    }
    else if (randomForItem <= 42) {
        itemClass = 1;
        itemDetail = "3";
    }
    else if (randomForItem <= 49.8) {
        itemClass = 1;
        itemDetail = "4";
    }
    else if (randomForItem <= 63.8) {
        itemClass = 2;
        itemDetail = "1";
    }
    else if (randomForItem <= 77.8) {
        itemClass = 2;
        itemDetail = "2";
    }
    else if (randomForItem <= 91.8) {
        itemClass = 2;
        itemDetail = "3";
    }
    else if (randomForItem <= 99.6) {
        itemClass = 2;
        itemDetail = "4";
    }
    else if (randomForItem <= 99.8) {
        itemClass = 3;
        itemDetail = "0";
    }
    else {
        itemClass = 6;
        const randomForRecipe = Math.random() * 100;
        if (randomForRecipe <= 2.5) {
            itemDetail = "1";
        }
        else if (randomForRecipe <= 5) {
            itemDetail = "2";
        }
        else if (randomForRecipe <= 7.5) {
            itemDetail = "3";
        }
        else if (randomForRecipe <= 10) {
            itemDetail = "4";
        }
        else if (randomForRecipe <= 15) {
            itemDetail = "5";
        }
        else if (randomForRecipe <= 30) {
            itemGrade = 0;
            itemDetail = "0";
        }
        else if (randomForRecipe <= 45) {
            itemDetail = "10";
        }
        else if (randomForRecipe <= 60) {
            itemDetail = "11";
        }
        else if (randomForRecipe <= 75) {
            itemDetail = "12";
        }
        else if (randomForRecipe <= 80) {
            itemDetail = "13";
        }
        else {
            if (itemGrade <= 4) {
                if (randomForRecipe <= 86) {
                    itemDetail = "10";
                }
                else if (randomForRecipe <= 92) {
                    itemDetail = "11";
                }
                else if (randomForRecipe <= 98) {
                    itemDetail = "12";
                }
                else {
                    itemDetail = "13";
                }
            }
            else {
                if (randomForRecipe <= 85) {
                    itemDetail = "6";
                }
                else if (randomForRecipe <= 90) {
                    itemDetail = "7";
                }
                else if (randomForRecipe <= 95) {
                    itemDetail = "8";
                }
                else {
                    itemDetail = "9";
                }
            }
        }
    }
    return {
        code: (0, common_1.joinInfoToCodeWithoutInspection)(itemClass, itemGrade, itemDetail),
        fragmentOfCreation,
    };
};
const getTimeInfo = (summoner) => {
    const currentTime = new Date().getTime();
    const lastCounterTime = summoner.lastCounterTime.getTime();
    const time = currentTime - lastCounterTime;
    return { currentTime, lastCounterTime, time };
};
const getBlessInfo = (blessCode, currentTime, lastCounterTime, time) => {
    let blessList = blessCode.split("_");
    const BLESS_DATA = [
        { grade: 0, endtime: 0, effect: 0, onlyEffect: 0 },
        { grade: 0, endtime: 0, effect: 0, onlyEffect: 0 },
        { grade: 0, endtime: 0, effect: 0, onlyEffect: 0 },
        { grade: 0, endtime: 0, effect: 0, onlyEffect: 0 },
    ];
    blessList.forEach((bless, index) => {
        const colonIndex = bless.indexOf(":");
        const blessGrade = Number(bless.slice(0, colonIndex));
        if (!blessGrade) {
            return;
        }
        BLESS_DATA[index].grade = blessGrade;
        const endtime = Number(bless.slice(colonIndex + 1));
        BLESS_DATA[index].endtime = endtime;
        const blessTime = endtime < currentTime ? endtime - lastCounterTime : time;
        BLESS_DATA[index].effect = blessGrade * (blessTime / time);
        BLESS_DATA[index].onlyEffect = endtime >= currentTime ? blessGrade : 0;
    });
    return { blessList, BLESS_DATA };
};
const getMarkInfo = (markCode) => {
    if (markCode !== "0") {
        const { itemGrade, itemDetail } = (0, common_1.splitCodeToInfoWithoutInspection)(markCode);
        const markEnhanceGradeArr = (0, common_1.getMarkEnhanceGrade)(itemDetail);
        return {
            markGrade: itemGrade,
            markSpeedEnhanceGrade: markEnhanceGradeArr[0],
            markGrowthEnhanceGrade: markEnhanceGradeArr[1],
            markCreationEnhanceGrade: markEnhanceGradeArr[2],
            markFantasyEnhanceGrade: markEnhanceGradeArr[3],
        };
    }
    return {
        markGrade: 0,
        markSpeedEnhanceGrade: 0,
        markGrowthEnhanceGrade: 0,
        markCreationEnhanceGrade: 0,
        markFantasyEnhanceGrade: 0,
    };
};
const getTotemsInfo = async (UserId) => {
    const jaguarTotem = await models_1.Totem.findOne({
        where: { UserId, totemIndex: 1 },
    });
    const bearTotem = await models_1.Totem.findOne({
        where: { UserId, totemIndex: 2 },
    });
    const eagleTotem = await models_1.Totem.findOne({
        where: { UserId, totemIndex: 3 },
    });
    const owlTotem = await models_1.Totem.findOne({
        where: { UserId, totemIndex: 4 },
    });
    return [jaguarTotem, bearTotem, eagleTotem, owlTotem];
};
// update 부분이랑 소환사, 토템, 축복, 문양 등 정보 정리 분리
// summoner, mark, bless, totem
const updateSummonerInfo = async (id, summoner) => {
    try {
        const { currentTime, lastCounterTime, time } = getTimeInfo(summoner);
        const markInfo = getMarkInfo(summoner.mark);
        const { blessList, BLESS_DATA } = getBlessInfo(summoner.bless, currentTime, lastCounterTime, time);
        const totems = await getTotemsInfo(id);
        const jaguarTotem = totems[0];
        let markGrade = markInfo.markGrade ? markInfo.markGrade : 2 / 3;
        const { markSpeedEnhanceGrade } = markInfo;
        let cooltimeDecrease = markGrade * 3 -
            2 +
            (markSpeedEnhanceGrade * 4) / 10 +
            3 * BLESS_DATA[0].effect +
            ((jaguarTotem ? jaguarTotem.level : 0) * 3) / 10;
        const cooltime = Math.round((1000 * 30 * (100 - cooltimeDecrease)) / 100);
        const cooltimeDecreaseForOnly = cooltimeDecrease -
            3 * BLESS_DATA[0].effect +
            3 * BLESS_DATA[0].onlyEffect;
        const cooltimeForOnly = Math.round((1000 * 30 * (100 - cooltimeDecreaseForOnly)) / 100);
        const summonCounter = summoner.summonCounter + Math.floor(time / cooltime);
        let anyBlessEnd = false;
        let currentCooltime = cooltime;
        BLESS_DATA.forEach((bless, index) => {
            if (!bless.grade) {
                return;
            }
            if (!bless.onlyEffect) {
                bless.grade = 0;
                bless.endtime = 0;
                bless.effect = 0;
                bless.onlyEffect = 0;
                blessList[index] = "0";
                anyBlessEnd = true;
                if (index === 0) {
                    cooltimeDecrease -= 3 * BLESS_DATA[0].effect;
                    currentCooltime = Math.round((1000 * 30 * (100 - cooltimeDecrease)) / 100);
                }
            }
        });
        const transaction = await models_1.sequelize.transaction();
        try {
            if (summonCounter) {
                summoner.summonCounter = summonCounter;
                summoner.lastCounterTime = new Date(summoner.lastCounterTime.getTime() +
                    Math.floor(time / cooltime) * cooltime);
            }
            if (anyBlessEnd) {
                summoner.bless = blessList.join("_");
            }
            if (summonCounter || anyBlessEnd) {
                await summoner.save({ transaction });
            }
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                status: 400,
                place: "controllers-summoner-updateSummonerInfo",
                content: `updateSummonerInfo transaction error! ${err}`,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        return {
            currentCooltime,
            cooltimeForOnly,
            summonCounter,
            blessList,
            BLESS_DATA,
            totems,
        };
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-summoner-updateSummonerInfo";
            err.content = "updateSummonerInfoError";
            err.user = null;
        }
        return { error: err };
    }
};
exports.updateSummonerInfo = updateSummonerInfo;
const getExpBonusInfo = (mark, bearTotem, growthBless) => {
    let expBonus = 0;
    if (mark !== "0") {
        const markInfo = (0, common_1.splitCodeToInfoWithoutInspection)(mark);
        const markGrade = markInfo.itemGrade;
        const markGrowthEnhanceGrade = Number(markInfo.itemDetail[1]);
        expBonus +=
            (markGrade ? markGrade : 2 / 3) * 6 -
                4 +
                (markGrowthEnhanceGrade * 4) / 5;
    }
    expBonus += growthBless.effect * 6;
    const bearTotemLevel = bearTotem ? bearTotem.level : 0;
    expBonus += (bearTotemLevel * 6) / 10;
    return expBonus;
};
// info:
// fail: alreadyExist, lowLevel, noLastSummoner, insufficientBreatheOfCreation
const createSummoner = async (req, res, next) => {
    try {
        const summonerIndex = Number(req.params.id);
        const UserId = req.user.id;
        const existSummoners = await models_1.Summoner.findAll({
            where: { UserId },
            order: [["summonerIndex", "DESC"]],
        });
        let targetSummoner = null;
        existSummoners.some((summoner) => {
            if (summoner.summonerIndex === summonerIndex) {
                targetSummoner = summoner;
                return true;
            }
        });
        if (targetSummoner) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-summoner-createSummoner",
                content: `summoner already exist! summonerIndex / targetSummoner: ${summonerIndex} / ${targetSummoner}`,
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
                place: "controllers-summoner-createSummoner",
                content: `no creator!`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        if (creator.level < (summonerIndex - 1) * 10 + 1) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-summoner-createSummoner",
                content: `low level! summonerIndex / creator level: ${summonerIndex} / ${creator.level}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        if (summonerIndex !== 1 && !existSummoners.length) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-summoner-createSummoner",
                content: `first summoner creation needed! summonerIndex ${summonerIndex}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        if (summonerIndex > 1) {
            const lastSummonerIndex = existSummoners[0].summonerIndex;
            if (lastSummonerIndex !== summonerIndex - 1) {
                const errorObj = {
                    fatal: true,
                    status: 400,
                    place: "controllers-summoner-createSummoner",
                    content: `previous summoner creation needed! target summonerIndex / last summonerIndex: ${summonerIndex} / ${lastSummonerIndex}`,
                    user: UserId,
                };
                throw new common_1.ReqError(errorObj, errorObj.content);
            }
        }
        const breatheOfCreation = await models_1.Item.findOne({
            where: { UserId, code: "7_0_1", saleCode: 0 },
        });
        if (!breatheOfCreation || breatheOfCreation.amounts < 1) {
            const errorObj = {
                status: 400,
                place: "controllers-summoner-createSummoner",
                content: `insufficient breatheOfCreation!`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const transaction = await models_1.sequelize.transaction();
        try {
            breatheOfCreation.amounts -= 1;
            if (breatheOfCreation.amounts) {
                await breatheOfCreation.save({ transaction });
            }
            else {
                await breatheOfCreation.destroy({ transaction });
            }
            await models_1.Summoner.create({
                summonerIndex,
                level: 1,
                exp: 0,
                grade: 0,
                summonCounter: summonerIndex === 1 ? 50000 : 10000,
                mark: "0",
                bless: "0_0_0_0",
                UserId,
            }, { transaction });
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                status: 400,
                place: "controllers-summoner-createSummoner",
                content: `createSummoner transaction error! ${err}`,
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
            err.place = "controllers-summoner-createSummoner";
            err.content = "createSummonerError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.createSummoner = createSummoner;
// info: noSummonCounter
// fail: noSummoner,
const summonItem = async (req, res, next) => {
    try {
        const summonerIndex = Number(req.params.id);
        const UserId = req.user.id;
        const summoner = await models_1.Summoner.findOne({
            where: { UserId, summonerIndex },
        });
        if (!summoner) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-summoner-summonItem",
                content: `no summoner! summonerIndex: ${summonerIndex}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const summonerInfo = await updateSummonerInfo(UserId, summoner);
        if (summonerInfo.error) {
            throw summonerInfo.error;
        }
        const { summonCounter, BLESS_DATA, totems } = summonerInfo;
        const mark = summoner.mark;
        if (!summonCounter) {
            return res.status(200).json({ info: "noSummonCounter" });
        }
        let items = {};
        const creator = await models_1.User.findOne({ where: { id: UserId } });
        if (!creator) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-summoner-summonItem",
                content: `no creator!`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const expBonus = getExpBonusInfo(mark, totems[1], BLESS_DATA[1]);
        let fragmentOfCreation = 0;
        let gold = 0;
        for (let i = 0; i < summonCounter; i++) {
            const item = getItem(summoner.level, mark, BLESS_DATA, totems, false);
            const { code } = item;
            const { itemGrade } = (0, common_1.splitCodeToInfoWithoutInspection)(code);
            gold += 2 ** itemGrade;
            if (items[code]) {
                items[code] += 1;
            }
            else {
                items[code] = 1;
            }
            const exp = Math.floor((10 ** (itemGrade - 1) * (100 + expBonus)) / 100);
            const creatorLevelExp = (0, common_1.changeLevelAndExp)("creator", creator.exp, exp, creator.level, -1);
            creator.level = creatorLevelExp.level;
            creator.exp = creatorLevelExp.exp;
            const summonerLevelExp = (0, common_1.changeLevelAndExp)("summoner", summoner.exp, exp, summoner.level, summoner.grade);
            summoner.level = summonerLevelExp.level;
            summoner.exp = summonerLevelExp.exp;
            totems.forEach((totem) => {
                if (totem) {
                    const totemLevelExp = (0, common_1.changeLevelAndExp)("totem", totem.exp, exp, totem.level, totem.grade);
                    totem.level = totemLevelExp.level;
                    totem.exp = totemLevelExp.exp;
                }
            });
            fragmentOfCreation += Number(item.fragmentOfCreation);
        }
        const transaction = await models_1.sequelize.transaction();
        try {
            creator.gold += gold;
            for (const code in items) {
                const itemExist = await models_1.Item.findOne({
                    where: { UserId, code, saleCode: 0 },
                    transaction,
                });
                if (itemExist) {
                    itemExist.amounts += items[code];
                    await itemExist.save({ transaction });
                }
                else {
                    const { name, korName } = (0, common_1.getNameInfoByCode)(code);
                    const { itemClass, itemGrade, itemDetail } = (0, common_1.splitCodeToInfoWithoutInspection)(code);
                    await models_1.Item.create({
                        name,
                        korName,
                        code,
                        itemClass,
                        itemGrade,
                        itemDetail,
                        amounts: items[code],
                        saleCode: 0,
                        UserId,
                    }, { transaction });
                }
            }
            summoner.summonCounter = 0;
            await summoner.save({ transaction });
            totems.forEach(async (totem) => {
                if (totem) {
                    await totem.save({ transaction });
                }
            });
            await creator.save({ transaction });
            if (fragmentOfCreation) {
                const fragmentExist = await models_1.Item.findOne({
                    where: { UserId, code: "7_0_0", saleCode: 0 },
                });
                if (fragmentExist) {
                    fragmentExist.amounts += fragmentOfCreation;
                    await fragmentExist.save({ transaction });
                }
                else {
                    await models_1.Item.create({
                        name: "fragment_of_creation",
                        korName: "창조의 파편",
                        code: "7_0_0",
                        itemClass: 7,
                        itemGrade: 0,
                        itemDetail: "0",
                        amounts: fragmentOfCreation,
                        saleCode: 0,
                        UserId,
                    }, { transaction });
                }
            }
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                status: 400,
                place: "controllers-summoner-summonItem",
                content: `summonItem transaction error! ${err}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        if (fragmentOfCreation) {
            items["7_0_0"] = fragmentOfCreation;
        }
        res.status(200).json({
            gold,
            creatorLevelExpInfo: {
                level: creator.level,
                exp: creator.exp,
            },
            summonerLevel: summoner.level,
            totemsLevel: [
                totems[0]?.level,
                totems[1]?.level,
                totems[2]?.level,
                totems[3]?.level,
            ],
            items,
        });
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-summoner-summonItem";
            err.content = "summonItemError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.summonItem = summonItem;
// info:
// fail: noSummoner, fullGrade, outOfCondition, insufficientBreatheOfCreation
const awakenSummoner = async (req, res, next) => {
    try {
        const summonerIndex = Number(req.params.id);
        const UserId = req.user.id;
        const summoner = await models_1.Summoner.findOne({
            where: { UserId, summonerIndex },
        });
        if (!summoner) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-summoner-awakenSummoner",
                content: `no summoner! summonerIndex: ${summonerIndex}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        if (summoner.grade === 5) {
            const errorObj = {
                status: 400,
                place: "controllers-summoner-awakenSummoner",
                content: `already full grade! summonerIndex: ${summonerIndex}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        if (!(summoner.grade === 0 && summoner.level === 30) &&
            !(summoner.grade === 1 && summoner.level === 50) &&
            !(summoner.grade === 2 && summoner.level === 65) &&
            !(summoner.grade === 3 && summoner.level === 75) &&
            !(summoner.grade === 4 && summoner.level === 90)) {
            const errorObj = {
                status: 400,
                place: "controllers-summoner-awakenSummoner",
                content: `out of awaken condition! summonerIndex: ${summonerIndex}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const neededBreathe = [10, 20, 40, 80, 200][summoner.grade];
        const breatheOfCreation = await models_1.Item.findOne({
            where: { UserId, code: "7_0_1", saleCode: 0 },
        });
        if (!breatheOfCreation || breatheOfCreation.amounts < neededBreathe) {
            const errorObj = {
                status: 400,
                place: "controllers-summoner-awakenSummoner",
                content: `insufficient breatheOfCreation! amounts / needed amounts: ${breatheOfCreation ? breatheOfCreation.amounts : 0} / ${neededBreathe}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const update = await updateSummonerInfo(UserId, summoner);
        if (update.error) {
            throw update.error;
        }
        const levelExpInfo = (0, common_1.changeLevelAndExp)("summoner", summoner.exp, 0, summoner.level, summoner.grade + 1);
        summoner.grade++;
        summoner.level = levelExpInfo.level;
        summoner.exp = levelExpInfo.exp;
        const transaction = await models_1.sequelize.transaction();
        try {
            await summoner.save({ transaction });
            breatheOfCreation.amounts -= neededBreathe;
            if (breatheOfCreation.amounts) {
                await breatheOfCreation.save({ transaction });
            }
            else {
                await breatheOfCreation.destroy({ transaction });
            }
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                status: 400,
                place: "controllers-summoner-awakenSummoner",
                content: `awakenSummoner transaction error! ${err}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        res.status(200).json({
            level: summoner.level,
            grade: summoner.grade,
            neededBreathe,
        });
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-summoner-awakenSummoner";
            err.content = "awakenSummonerError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.awakenSummoner = awakenSummoner;
// info:
// fail: weirdCode, noSummoner, noBless,
const blessSummoner = async (req, res, next) => {
    try {
        const summonerIndex = Number(req.params.id);
        const UserId = req.user.id;
        const { code, blessAmounts } = req.body;
        const { itemClass, itemGrade, itemDetail } = (0, common_1.splitCodeToInfoWithoutInspection)(code);
        const itemDetailNumber = Number(itemDetail);
        const creator = await models_1.User.findOne({ where: { id: UserId } });
        if (!creator) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-summoner-blessSummoner",
                content: "no creator!",
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        if (itemClass !== 4) {
            const errorObj = {
                status: 400,
                place: "controllers-summoner-blessSummoner",
                content: `weird code! code: ${code}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        if (([5, 6, 7].includes(itemDetailNumber) &&
            (!Number.isInteger(blessAmounts) || blessAmounts < 1)) ||
            ([1, 2, 3, 4].includes(itemDetailNumber) && blessAmounts !== 1)) {
            const errorObj = {
                status: 400,
                place: "controllers-summoner-blessSummoner",
                content: `weird amounts! amounts: ${blessAmounts}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const summoner = await models_1.Summoner.findOne({
            where: { UserId, summonerIndex },
        });
        if (!summoner) {
            const errorObj = {
                status: 400,
                place: "controllers-summoner-blessSummoner",
                content: `no summoner! summonerIndex: ${summonerIndex}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const bless = await models_1.Item.findOne({
            where: { UserId, code, saleCode: 0 },
        });
        if (!bless || bless.amounts < blessAmounts) {
            const errorObj = {
                status: 400,
                place: "controllers-summoner-blessSummoner",
                content: `no bless! amounts: ${bless ? bless.amounts : 0}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const summonerInfo = await updateSummonerInfo(UserId, summoner);
        if (summonerInfo.error) {
            throw summonerInfo.error;
        }
        const { cooltimeForOnly, blessList, BLESS_DATA, totems } = summonerInfo;
        const transaction = await models_1.sequelize.transaction();
        try {
            bless.amounts -= blessAmounts;
            if (bless.amounts) {
                await bless.save({ transaction });
            }
            else {
                await bless.destroy({ transaction });
            }
            if ([5, 6, 7].includes(itemDetailNumber)) {
                let items = {};
                let fragmentOfCreation = 0;
                const expBonus = getExpBonusInfo(summoner.mark, totems[1], BLESS_DATA[1]);
                const onlyCounter = Math.round((2 ** (itemGrade - 1) * 10 * 1000 * 60) / cooltimeForOnly);
                for (let i = 0; i < onlyCounter * blessAmounts; i++) {
                    const item = getItem(summoner.level, summoner.mark, BLESS_DATA, totems, ["item", "exp", "fragmentOfCreation"][itemDetailNumber - 5]);
                    if (itemDetailNumber === 7) {
                        fragmentOfCreation += Number(item.fragmentOfCreation);
                        continue;
                    }
                    if (itemDetailNumber === 6) {
                        const exp = Math.floor((10 ** (item.itemGrade - 1) * (100 + expBonus)) / 100);
                        const creatorLevelExp = (0, common_1.changeLevelAndExp)("creator", creator.exp, exp, creator.level, -1);
                        creator.level = creatorLevelExp.level;
                        creator.exp = creatorLevelExp.exp;
                        const summonerLevelExp = (0, common_1.changeLevelAndExp)("summoner", summoner.exp, exp, summoner.level, summoner.grade);
                        summoner.level = summonerLevelExp.level;
                        summoner.exp = summonerLevelExp.exp;
                        totems.forEach((totem) => {
                            if (totem) {
                                const totemLevelExp = (0, common_1.changeLevelAndExp)("totem", totem.exp, exp, totem.level, totem.grade);
                                totem.level = totemLevelExp.level;
                                totem.exp = totemLevelExp.exp;
                            }
                        });
                        continue;
                    }
                    if (itemDetailNumber === 5) {
                        const itemCode = item.code;
                        if (items[itemCode]) {
                            items[itemCode] += 1;
                        }
                        else {
                            items[itemCode] = 1;
                        }
                    }
                }
                if (itemDetailNumber === 6) {
                    await summoner.save({ transaction });
                    totems.forEach(async (totem) => {
                        if (totem) {
                            await totem.save({ transaction });
                        }
                    });
                    await creator.save({ transaction });
                    res.status(200).json({
                        creatorLevelExpInfo: {
                            level: creator.level,
                            exp: creator.exp,
                        },
                        summonerLevelInfo: {
                            level: summoner.level,
                        },
                        totemsLevelInfo: totems.map((totem) => {
                            if (totem) {
                                return { level: totem.level };
                            }
                            else {
                                return null;
                            }
                        }),
                    });
                }
                else if (itemDetailNumber === 7) {
                    if (fragmentOfCreation) {
                        const fragmentExist = await models_1.Item.findOne({
                            where: { UserId, code: "7_0_0", saleCode: 0 },
                        });
                        if (fragmentExist) {
                            fragmentExist.amounts += fragmentOfCreation;
                            await fragmentExist.save({ transaction });
                        }
                        else {
                            await models_1.Item.create({
                                name: "fragment_of_creation",
                                korName: "창조의 파편",
                                code: "7_0_0",
                                itemClass: 7,
                                itemGrade: 0,
                                itemDetail: "0",
                                amounts: fragmentOfCreation,
                                saleCode: 0,
                                UserId,
                            }, { transaction });
                        }
                    }
                    res.status(200).json({ fragmentOfCreation });
                }
                else if (itemDetailNumber === 5) {
                    for (const code in items) {
                        const itemExist = await models_1.Item.findOne({
                            where: { UserId, code, saleCode: 0 },
                            transaction,
                        });
                        if (itemExist) {
                            itemExist.amounts += items[code];
                            await itemExist.save({ transaction });
                        }
                        else {
                            const { name, korName } = (0, common_1.getNameInfoByCode)(code);
                            const { itemClass, itemGrade, itemDetail } = (0, common_1.splitCodeToInfoWithoutInspection)(code);
                            await models_1.Item.create({
                                name,
                                korName,
                                code,
                                itemClass,
                                itemGrade,
                                itemDetail,
                                amounts: items[code],
                                saleCode: 0,
                                UserId,
                            }, { transaction });
                        }
                    }
                    res.status(200).json({ items });
                }
            }
            else {
                blessList[itemDetailNumber - 1] = `${itemGrade}:${new Date().getTime() + 1000 * 60 * 144 * itemGrade}`;
                summoner.bless = blessList.join("_");
                await summoner.save({ transaction });
                res.status(200).json("ok");
            }
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                status: 400,
                place: "controllers-summoner-blessSummoner",
                content: `blessSummoner transaction error! ${err}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-summoner-blessSummoner";
            err.content = "blessSummonerError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.blessSummoner = blessSummoner;
// info:
// fail: weirdCode, noSummoner, noMark,
const equipMark = async (req, res, next) => {
    try {
        const summonerIndex = Number(req.params.id);
        const UserId = req.user.id;
        const { code } = req.body;
        const markInfo = (0, common_1.splitCodeToInfo)(code);
        if (!markInfo) {
            throw new Error(`weird code! code: ${code}`);
        }
        const { itemClass, itemGrade, itemDetail } = markInfo;
        if (itemClass !== 5) {
            const errorObj = {
                status: 400,
                place: "controllers-summoner-equipMark",
                content: `weird code! code: ${code}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const summoner = await models_1.Summoner.findOne({
            where: { UserId, summonerIndex },
        });
        if (!summoner) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-summoner-equipMark",
                content: `no summoner! summonerIndex: ${summonerIndex}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const mark = await models_1.Item.findOne({
            where: { UserId, code, saleCode: 0 },
        });
        if (!mark || mark.amounts < 1) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-summoner-equipMark",
                content: `no mark!`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const update = await updateSummonerInfo(UserId, summoner);
        if (update.error) {
            throw update.error;
        }
        const transaction = await models_1.sequelize.transaction();
        try {
            if (summoner.mark !== "0") {
                const existMark = await models_1.Item.findOne({
                    where: { UserId, code: summoner.mark, saleCode: 0 },
                    transaction,
                });
                if (existMark) {
                    existMark.amounts += 1;
                    await existMark.save({ transaction });
                }
                else {
                    const { name, korName } = (0, common_1.getNameInfoByCode)(summoner.mark);
                    const { itemClass, itemGrade, itemDetail } = (0, common_1.splitCodeToInfoWithoutInspection)(summoner.mark);
                    const markEnhanceGradeArr = (0, common_1.getMarkEnhanceGrade)(itemDetail);
                    await models_1.Item.create({
                        name,
                        korName,
                        code: summoner.mark,
                        itemClass,
                        itemGrade,
                        itemDetail,
                        markSpeedEnhanceGrade: markEnhanceGradeArr[0],
                        markGrowthEnhanceGrade: markEnhanceGradeArr[1],
                        markCreationEnhanceGrade: markEnhanceGradeArr[2],
                        markFantasyEnhanceGrade: markEnhanceGradeArr[3],
                        amounts: 1,
                        saleCode: 0,
                        UserId,
                    }, { transaction });
                }
            }
            mark.amounts -= 1;
            if (mark.amounts) {
                await mark.save({ transaction });
            }
            else {
                await mark.destroy({ transaction });
            }
            summoner.mark = code;
            await summoner.save({ transaction });
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                status: 400,
                place: "controllers-summoner-equipMark",
                content: `equipMark transaction error! ${err}`,
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
            err.place = "controllers-summoner-equipMark";
            err.content = "equipMarkError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.equipMark = equipMark;
// info:
// fail: noSummoner, noMark
const unequipMark = async (req, res, next) => {
    try {
        const summonerIndex = Number(req.params.id);
        const UserId = req.user.id;
        const summoner = await models_1.Summoner.findOne({
            where: { UserId, summonerIndex },
        });
        if (!summoner) {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-summoner-unequipMark",
                content: `no summoner! summonerIndex: ${summonerIndex}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const code = summoner.mark;
        if (code === "0") {
            const errorObj = {
                fatal: true,
                status: 400,
                place: "controllers-summoner-unequipMark",
                content: `no mark! summonerIndex: ${summonerIndex}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const update = await updateSummonerInfo(UserId, summoner);
        if (update.error) {
            throw update.error;
        }
        const transaction = await models_1.sequelize.transaction();
        try {
            const existMark = await models_1.Item.findOne({
                where: { UserId, code, saleCode: 0 },
            });
            if (existMark) {
                existMark.amounts += 1;
                await existMark.save({ transaction });
            }
            else {
                const { name, korName } = (0, common_1.getNameInfoByCode)(code);
                const { itemClass, itemGrade, itemDetail } = (0, common_1.splitCodeToInfoWithoutInspection)(code);
                const { markSpeedEnhanceGrade, markGrowthEnhanceGrade, markCreationEnhanceGrade, markFantasyEnhanceGrade, } = getMarkInfo(code);
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
                    amounts: 1,
                    saleCode: 0,
                    UserId,
                }, { transaction });
            }
            summoner.mark = "0";
            await summoner.save({ transaction });
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                status: 400,
                place: "controllers-summoner-unequipMark",
                content: `unequipMark transaction error! ${err}`,
                user: UserId,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        res.status(200).json({ mark: code });
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-summoner-unequipMark";
            err.content = "unequipMarkError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.unequipMark = unequipMark;
// info: noSummoner
// fail:
const getSummonerInfo = async (req, res, next) => {
    try {
        const summonerIndex = Number(req.params.id);
        const UserId = req.user.id;
        const summoner = await models_1.Summoner.findOne({
            where: { UserId, summonerIndex },
        });
        if (!summoner) {
            return res.status(200).json({ info: "noSummoner" });
        }
        const summonerInfo = await updateSummonerInfo(UserId, summoner);
        if (summonerInfo.error) {
            throw summonerInfo.error;
        }
        const { currentCooltime, summonCounter, BLESS_DATA } = summonerInfo;
        const expToLevelUp = 10 ** (Math.ceil(summoner.level / 10) + 2) * summoner.level;
        res.status(200).json({
            level: summoner.level,
            exp: summoner.exp,
            expPercent: ((summoner.exp / expToLevelUp) * 100).toFixed(2),
            grade: summoner.grade,
            cooltime: Math.round(currentCooltime / 10) / 100,
            summonCounter,
            mark: summoner.mark,
            blessData: BLESS_DATA,
        });
    }
    catch (err) {
        if (!err.place) {
            err.fatal = false;
            err.status = 400;
            err.place = "controllers-summoner-getSummonerInfo";
            err.content = "getSummonerInfoError";
            err.user = req.user ? req.user.id : null;
        }
        return next(err);
    }
};
exports.getSummonerInfo = getSummonerInfo;
