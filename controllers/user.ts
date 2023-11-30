import { Item, User, sequelize } from "../models";
import { RequestHandler } from "express";
import { cashItemPriceArr,splitCodeToInfoWithoutInspection,ReqError } from "./common";
// info:
// fail: weirdCode, noTicket
const useMarketDiscountTicket: RequestHandler = async (req, res, next) => {
  try {
    const code = req.params.code;
    const UserId = req.user!.id;
    const { itemClass, itemGrade, itemDetail } =
      splitCodeToInfoWithoutInspection(code);
    if (itemClass !== 7 || itemDetail !== "2") {
      const errorObj = {
        status: 400,
        place: "controllers-user-useMarketDiscountTicket",
        content: `weird code! code: ${code}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const creator = await User.findOne({
      where: { id: UserId },
    });
    if (!creator) {
      const errorObj = {
        fatal:true,
        status: 400,
        place: "controllers-user-useMarketDiscountTicket",
        content: `no creator!`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const ticket = await Item.findOne({
      where: { UserId, code, saleCode: 0 },
    });
    if (!ticket || ticket.amounts < 1) {
      const errorObj = {
        status: 400,
        place: "controllers-user-useMarketDiscountTicket",
        content: `no ticket!`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const marketDiscount = `${itemGrade}:${
      new Date().getTime() + 1000 * 60 * 60
    }`;
    const transaction = await sequelize.transaction();
    try {
      creator.marketCommisionDiscount = marketDiscount;
      await creator.save({ transaction });
      ticket.amounts -= 1;
      if (ticket.amounts) {
        await ticket.save({ transaction });
      } else {
        await ticket.destroy({ transaction });
      }
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj = {
        status: 400,
        place: "controllers-user-useMarketDiscountTicket",
        content: `useMarketDiscountTicket transaction error! ${err}`,
        user: UserId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.status(200).json({ marketDiscount });
  } catch (err: any) {
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
const useOldBook: RequestHandler = async (req, res, next) => {
  try {
    const UserId = req.user!.id;
    const code = req.params.code;
    const amounts = req.body.amounts;
    const { itemClass, itemGrade, itemDetail } =
      splitCodeToInfoWithoutInspection(code);
    if (itemClass !== 7 || itemDetail !== "4") {
      const errorObj = {
        status: 400,
        place: "controllers-user-useOldBook",
        content: `weird code! code: ${code}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (!Number.isInteger(amounts) || amounts < 1) {
      const errorObj = {
        status: 400,
        place: "controllers-user-useOldBook",
        content: `invalid amounts! amounts: ${amounts}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const creator = await User.findOne({
      where: { id: UserId },
    });
    if (!creator) {
      const errorObj = {
        fatal:true,
        status: 400,
        place: "controllers-user-useOldBook",
        content: `no creator!`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const book = await Item.findOne({
      where: { UserId, code, saleCode: 0 },
    });
    if (!book || book.amounts < amounts) {
      const errorObj = {
        fatal:true,
        status: 400,
        place: "controllers-user-useOldBook",
        content: `insufficient book! amounts: ${book?book.amounts:0}`,
        user: UserId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const cash = amounts * (cashItemPriceArr[itemGrade-1]*2.1);
    const transaction = await sequelize.transaction();
    try {
      creator.cash += cash;
      await creator.save({ transaction });
      book.amounts -= amounts;
      if (book.amounts) {
        await book.save({ transaction });
      } else {
        await book.destroy({ transaction });
      }
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj = {
        status: 400,
        place: "controllers-user-useOldBook",
        content: `useOldBook transaction error! ${err}`,
        user: UserId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.status(200).json("ok");
  } catch (err: any) {
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
// info:
// fail:
export { useMarketDiscountTicket, useOldBook };
