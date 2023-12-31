"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importStar(require("sequelize"));
const summoner_1 = __importDefault(require("./summoner"));
const totem_1 = __importDefault(require("./totem"));
const item_1 = __importDefault(require("./item"));
class User extends sequelize_1.Model {
    static initiate(sequelize) {
        User.init({
            id: {
                type: sequelize_1.default.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            loginId: {
                type: sequelize_1.default.STRING(40),
                allowNull: false,
            },
            nick: {
                type: sequelize_1.default.STRING(15),
                allowNull: false,
            },
            password: {
                type: sequelize_1.default.STRING(100),
                allowNull: false,
            },
            level: {
                type: sequelize_1.default.INTEGER.UNSIGNED,
                allowNull: false,
            },
            exp: {
                type: sequelize_1.default.BIGINT.UNSIGNED,
                allowNull: false,
            },
            marketCommisionDiscount: {
                type: sequelize_1.default.STRING(100),
                allowNull: false,
            },
            gold: {
                type: sequelize_1.default.INTEGER.UNSIGNED,
                allowNull: false,
            },
            cash: {
                type: sequelize_1.default.INTEGER.UNSIGNED,
                allowNull: false,
            },
            cashCode: {
                type: sequelize_1.default.STRING(100),
                allowNull: true,
            },
            lockMemo: {
                type: sequelize_1.default.STRING(100),
                allowNull: true,
            },
            createdAt: sequelize_1.default.DATE,
            updatedAt: sequelize_1.default.DATE,
            deletedAt: sequelize_1.default.DATE,
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: "User",
            tableName: "users",
            paranoid: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }
    static associate() {
        User.hasMany(summoner_1.default);
        User.hasMany(totem_1.default);
        User.hasMany(item_1.default);
    }
}
exports.default = User;
