"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderMain = void 0;
const models_1 = require("../models");
const sequelize_1 = require("sequelize");
const common_1 = require("./common");
// info:
// fail:
const renderMain = async (req, res, next) => {
  const a = req.headers["x-forwarded-for"];
  console.log(a ? a.split(",") : "no ip");
  try {
    if (!req.user) {
      return res.render("login");
    }
    const UserId = req.user.id;
    const creator = await models_1.User.findOne({ where: { id: UserId } });
    if (!creator) {
      const errorObj = {
        fatal: true,
        status: 400,
        place: "controllers-page-renderMain",
        content: `no creator! UserId: ${UserId}`,
        user: UserId,
      };
      throw new common_1.ReqError(errorObj, errorObj.content);
    }
    if (creator.lockMemo) {
      const errorObj = {
        fatal: true,
        status: 400,
        place: "controllers-page-renderMain",
        content: `locked creator! UserId: ${UserId}`,
        user: UserId,
      };
      throw new common_1.ReqError(errorObj, errorObj.content);
    }
    const marketDiscount = creator.marketCommisionDiscount;
    if (marketDiscount !== "0") {
      const colonIndex = marketDiscount.indexOf(":");
      const discountEndTime = new Date(
        Number(marketDiscount.slice(colonIndex + 1))
      );
      if (discountEndTime <= new Date()) {
        creator.marketCommisionDiscount = "0";
      }
    }
    const transaction = await models_1.sequelize.transaction();
    try {
      await creator.save({ transaction });
      const lastTime = creator.updatedAt;
      const now = new Date();
      if (
        lastTime.getDate() !== now.getDate() ||
        lastTime.getMonth() !== lastTime.getMonth() ||
        lastTime.getFullYear() !== lastTime.getFullYear()
      ) {
        creator.cash += 10000;
        await creator.save({ transaction });
      }
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      const errorObj = {
        status: 400,
        place: "controllers-page-renderMain",
        content: `renderMain transaction error! ${err}`,
        user: UserId,
      };
      throw new common_1.ReqError(errorObj, err.message);
    }
    const { nick, loginId, level, exp, gold, cash, marketCommisionDiscount } =
      creator;
    const expToLevelUp = 10 ** (Math.ceil(level / 10) + 3) * 5 * level;
    const creatorData = {
      loginId,
      nick,
      level,
      exp,
      gold,
      cash,
      marketCommisionDiscount,
      expPercent: ((exp / expToLevelUp) * 100).toFixed(2),
    };
    const summoners = await models_1.Summoner.findAll({
      where: { UserId },
      order: [["summonerIndex", "ASC"]],
    });
    let summonersData = [];
    for (let i = 0; i < summoners.length; i++) {
      const summonerMark = summoners[i].mark;
      const markGrade =
        summonerMark !== "0"
          ? (0, common_1.splitCodeToInfoWithoutInspection)(summonerMark)
              .itemGrade
          : 0;
      const { summonerIndex, level, grade } = summoners[i];
      const summonerData = {
        summonerIndex,
        level,
        grade,
        mark: markGrade,
      };
      summonersData.push(summonerData);
    }
    const totemsData = [
      { totemIndex: 0 },
      { totemIndex: 0 },
      { totemIndex: 0 },
      { totemIndex: 0 },
    ];
    const totems = await models_1.Totem.findAll({
      where: { UserId },
    });
    for (const totem of totems) {
      const { totemIndex, grade, level } = totem;
      const totemName = [
        "jaguar_totem",
        "bear_totem",
        "eagle_totem",
        "owl_totem",
      ][totemIndex - 1];
      totemsData[totemIndex - 1] = {
        name: totemName,
        totemIndex,
        grade,
        level,
      };
    }
    const items = await models_1.Item.findAll({
      where: { UserId, saleCode: 0, amounts: { [sequelize_1.Op.gte]: 1 } },
      order: [
        ["itemClass", "ASC"],
        ["itemGrade", "ASC"],
        ["itemDetail", "ASC"],
      ],
    });
    const itemsData = [{}, {}, {}, {}, {}, {}, {}];
    for (const item of items) {
      const { code, itemClass, amounts } = item;
      itemsData[itemClass - 1][code] = { amounts };
    }
    return res.render("main", {
      creatorData,
      summonersData,
      totemsData,
      creatorStrData: JSON.stringify(creatorData),
      summonersStrData: JSON.stringify(summonersData),
      totemsStrData: JSON.stringify(totemsData),
      itemsStrData: JSON.stringify(itemsData),
    });
  } catch (err) {
    if (!err.place) {
      err.fatal = false;
      err.status = 400;
      err.place = "controllers-page-renderMain";
      err.content = "renderMainError";
      err.user = req.user ? req.user.id : null;
    }
    return next(err);
  }
};
exports.renderMain = renderMain;
