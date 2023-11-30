"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
exports.default = () => {
    passport_1.default.use(new passport_local_1.Strategy({
        usernameField: "id",
        passwordField: "password",
        passReqToCallback: false,
    }, async (id, password, done) => {
        try {
            const exUser = await user_1.default.findOne({ where: { loginId: id } });
            if (exUser) {
                const result = await bcrypt_1.default.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                }
                else {
                    done(null, false, { message: "loginError" });
                }
            }
            else {
                done(null, false, { message: "loginError" });
            }
        }
        catch (error) {
            console.error(error);
            done(error);
        }
    }));
};
