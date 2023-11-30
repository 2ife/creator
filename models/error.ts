import Sequelize, {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

class Error extends Model<
  InferAttributes<Error>,
  InferCreationAttributes<Error>
> {
  declare id: CreationOptional<number>;
  declare fatal: boolean;
  declare status: number;
  declare place: string;
  declare content: string;
  declare user: number | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Error.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        fatal: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        status: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        place: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(1000),
          allowNull: false,
        },
        user: {
          type: Sequelize.INTEGER,
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
        modelName: "Error",
        tableName: "errors",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate() {}
}

export default Error;
