import { User, Summoner, Item, Totem } from "../models";
import { Op } from "sequelize";
import { RequestHandler } from "express";
import { splitCodeToInfoWithoutInspection, ReqError } from "./common";
// info:
// fail:
const renderMain: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.render("main", {
        title: "Creator",
      });
    }
    const UserId = req.user.id;
    const creator = await User.findOne({ where: { id: UserId } });
    if (!creator) {
      const errorObj = {
        fatal:true,
        status: 400,
        place: "controllers-page-renderMain",
        content: `no creator! UserId: ${UserId}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const marketDiscount = creator.marketCommisionDiscount;
    if (marketDiscount !== "0") {
      const colonIndex = marketDiscount.indexOf(":");
      const discountEndTime = new Date(
        Number(marketDiscount.slice(colonIndex + 1))
      );
      if (discountEndTime <= new Date()) {
        creator.marketCommisionDiscount = "0";
        await creator.save();
      }
    }
    const { nick, level, exp, gold, cash, marketCommisionDiscount } = creator;
    const expToLevelUp = 10 ** (Math.ceil(level / 10) + 3) * 5 * level;
    const creatorData = {
      nick,
      level,
      exp,
      gold,
      cash,
      marketCommisionDiscount,
      expPercent: ((exp / expToLevelUp) * 100).toFixed(2),
    };
    const summoners = await Summoner.findAll({
      where: { UserId },
      order: [["summonerIndex", "ASC"]],
    });
    let summonersData: {
      summonerIndex: number;
      level: number;
      grade: number;
      mark: number;
    }[] = [];
    for (let i = 0; i < summoners.length; i++) {
      const summonerMark = summoners[i].mark;
      const markGrade =
        summonerMark !== "0"
          ? splitCodeToInfoWithoutInspection(summonerMark).itemGrade
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
    const totemsData: (
      | { name: string; totemIndex: number; grade: number; level: number }
      | { totemIndex: 0 }
    )[] = [
      { totemIndex: 0 },
      { totemIndex: 0 },
      { totemIndex: 0 },
      { totemIndex: 0 },
    ];
    const totems = await Totem.findAll({
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
    const items = await Item.findAll({
      where: { UserId, saleCode: 0, amounts: { [Op.gte]: 1 } },
      order: [
        ["itemClass", "ASC"],
        ["itemGrade", "ASC"],
        ["itemDetail", "ASC"],
      ],
    });
    const itemsData: { [code: string]: { amounts: number } }[] = [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ];
    for (const item of items) {
      const { code, itemClass, amounts } = item;
      itemsData[itemClass - 1][code] = { amounts };
    }
    return res.render("main", {
      title: "Creator",
      creatorData,
      summonersData,
      totemsData,
      creatorStrData: JSON.stringify(creatorData),
      summonersStrData: JSON.stringify(summonersData),
      totemsStrData: JSON.stringify(totemsData),
      itemsStrData: JSON.stringify(itemsData),
    });
  } catch (err: any) {
    if (!err.place) {
      err.fatal = false;
      err.status = 400;
      err.place = "controllers-page-renderMain";
      err.content = "renderMainError";
      err.user = req.user?req.user.id:null;
    }
    return next(err);
  }
};
// info:
// fail:
const renderHelp: RequestHandler = async (req, res, next) => {};
// info:
// fail:
const renderProfile: RequestHandler = async (req, res, next) => {};
export { renderMain, renderHelp, renderProfile };
