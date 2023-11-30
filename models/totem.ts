import Sequelize, {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
} from "sequelize";
import User from "./user";

class Totem extends Model<
  InferAttributes<Totem>,
  InferCreationAttributes<Totem>
> {
  declare id: CreationOptional<number>;
  declare totemIndex: number;
  declare level: number;
  declare exp: number;
  declare grade: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
  declare UserId: ForeignKey<User["id"]>;
  static initiate(sequelize: Sequelize.Sequelize) {
    Totem.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        totemIndex: {
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
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        deletedAt: Sequelize.DATE,
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Totem",
        tableName: "totems",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate() {
    Totem.belongsTo(User);
  }
}

export default Totem;
