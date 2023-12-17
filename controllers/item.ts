import { User, Item, sequelize } from "../models";
import { Op } from "sequelize";
import { RequestHandler } from "express";
import {
  cashItemPriceArr,
  splitCodeToInfoWithoutInspection,
  getNameInfoByCode,
  getMarkEnhanceGrade,
  changeLevelAndExp,
  ReqError,
} from "./common";

const showIngredients = (
  itemClass: number,
  itemGrade: number,
  itemDetail: string
): null | { ingredientCode: string; ingredientAmounts: number }[] => {
  const itemDetailNumber = Number(itemDetail);
  if ([1, 2].includes(itemClass)) {
    if ([5, 6, 7, 8, 9, 10, 11, 12].includes(itemDetailNumber)) {
      return [
        {
          ingredientCode: `${itemClass}_${itemGrade}_${itemDetailNumber - 4}`,
          ingredientAmounts: 10,
        },
      ];
    }
  }
  if (itemClass === 3) {
    if ([1, 2, 3, 4].includes(itemDetailNumber)) {
      return [
        {
          ingredientCode: `${itemClass}_${itemGrade}_0`,
          ingredientAmounts: 10,
        },
        {
          ingredientCode: `1_${itemGrade}_${itemDetailNumber + 8}`,
          ingredientAmounts: 1,
        },
        {
          ingredientCode: `2_${itemGrade}_${itemDetailNumber + 8}`,
          ingredientAmounts: 1,
        },
      ];
    }
  }
  if (itemClass === 4) {
    return [
      {
        ingredientCode: `1_${itemGrade}_${itemDetailNumber + 4}`,
        ingredientAmounts: 1,
      },
      {
        ingredientCode: `2_${itemGrade}_${itemDetailNumber + 4}`,
        ingredientAmounts: 1,
      },
    ];
  }
  if (itemClass === 5) {
    if (itemGrade === 1) {
      return [
        { ingredientCode: "1_1_9", ingredientAmounts: 1 },
        { ingredientCode: "1_1_10", ingredientAmounts: 1 },
        { ingredientCode: "1_1_11", ingredientAmounts: 1 },
        { ingredientCode: "1_1_12", ingredientAmounts: 1 },
        { ingredientCode: "2_1_9", ingredientAmounts: 1 },
        { ingredientCode: "2_1_10", ingredientAmounts: 1 },
        { ingredientCode: "2_1_11", ingredientAmounts: 1 },
        { ingredientCode: "2_1_12", ingredientAmounts: 1 },
      ];
    }
    if (itemGrade <= 10) {
      return [
        { ingredientCode: `5_${itemGrade - 1}_5555`, ingredientAmounts: 1 },
        { ingredientCode: `1_${itemGrade}_9`, ingredientAmounts: 1 },
        { ingredientCode: `1_${itemGrade}_10`, ingredientAmounts: 1 },
        { ingredientCode: `1_${itemGrade}_11`, ingredientAmounts: 1 },
        { ingredientCode: `1_${itemGrade}_12`, ingredientAmounts: 1 },
        { ingredientCode: `2_${itemGrade}_9`, ingredientAmounts: 1 },
        { ingredientCode: `2_${itemGrade}_10`, ingredientAmounts: 1 },
        { ingredientCode: `2_${itemGrade}_11`, ingredientAmounts: 1 },
        { ingredientCode: `2_${itemGrade}_12`, ingredientAmounts: 1 },
      ];
    }
  }
  if (itemClass === 7) {
    if (itemDetailNumber === 1) {
      return [{ ingredientCode: "7_0_0", ingredientAmounts: 100 }];
    }
    if (itemDetailNumber === 2) {
      return [
        { ingredientCode: `1_${itemGrade}_12`, ingredientAmounts: 1 },
        { ingredientCode: `2_${itemGrade}_12`, ingredientAmounts: 1 },
      ];
    }
    if (itemDetailNumber === 4) {
      return [
        { ingredientCode: `7_${itemGrade}_3`, ingredientAmounts: 10 },
        { ingredientCode: `1_${itemGrade}_9`, ingredientAmounts: 2 },
        { ingredientCode: `1_${itemGrade}_10`, ingredientAmounts: 2 },
        { ingredientCode: `1_${itemGrade}_11`, ingredientAmounts: 2 },
        { ingredientCode: `1_${itemGrade}_12`, ingredientAmounts: 1 },
        { ingredientCode: `2_${itemGrade}_9`, ingredientAmounts: 2 },
        { ingredientCode: `2_${itemGrade}_10`, ingredientAmounts: 2 },
        { ingredientCode: `2_${itemGrade}_11`, ingredientAmounts: 2 },
        { ingredientCode: `2_${itemGrade}_12`, ingredientAmounts: 1 },
      ];
    }
  }
  return null;
};
const showMarkEnhanceIngredients = (
  itemClass: number,
  itemGrade: number,
  markEnhanceGradeArr: number[],
  enhanceIndex: number
): null | { ingredientCode: string; ingredientAmounts: number }[] => {
  if (itemClass === 5) {
    const targetEnhanceGrade = markEnhanceGradeArr[enhanceIndex];
    const itemDetailPart = enhanceIndex + 5;
    return [
      {
        ingredientCode: `1_${itemGrade}_${itemDetailPart}`,
        ingredientAmounts: targetEnhanceGrade + 1,
      },
      {
        ingredientCode: `2_${itemGrade}_${itemDetailPart}`,
        ingredientAmounts: targetEnhanceGrade + 1,
      },
    ];
  }
  return null;
};
const getRecipeCodeOfItem = (code: string) => {
  const itemInfo = splitCodeToInfoWithoutInspection(code);
  const { itemClass, itemGrade, itemDetail } = itemInfo;
  const itemDetailNumber = Number(itemDetail);
  let gradePart: number = itemGrade;
  let detailPart: string | null = null;
  if (itemClass === 3 && [1, 2, 3, 4].includes(itemDetailNumber)) {
    detailPart = itemDetailNumber.toString();
  } else if (
    (itemClass === 4 &&
      itemGrade > 4 &&
      [1, 2, 3, 4].includes(itemDetailNumber)) ||
    (itemClass === 4 && [5, 6, 7].includes(itemDetailNumber))
  ) {
    detailPart = (itemDetailNumber + 5).toString();
  } else if (itemClass === 5) {
    detailPart = "5";
  } else if (itemClass === 7 && itemDetailNumber === 1) {
    gradePart = 0;
    detailPart = "0";
  } else if (itemClass === 7 && itemDetailNumber === 2) {
    detailPart = "13";
  } else {
    return null;
  }
  return `6_${gradePart}_${detailPart}`;
};
// info:
// fail: lowLevel, weirdCode, invalidAmounts, insufficientRecipes, insufficientIngredients
const makeItem: RequestHandler = async (req, res, next) => {
  try {
    const UserId = req.user!.id;
    const code = req.params.code;
    const amounts = req.body.amounts;
    if (
      typeof amounts !== "number" ||
      !Number.isInteger(amounts) ||
      amounts < 1
    ) {
      const errorObj = {
        status: 400,
        place: "controllers-item-makeItem",
        content: `invalid amounts(req.body): ${amounts}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const { itemClass, itemGrade, itemDetail } =
      splitCodeToInfoWithoutInspection(code);
    const creator = await User.findOne({
      where: { id: UserId },
    });
    if (!creator) {
      const errorObj = {
        fatal: true,
        status: 400,
        place: "controllers-item-makeItem",
        content: `no creator! UserId: ${UserId}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (creator.lockMemo) {
      const errorObj = {
        fatal: true,
        status: 400,
        place: "controllers-item-makeItem",
        content: `locked creator! UserId: ${UserId}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (itemGrade >= 4 && creator.level < (itemGrade - 1) * 10) {
      const errorObj = {
        status: 400,
        place: "controllers-item-makeItem",
        content: `low level! creator level: ${creator.level}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (itemClass === 5) {
      const wholeMarks = await Item.findAll({
        where: {
          UserId,
          name: "mark_of_summoner",
          amounts: { [Op.gte]: 1 },
          saleCode: 0,
        },
      });
      const markTotalAmounts = wholeMarks.reduce(
        (amountsAccumulator, mark) => amountsAccumulator + mark.amounts,
        0
      );
      if (markTotalAmounts + amounts > 135) {
        const errorObj = {
          status: 400,
          place: "controllers-item-makeItem",
          content: `max mark amounts exceed!`,
          user: UserId,
        };
        throw new ReqError(errorObj, errorObj.content);
      }
    }
    const targetRecipeCode = getRecipeCodeOfItem(code);
    let targetRecipe;
    if (targetRecipeCode) {
      targetRecipe = await Item.findOne({
        where: {
          UserId,
          code: targetRecipeCode,
          saleCode: 0,
        },
      });
      if (!targetRecipe || targetRecipe.amounts < amounts) {
        const errorObj = {
          status: 400,
          place: "controllers-item-makeItem",
          content: `insufficient recipes! recipe amounts: ${targetRecipe?.amounts}`,
          user: UserId,
        };
        throw new ReqError(errorObj, errorObj.content);
      }
    }
    const ingredients = showIngredients(itemClass, itemGrade, itemDetail);
    if (!ingredients) {
      const errorObj = {
        status: 400,
        place: "controllers-item-makeItem",
        content: `weird code! code: ${code}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const myIngredients: Item[] = [];
    for (const ingredient of ingredients) {
      const { ingredientCode, ingredientAmounts } = ingredient;
      const item = await Item.findOne({
        where: {
          UserId,
          code: ingredientCode,
          saleCode: 0,
        },
      });
      if (!item || item.amounts < amounts * ingredientAmounts) {
        const errorObj = {
          status: 400,
          place: "controllers-item-makeItem",
          content: `insufficient ingredients! ${code}: ingredient amounts / needed amounts: ${
            item?.amounts
          } / ${amounts * ingredientAmounts}`,
          user: UserId,
        };
        throw new ReqError(errorObj, errorObj.content);
      }
      myIngredients.push(item);
    }
    let success = 0;
    for (let i = 0; i < amounts; i++) {
      const randomToMake = Math.random() * 100;
      const successRate = 0.8 ** (itemGrade - 1) * (80 + 0.6 * creator.level);
      let exp = 9 ** (itemGrade - 1) * 2;
      if (randomToMake <= successRate) {
        exp *= 9;
        success++;
      }
      const currentLevelAndExp = changeLevelAndExp(
        "creator",
        creator.exp,
        exp,
        creator.level,
        -1
      );
      creator.level = currentLevelAndExp.level;
      creator.exp = currentLevelAndExp.exp;
    }
    const fail = amounts - success;
    const transaction = await sequelize.transaction();
    try {
      await creator.save({ transaction });
      const targetItem = await Item.findOne({
        where: {
          UserId,
          code,
          saleCode: 0,
        },
        transaction,
      });
      if (targetItem) {
        targetItem.amounts += success;
        await targetItem.save({ transaction });
      } else {
        const { name, korName } = getNameInfoByCode(code)!;
        if (itemClass === 5) {
          await Item.create(
            {
              name,
              korName,
              code,
              itemClass,
              itemGrade,
              itemDetail,
              markSpeedEnhanceGrade: 0,
              markGrowthEnhanceGrade: 0,
              markCreationEnhanceGrade: 0,
              markFantasyEnhanceGrade: 0,
              amounts: success,
              saleCode: 0,
              UserId,
            },
            { transaction }
          );
        } else {
          await Item.create(
            {
              name,
              korName,
              code,
              itemClass,
              itemGrade,
              itemDetail,
              amounts: success,
              saleCode: 0,
              UserId,
            },
            { transaction }
          );
        }
      }
      if (targetRecipe) {
        targetRecipe.amounts -= amounts;
        if (targetRecipe.amounts) {
          await targetRecipe.save({ transaction });
        } else {
          await targetRecipe.destroy({ transaction });
        }
      }
      for (let i = 0; i < ingredients.length; i++) {
        const { ingredientAmounts } = ingredients[i];
        const targetIngredient = myIngredients[i];
        if (targetIngredient.itemClass === 5) {
          targetIngredient.amounts -= success * ingredientAmounts;
        } else {
          targetIngredient.amounts -= amounts * ingredientAmounts;
        }
        if (targetIngredient.amounts) {
          await targetIngredient.save({ transaction });
        } else {
          await targetIngredient.destroy({ transaction });
        }
      }
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj = {
        status: 400,
        place: "controllers-item-makeItem",
        content: `makeItem transaction error! ${err}`,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.json({
      creatorLevelExpInfo: { level: creator.level, exp: creator.exp },
      success,
      fail,
    });
  } catch (err: any) {
    if (!err.place) {
      err.fatal = false;
      err.status = 400;
      err.place = "controllers-item-makeItem";
      err.content = "makeItemError";
      err.user = req.user ? req.user.id : null;
    }
    return next(err);
  }
};

// info:
// fail: wrongEnhanceIndex, noMark, fullEnhanced, weirdCode, insufficientIngredients
const enhanceMark: RequestHandler = async (req, res, next) => {
  try {
    const UserId = req.user!.id;
    const creator = await User.findOne({
      where: { id: UserId },
    });
    if (!creator) {
      const errorObj = {
        fatal: true,
        status: 400,
        place: "controllers-item-enhanceMark",
        content: `no creator! UserId: ${UserId}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (creator.lockMemo) {
      const errorObj = {
        fatal: true,
        status: 400,
        place: "controllers-item-enhanceMark",
        content: `locked creator! UserId: ${UserId}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const code = req.params.code;
    const itemInfo = splitCodeToInfoWithoutInspection(code);
    const { itemClass, itemGrade } = itemInfo;
    let { itemDetail } = itemInfo;
    const { enhanceIndex } = req.body;
    if (![0, 1, 2, 3].includes(enhanceIndex)) {
      const errorObj = {
        status: 400,
        place: "controllers-item-enhanceMark",
        content: `wrong enhanceIndex! enhanceIndex: ${enhanceIndex}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const markDetailList = getMarkEnhanceGrade(itemDetail);
    const targetEnhancePart = markDetailList[enhanceIndex];
    if (targetEnhancePart === 5) {
      const errorObj = {
        status: 400,
        place: "controllers-item-enhanceMark",
        content: `full enhanced! enhanceIndex: ${enhanceIndex}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const mark = await Item.findOne({
      where: { UserId, code, saleCode: 0 },
    });
    if (!mark || mark.amounts < 1) {
      const errorObj = {
        status: 400,
        place: "controllers-item-enhanceMark",
        content: "no mark!",
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const ingredients = showMarkEnhanceIngredients(
      itemClass,
      itemGrade,
      markDetailList,
      enhanceIndex
    );
    if (!ingredients) {
      const errorObj = {
        status: 400,
        place: "controllers-item-enhanceMark",
        content: `weird code! code: ${code}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const myIngredients: Item[] = [];
    for (const ingredient of ingredients) {
      const { ingredientCode, ingredientAmounts } = ingredient;
      const item = await Item.findOne({
        where: {
          UserId,
          code: ingredientCode,
          saleCode: 0,
        },
      });
      if (!item || item.amounts < ingredientAmounts) {
        const errorObj = {
          status: 400,
          place: "controllers-item-enhanceMark",
          content: `insufficient ingredients! ${code}: ingredient amounts / needed amounts: ${item?.amounts} / ${ingredientAmounts}`,
          user: UserId,
        };
        throw new ReqError(errorObj, errorObj.content);
      }
      myIngredients.push(item);
    }
    const randomForEnhance = Math.random() * 100;
    let success = false;
    let newCode = code;
    if (randomForEnhance <= [80, 60, 40, 20, 10][targetEnhancePart]) {
      success = true;
      markDetailList[enhanceIndex] = targetEnhancePart + 1;
      itemDetail = markDetailList.join("");
      newCode = `${itemClass}_${itemGrade}_${itemDetail}`;
    }
    const transaction = await sequelize.transaction();
    try {
      if (success) {
        mark.amounts -= 1;
        if (mark.amounts) {
          await mark.save({ transaction });
        } else {
          await mark.destroy({ transaction });
        }
        const newMark = await Item.findOne({
          where: { UserId, code: newCode, saleCode: 0 },
          transaction,
        });
        if (newMark) {
          newMark.amounts += 1;
          await newMark.save({ transaction });
        } else {
          const { name, korName } = mark;
          await Item.create(
            {
              name,
              korName,
              code: newCode,
              itemClass,
              itemGrade,
              itemDetail,
              markSpeedEnhanceGrade: markDetailList[0],
              markGrowthEnhanceGrade: markDetailList[1],
              markCreationEnhanceGrade: markDetailList[2],
              markFantasyEnhanceGrade: markDetailList[3],
              amounts: 1,
              saleCode: 0,
              UserId,
            },
            { transaction }
          );
        }
      }
      for (let i = 0; i < ingredients.length; i++) {
        const { ingredientAmounts } = ingredients[i];
        const targetIngredient = myIngredients[i];
        targetIngredient.amounts -= ingredientAmounts;
        if (targetIngredient.amounts) {
          await targetIngredient.save({ transaction });
        } else {
          await targetIngredient.destroy({ transaction });
        }
      }
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj = {
        status: 400,
        place: "controllers-item-enhanceMark",
        content: `enhanceMark transaction error! ${err}`,
        user: UserId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.json({ success, newCode, ingredients });
  } catch (err: any) {
    if (!err.place) {
      err.fatal = false;
      err.status = 400;
      err.place = "controllers-item-enhanceMark";
      err.content = "enhanceMarkError";
      err.user = req.user ? req.user.id : null;
    }
    return next(err);
  }
};
const disassembleItem: RequestHandler = async (req, res, next) => {
  try {
    const UserId = req.user!.id;
    const creator = await User.findOne({
      where: { id: UserId },
    });
    if (!creator) {
      const errorObj = {
        fatal: true,
        status: 400,
        place: "controllers-item-disassembleItem",
        content: `no creator! UserId: ${UserId}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (creator.lockMemo) {
      const errorObj = {
        fatal: true,
        status: 400,
        place: "controllers-item-disassembleItem",
        content: `locked creator! UserId: ${UserId}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const code = req.params.code;
    const { itemClass, itemGrade, itemDetail } =
      splitCodeToInfoWithoutInspection(code);
    const itemDetailNumber = Number(itemDetail);
    const { amounts } = req.body;
    if (
      ![3, 6].includes(itemClass) ||
      (itemClass === 3 && itemDetailNumber !== 0) ||
      (itemClass === 6 && itemDetailNumber === 0)
    ) {
      const errorObj = {
        status: 400,
        place: "controllers-item-disassembleItem",
        content: `weird code! code: ${code}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (!Number.isInteger(amounts) || amounts < 1) {
      const errorObj = {
        status: 400,
        place: "controllers-item-disassembleItem",
        content: `weird amounts! amounts: ${amounts}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const item = await Item.findOne({ where: { UserId, saleCode: 0, code } });
    if (!item || item.amounts < amounts) {
      const errorObj = {
        status: 400,
        place: "controllers-item-disassembleItem",
        content: `insufficient item! disassemble amounts / item amounts: ${amounts} / ${
          item ? item.amounts : 0
        }`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const transaction = await sequelize.transaction();
    try {
      item.amounts -= amounts;
      if (item.amounts) {
        await item.save({ transaction });
      } else {
        await item.destroy({ transaction });
      }
      const sheetCode = `7_${itemGrade}_3`;
      const sheetExist = await Item.findOne({
        where: { UserId, saleCode: 0, code: sheetCode },
        transaction,
      });
      if (sheetExist) {
        sheetExist.amounts += amounts;
        await sheetExist.save({ transaction });
      } else {
        const { name, korName } = getNameInfoByCode(sheetCode)!;
        await Item.create(
          {
            name,
            korName,
            code: sheetCode,
            itemClass: 7,
            itemGrade,
            itemDetail: "3",
            amounts,
            saleCode: 0,
            UserId,
          },
          { transaction }
        );
      }
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj = {
        status: 400,
        place: "controllers-item-disassembleItem",
        content: `disassembleItem transaction error! ${err}`,
        user: UserId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.status(200).json("ok");
  } catch (err: any) {
    if (!err.place) {
      err.fatal = false;
      err.status = 400;
      err.place = "controllers-item-disassembleItem";
      err.content = "disassembleItemError";
      err.user = req.user ? req.user.id : null;
    }
    return next(err);
  }
};
const buyCashItem: RequestHandler = async (req, res, next) => {
  try {
    const UserId = req.user!.id;
    const code = req.params.code;
    const { itemClass, itemGrade, itemDetail } =
      splitCodeToInfoWithoutInspection(code);
    const itemDetailNumber = Number(itemDetail);
    const amounts = req.body.buyingAmounts;
    if (
      itemGrade === 0 ||
      ![4, 7].includes(itemClass) ||
      (itemClass === 4 && ![5, 6, 7].includes(itemDetailNumber)) ||
      (itemClass === 7 && itemDetailNumber !== 2)
    ) {
      const errorObj = {
        fatal: true,
        status: 400,
        place: "controllers-item-buyCashItem",
        content: `weird code! code: ${code}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (!Number.isInteger(amounts) || amounts < 1) {
      const errorObj = {
        fatal: true,
        status: 400,
        place: "controllers-item-buyCashItem",
        content: `weird amounts! amounts: ${amounts}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const totalPrice = amounts * cashItemPriceArr[itemGrade - 1];
    const creator = await User.findOne({
      where: { id: UserId },
    });
    if (!creator) {
      const errorObj = {
        fatal: true,
        status: 400,
        place: "controllers-item-buyCashItem",
        content: `no creator! UserId: ${UserId}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (creator.lockMemo) {
      const errorObj = {
        fatal: true,
        status: 400,
        place: "controllers-item-buyCashItem",
        content: `locked creator! UserId: ${UserId}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (creator.cash < totalPrice) {
      const errorObj = {
        status: 400,
        place: "controllers-item-buyCashItem",
        content: `insufficeint cash! cash: ${creator.cash}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const transaction = await sequelize.transaction();
    try {
      creator.cash -= totalPrice;
      await creator.save({ transaction });
      const itemExist = await Item.findOne({
        where: { UserId, saleCode: 0, code },
        transaction,
      });
      if (itemExist) {
        itemExist.amounts += amounts;
        await itemExist.save({ transaction });
      } else {
        const { name, korName } = getNameInfoByCode(code)!;
        await Item.create(
          {
            name,
            korName,
            code,
            itemClass,
            itemGrade,
            itemDetail,
            amounts,
            saleCode: 0,
            UserId,
          },
          { transaction }
        );
      }
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj = {
        status: 400,
        place: "controllers-item-disassembleItem",
        content: `disassembleItem transaction error! ${err}`,
        user: UserId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.json("ok");
  } catch (err: any) {
    if (!err.place) {
      err.fatal = false;
      err.status = 400;
      err.place = "controllers-item-disassembleItem";
      err.content = "disassembleItemError";
      err.user = req.user ? req.user.id : null;
    }
    return next(err);
  }
};
export { makeItem, enhanceMark, disassembleItem, buyCashItem };
