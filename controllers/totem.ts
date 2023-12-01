import { User, Item, Totem, Summoner, sequelize } from "../models";
import { updateSummonerInfo } from "./summoner";
import { RequestHandler } from "express";
import { changeLevelAndExp, ReqError } from "./common";

// info:
// fail: alreadyExist, insufficientIngredients,
const createTotem: RequestHandler = async (req, res, next) => {
  try {
    const UserId = req.user!.id;
    const creator = await User.findOne({
      where: { id: UserId },
    });
    if (!creator) {
      const errorObj = {
        fatal: true,
        status: 400,
        place: "controllers-totem-createTotem",
        content: `no creator!`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (creator.lockMemo) {
      const errorObj = {
        fatal: true,
        status: 400,
        place: "controllers-totem-createTotem",
        content: `locked creator! UserId: ${UserId}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const totemIndex = Number(req.params.id);
    const existTotem = await Totem.findOne({
      where: { UserId, totemIndex },
    });
    if (existTotem) {
      const errorObj = {
        status: 400,
        place: "controllers-totem-createTotem",
        content: `totem already exist! totemIndex: ${totemIndex}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const breatheOfCreation = await Item.findOne({
      where: { UserId, code: "7_0_1", saleCode: 0 },
    });
    const code = `3_1_${totemIndex}`;
    const totemBody = await Item.findOne({
      where: { UserId, code, saleCode: 0 },
    });
    if (
      !breatheOfCreation ||
      breatheOfCreation.amounts < 1 ||
      !totemBody ||
      totemBody.amounts < 1
    ) {
      const errorObj = {
        status: 400,
        place: "controllers-totem-createTotem",
        content: `insufficient ingredients! breatheOfCreation amounts / totemBody amounts: ${
          breatheOfCreation ? breatheOfCreation.amounts : 0
        } / ${totemBody ? totemBody.amounts : 0}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const summoners = await Summoner.findAll({
      where: { UserId },
    });
    for (const summoner of summoners) {
      const update = await updateSummonerInfo(UserId, summoner);
      if (update.error) {
        throw update.error;
      }
    }
    const transaction = await sequelize.transaction();
    try {
      breatheOfCreation.amounts -= 1;
      if (breatheOfCreation.amounts) {
        await breatheOfCreation.save({ transaction });
      } else {
        await breatheOfCreation.destroy({ transaction });
      }
      totemBody.amounts -= 1;
      if (totemBody.amounts) {
        await totemBody.save({ transaction });
      } else {
        await totemBody.destroy({ transaction });
      }
      await Totem.create(
        {
          totemIndex,
          level: 1,
          exp: 0,
          grade: 0,
          UserId,
        },
        { transaction }
      );
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj = {
        status: 400,
        place: "controllers-totem-createTotem",
        content: `createTotem transaction error! ${err}`,
        user: UserId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.status(200).json("ok");
  } catch (err: any) {
    if (!err.place) {
      err.fatal = false;
      err.status = 400;
      err.place = "controllers-totem-createTotem";
      err.content = "createTotemError";
      err.user = req.user ? req.user.id : null;
    }
    return next(err);
  }
};
// info:
// fail: noTotem, fullGrade, OutOfCondition, insufficientIngredients
const awakenTotem: RequestHandler = async (req, res, next) => {
  try {
    const UserId = req.user!.id;
    const creator = await User.findOne({
      where: { id: UserId },
    });
    if (!creator) {
      const errorObj = {
        fatal: true,
        status: 400,
        place: "controllers-totem-awakenTotem",
        content: `no creator!`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (creator.lockMemo) {
      const errorObj = {
        fatal: true,
        status: 400,
        place: "controllers-totem-awakenTotem",
        content: `locked creator! UserId: ${UserId}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const totemIndex = Number(req.params.id);
    const totem = await Totem.findOne({
      where: { UserId, totemIndex },
    });
    if (!totem) {
      const errorObj = {
        status: 400,
        place: "controllers-totem-awakenTotem",
        content: `no totem! totemIndex: ${totemIndex}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (totem.grade === 9) {
      const errorObj = {
        status: 400,
        place: "controllers-totem-awakenTotem",
        content: `already full grade! totemIndex: ${totemIndex}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (
      !(totem.grade === 0 && totem.level === 10) &&
      !(totem.grade === 1 && totem.level === 20) &&
      !(totem.grade === 2 && totem.level === 30) &&
      !(totem.grade === 3 && totem.level === 40) &&
      !(totem.grade === 4 && totem.level === 50) &&
      !(totem.grade === 5 && totem.level === 60) &&
      !(totem.grade === 6 && totem.level === 70) &&
      !(totem.grade === 7 && totem.level === 80) &&
      !(totem.grade === 8 && totem.level === 90)
    ) {
      const errorObj = {
        status: 400,
        place: "controllers-totem-awakenTotem",
        content: `out of awaken condition! totemIndex: ${totemIndex}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const neededBreathe = (totem.grade + 1) * 10;
    const breatheOfCreation = await Item.findOne({
      where: { UserId, code: "7_0_1", saleCode: 0 },
    });
    const code = `3_${totem.grade + 2}_${totemIndex}`;
    const totemBody = await Item.findOne({
      where: { UserId, code: code, saleCode: 0 },
    });
    if (
      !breatheOfCreation ||
      breatheOfCreation.amounts < neededBreathe ||
      !totemBody ||
      totemBody.amounts < 1
    ) {
      const errorObj = {
        status: 400,
        place: "controllers-totem-awakenTotem",
        content: `insufficient ingredients! breatheOfCreation amounts / totemBody amounts: ${
          breatheOfCreation ? breatheOfCreation.amounts : 0
        } / ${totemBody ? totemBody.amounts : 0}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const summoners = await Summoner.findAll({
      where: { UserId },
    });
    const levelExpInfo = changeLevelAndExp(
      "totem",
      totem.exp,
      0,
      totem.level,
      totem.grade + 1
    );
    totem.grade = totem.grade + 1;
    totem.level = levelExpInfo.level;
    totem.exp = levelExpInfo.exp;
    for (const summoner of summoners) {
      const update = await updateSummonerInfo(UserId, summoner);
      if (update.error) {
        throw update.error;
      }
    }
    const transaction = await sequelize.transaction();
    try {
      breatheOfCreation.amounts -= neededBreathe;
      if (breatheOfCreation.amounts) {
        await breatheOfCreation.save({ transaction });
      } else {
        await breatheOfCreation.destroy({ transaction });
      }
      totemBody.amounts -= 1;
      if (totemBody.amounts) {
        await totemBody.save({ transaction });
      } else {
        await totemBody.destroy({ transaction });
      }
      await totem.save({ transaction });
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj = {
        status: 400,
        place: "controllers-totem-awakenTotem",
        content: `awakenTotem transaction error! ${err}`,
        user: UserId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.status(200).json({
      level: totem.level,
      grade: totem.grade,
      neededBreathe,
    });
  } catch (err: any) {
    if (!err.place) {
      err.fatal = false;
      err.status = 400;
      err.place = "controllers-totem-awakenTotem";
      err.content = "awakenTotemError";
      err.user = req.user ? req.user.id : null;
    }
    return next(err);
  }
};
// info: noTotem
// fail:
const getTotemInfo: RequestHandler = async (req, res, next) => {
  try {
    const UserId = req.user!.id;
    const creator = await User.findOne({
      where: { id: UserId },
    });
    if (!creator) {
      const errorObj = {
        fatal: true,
        status: 400,
        place: "controllers-totem-getTotemInfo",
        content: `no creator!`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (creator.lockMemo) {
      const errorObj = {
        fatal: true,
        status: 400,
        place: "controllers-totem-getTotemInfo",
        content: `locked creator! UserId: ${UserId}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const totemIndex = Number(req.params.id);
    const totem = await Totem.findOne({
      where: { UserId, totemIndex },
    });
    if (!totem) {
      return res.status(200).json({ info: "noTotem" });
    }
    const expToLevelUp = 10 ** (Math.ceil(totem.level / 10) + 3) * totem.level;
    res.status(200).json({
      level: totem.level,
      exp: totem.exp,
      expPercent: ((totem.exp / expToLevelUp) * 100).toFixed(2),
      grade: totem.grade,
    });
  } catch (err: any) {
    if (!err.place) {
      err.fatal = false;
      err.status = 400;
      err.place = "controllers-totem-getTotemInfo";
      err.content = "getTotemInfoError";
      err.user = req.user ? req.user.id : null;
    }
    return next(err);
  }
};
export { createTotem, awakenTotem, getTotemInfo };
