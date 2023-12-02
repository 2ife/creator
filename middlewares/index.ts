import dotenv from "dotenv";
import { RequestHandler } from "express";
import { rateLimit } from "express-rate-limit";

dotenv.config();

const apiLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 100000,
  handler(req, res) {
    if (req.isAuthenticated()) {
      req.logout(() => {});
    }
    res
      .status(429)
      .send("단기간 내 너무 많은 데이터를 요청하여 이후에 접속 바랍니다.");
  },
});

const isLoggedIn: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};

const isAdminLoggedIn: RequestHandler = (req, res, next) => {
  if (
    req.isAuthenticated() &&
    process.env.ADMIN_ID!.includes(req.user.loginId)
  ) {
    next();
  } else {
    res.redirect("/");
  }
};

const isNotLoggedIn: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    req.logout(() => {
      res.redirect("/");
    });
  }
};
export { isLoggedIn, isNotLoggedIn, isAdminLoggedIn, apiLimiter };
