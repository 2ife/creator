"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const nunjucks_1 = __importDefault(require("nunjucks"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const page_1 = __importDefault(require("./routes/page"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const summoner_1 = __importDefault(require("./routes/summoner"));
const totem_1 = __importDefault(require("./routes/totem"));
const item_1 = __importDefault(require("./routes/item"));
const market_1 = __importDefault(require("./routes/market"));
const admin_1 = __importDefault(require("./routes/admin"));
const models_1 = require("./models");
const passport_2 = __importDefault(require("./passport"));
const logger_1 = require("./logger");
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, passport_2.default)(); // 패스포트 설정
app.set("port", process.env.PORT || 8006);
app.set("view engine", "html");
nunjucks_1.default.configure("views", {
    express: app,
    watch: true,
});
models_1.sequelize
    .sync({ force: false })
    .then(() => {
    console.log("데이터베이스 연결 성공");
})
    .catch((err) => {
    console.error(err);
});
if (process.env.NODE_ENV === "production") {
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
    }));
    app.use((0, hpp_1.default)());
    app.use((0, morgan_1.default)("combined"));
}
else {
    app.use((0, morgan_1.default)("dev"));
}
app.use(express_1.default.static(path_1.default.join(__dirname, "public")
// ,{ maxAge: 86400000*30 }
));
app.use("/img", express_1.default.static(path_1.default.join(__dirname, "images"), { maxAge: 86400000 * 30 }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
const sessionOption = {
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
};
app.use((0, express_session_1.default)(sessionOption));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/", page_1.default);
app.use("/auth", auth_1.default);
app.use("/user", user_1.default);
app.use("/summoner", summoner_1.default);
app.use("/totem", totem_1.default);
app.use("/item", item_1.default);
app.use("/market", market_1.default);
app.use("/admin", admin_1.default);
class ReqError extends Error {
    constructor(obj, msg) {
        super(msg);
        this.fatal = obj.fatal ? obj.fatal : false;
        this.status = obj.status;
        this.place = obj.place;
        this.content = obj.content;
        this.user = obj.user ? obj.user : null;
    }
}
app.use((req, res, next) => {
    const errorObj = {
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
const errorHandler = (err, req, res, next) => {
    if (err.content.includes("no router")) {
        res.redirect("/");
    }
    else {
        res.status(err.status || 500).json({ fatal: err.fatal });
    }
    try {
        logger_1.logger.error(err.message);
        const { fatal, status, place, content, user } = err;
        models_1.Error.create({
            fatal,
            status,
            place,
            content,
            user,
        });
        if (req.user) {
            req.logout(() => { });
        }
    }
    catch (err) {
        logger_1.logger.error("error db 입력 오류!");
    }
};
app.use(errorHandler);
app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기중");
});
