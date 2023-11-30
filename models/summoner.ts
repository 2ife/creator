import Sequelize, {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
} from "sequelize";
import User from "./user";

class Summoner extends Model<
  InferAttributes<Summoner>,
  InferCreationAttributes<Summoner>
> {
  declare id: CreationOptional<number>;
  declare summonerIndex: number;
  declare level: number;
  declare exp: number;
  declare grade: number;
  declare summonCounter: number;
  declare lastCounterTime: CreationOptional<Date>;
  // '0' or '5_3_0415'
  declare mark: string;
  // '0_0_0_0' or '5:time_3:time_0_0'
  declare bless: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
  declare UserId: ForeignKey<User["id"]>;
  static initiate(sequelize: Sequelize.Sequelize) {
    Summoner.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        summonerIndex: {
          type: Sequelize.INTEGER.UNSIGNED,
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
        grade: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        summonCounter: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        lastCounterTime: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        mark: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        bless: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        deletedAt: Sequelize.DATE,
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Summoner",
        tableName: "summoners",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate() {
    Summoner.belongsTo(User);
  }
}

export default Summoner;
