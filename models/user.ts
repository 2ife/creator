import Sequelize, {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import Summoner from "./summoner";
import Totem from "./totem";
import Item from "./item";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare loginId: string;
  declare nick: string;
  declare password: string;
  declare level: number;
  declare exp: number;
  declare marketCommisionDiscount: string;
  declare gold: number;
  declare cash: number;
  declare cashCode: string | null;
  declare lockMemo: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
  static initiate(sequelize: Sequelize.Sequelize) {
    User.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        loginId: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        level: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        exp: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
        },
        marketCommisionDiscount: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        gold: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        cash: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        cashCode: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        lockMemo: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        deletedAt: Sequelize.DATE,
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate() {
    User.hasMany(Summoner);
    User.hasMany(Totem);
    User.hasMany(Item);
  }
}

export default User;
