import Sequelize, {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
} from "sequelize";
import User from "./user";

class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare korName: string;
  declare code: string;
  declare itemClass: number;
  declare itemGrade: number;
  declare itemDetail: string;
  declare markSpeedEnhanceGrade: number | null;
  declare markGrowthEnhanceGrade: number | null;
  declare markCreationEnhanceGrade: number | null;
  declare markFantasyEnhanceGrade: number | null;
  declare amounts: number;
  declare saleCode:0|1|2;
  declare price: number | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare UserId: ForeignKey<User["id"]>;
  static initiate(sequelize: Sequelize.Sequelize) {
    Item.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        korName: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        code: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        itemClass: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        itemGrade: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        itemDetail: {
          type: Sequelize.STRING(4),
          allowNull: false,
        },
        markSpeedEnhanceGrade: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
        },
        markGrowthEnhanceGrade: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
        },
        markCreationEnhanceGrade: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
        },
        markFantasyEnhanceGrade: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
        },
        amounts: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        saleCode:{
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        price: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Item",
        tableName: "items",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate() {
    Item.belongsTo(User);
  }
}

export default Item;
