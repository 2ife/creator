import bcrypt from "bcrypt";
import passport from "passport";
import { RequestHandler } from "express";
import { User, Item, sequelize } from "../models";
import { ReqError } from "./common";
const testLoginInfo = (category: "nick" | "id" | "password", text: string) => {
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
const join: RequestHandler = async (req, res, next) => {
  try {
    const { nick, id, password, passwordCheck } = req.body;
    const nickTest = testLoginInfo("nick", nick);
    const idTest = testLoginInfo("id", id);
    const passwordTest = testLoginInfo("password", password);
    if (
      !nick ||
      !id ||
      !password ||
      !passwordCheck ||
      password !== passwordCheck ||
      !nickTest ||
      !idTest ||
      !passwordTest
    ) {
      const errorObj = {
        status: 400,
        place: "controllers-auth-join",
        content: "banned join",
      };
      const error = new ReqError(errorObj, errorObj.content);
      return next(error);
    }
    const exNick = await User.findOne({ where: { nick } });
    const exId = await User.findOne({ where: { loginId: id } });
    if (exNick || exId) {
      return res.status(200).json({
        nickExist: exNick === null ? false : true,
        idExist: exId === null ? false : true,
      });
    }
    const hash = await bcrypt.hash(password, 12);
    const transaction = await sequelize.transaction();
    try {
      const user = await User.create(
        {
          loginId: id,
          nick,
          password: hash,
          level: 1,
          exp: 0,
          marketCommisionDiscount: "0",
          gold: 0,
          cash: 100000,
        },
        { transaction }
      );
      await Item.create(
        {
          name: "breathe_of_creation",
          korName: "창조의 숨결",
          code: "7_0_1",
          itemClass: 7,
          itemGrade: 0,
          itemDetail: "1",
          amounts: 10,
          saleCode: 0,
          UserId: user.id,
        },
        { transaction }
      );
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj = {
        status: 400,
        place: "controllers-auth-join",
        content: "join transaction error",
      };
      throw new ReqError(errorObj, err.message);
    }
    return res.status(200).json("ok");
  } catch (err: any) {
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
const checkNick: RequestHandler = async (req, res, next) => {
  try {
    const { nick } = req.body;
    const nickTest = testLoginInfo("nick", nick);
    if (!nickTest) {
      const errorObj = {
        status: 400,
        place: "controllers-auth-checkNick",
        content: "nickTest fail",
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const exUser = await User.findOne({
      where: { nick },
    });
    if (exUser) {
      res.json({ nickExist: true });
    } else {
      res.json({ nickExist: false });
    }
  } catch (err: any) {
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
const checkId: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.body;
    const idTest = testLoginInfo("id", id);
    if (!idTest) {
      const errorObj = {
        status: 400,
        place: "controllers-auth-checkId",
        content: "idTest fail",
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const exUser = await User.findOne({
      where: { loginId: id },
    });
    if (exUser) {
      res.json({ idExist: true });
    } else {
      res.json({ idExist: false });
    }
  } catch (err: any) {
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
const login: RequestHandler = (req, res, next) => {
  passport.authenticate("local", (authError: any, user: any) => {
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
const logout: RequestHandler = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};
const leave: RequestHandler = async (req, res, next) => {};
const changeNick: RequestHandler = async (req, res, next) => {
  try {
    const UserId = Number(req.user!.id);
    let { newNick } = req.body as { newNick: string };
    newNick = `${newNick}`;
    const nickTester = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
    if (!nickTester.test(newNick)) {
      const errorObj = {
        status: 400,
        place: "controllers-auth-changeNick",
        content: `weird newNick! newNick: ${newNick}`,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const nickExist = await User.findOne({ where: { nick: newNick } });
    if (nickExist) {
      return res.status(200).json({ nickExist: true });
    }
    const user = await User.findOne({ where: { id: UserId } });
    if (!user) {
      const errorObj = {
        status: 400,
        place: "controllers-auth-changeNick",
        content: `no creator! UserId: ${UserId}`,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const transaction = await sequelize.transaction();
    try {
      user.nick = newNick;
      await user.save({ transaction });
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj = {
        status: 400,
        place: "controllers-auth-changeNick",
        content: `changeNick transaction error! ${err}`,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.status(200).json("ok");
  } catch (err: any) {
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
const changePassword: RequestHandler = async (req, res, next) => {
  try {
    const UserId = Number(req.user!.id);
    let { password } = req.body as { password: string };
    password = `${password}`;
    const nickTester = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{6,16}$/;
    if (!nickTester.test(password)) {
      const errorObj = {
        status: 400,
        place: "controllers-auth-changePassword",
        content: `weird password! password: ${password}`,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const user = await User.findOne({ where: { id: UserId } });
    if (!user) {
      const errorObj = {
        status: 400,
        place: "controllers-auth-changePassword",
        content: `no creator! UserId: ${UserId}`,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const hash = await bcrypt.hash(password, 12);
    const transaction = await sequelize.transaction();
    try {
      user.password = hash;
      await user.save({ transaction });
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj = {
        status: 400,
        place: "controllers-auth-changePassword",
        content: `changePassword transaction error! ${err}`,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.status(200).json("ok");
  } catch (err: any) {
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
export {
  join,
  // requestPhoneVerify,
  // checkVerifyCode,
  checkNick,
  checkId,
  login,
  logout,
  leave,
  changeNick,
  changePassword,
};
