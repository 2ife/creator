import express, { ErrorRequestHandler } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import session from "express-session";
import nunjucks from "nunjucks";
import dotenv from "dotenv";
import passport from "passport";
// import cors from "cors";

import pageRouter from "./routes/page";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import summonerRouter from "./routes/summoner";
import totemRouter from "./routes/totem";
import itemRouter from "./routes/item";
import marketRouter from "./routes/market";
import adminRouter from "./routes/admin";
import helpRouter from "./routes/help";
import { sequelize, Error as MyError } from "./models";
import passportConfig from "./passport";
import { logger } from "./logger";
import helmet from "helmet";
import hpp from "hpp";
// import {createClient} from 'redis'
// import RedisStore from 'connect-redis'

dotenv.config();
// const redisClient = createClient({
//   password: process.env.REDIS_PASSWORD,
//   socket: {
//       host: process.env.REDIS_HOST,
//       port: Number(process.env.REDIS_PORT)
//   },
//   legacyMode:true
// });
// redisClient.connect().catch(console.error);
const app = express();
// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );
passportConfig(); // 패스포트 설정
app.set("port", process.env.PORT || 3000);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

if (process.env.NODE_ENV === "production") {
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
    })
  );
  app.use(hpp());
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}
app.use(express.static(path.join(__dirname, "public"), { maxAge: 2592000000 }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET!,
  proxy: false,
  cookie: {
    httpOnly: true,
    secure: false,
    SameSite: "Lax",
  },
  // store: new RedisStore({ client: redisClient }),
};
if (process.env.NODE_ENV === "production") {
  sessionOption.proxy = true;
  sessionOption.cookie.SameSite = "None";
  sessionOption.cookie.secure = true;
}
app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", pageRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/summoner", summonerRouter);
app.use("/totem", totemRouter);
app.use("/item", itemRouter);
app.use("/market", marketRouter);
app.use("/admin", adminRouter);
app.use("/help", helpRouter);

type errorObj = {
  fatal?: boolean;
  status: number;
  place: string;
  content: string;
  user?: number;
};
class ReqError extends Error {
  declare fatal: boolean;
  declare status: number;
  declare place: string;
  declare content: string;
  declare user: number | null;
  constructor(obj: errorObj, msg: any) {
    super(msg);
    this.fatal = obj.fatal ? obj.fatal : false;
    this.status = obj.status;
    this.place = obj.place;
    this.content = obj.content;
    this.user = obj.user ? obj.user : null;
  }
}

app.use((req, res, next) => {
  const errorObj: errorObj = {
    status: 404,
    place: "app",
    content: `no router: ${req.method} ${req.url}`,
  };
  if (req.user) {
    errorObj.user = req.user.id;
  }
  const error = new ReqError(errorObj, errorObj.content);
  next(error);
});
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({ fatal: err.fatal });
  try {
    logger.error(err.message);
    const { fatal, status, place, content, user } = err;
    MyError.create({
      fatal,
      status,
      place,
      content,
      user,
    });
    if (req.user) {
      req.logout(() => {});
    }
  } catch (err) {
    logger.error("error db 입력 오류!");
  }
};
app.use(errorHandler);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
