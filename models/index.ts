import Sequelize from "sequelize";
import configObj from "../config/config";
import User from "./user";
import Summoner from "./summoner";
import Totem from "./totem";
import Item from "./item";
import Error from "./error";

const env = (process.env.NODE_ENV as "production" | "test") || "development";
const config = configObj[env];

export const sequelize = new Sequelize.Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

User.initiate(sequelize);
Summoner.initiate(sequelize);
Totem.initiate(sequelize);
Item.initiate(sequelize);
Error.initiate(sequelize);

User.associate();
Summoner.associate();
Totem.associate();
Item.associate();
Error.associate();

export { User, Summoner, Totem, Item, Error };
