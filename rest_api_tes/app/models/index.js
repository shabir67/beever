const config = require("../config/dbConfig");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 0,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/userModel")(sequelize, Sequelize);
db.quotes = require("../models/quotesModel")(sequelize, Sequelize);

db.quotes.belongsToMany(db.user, {
  through: "user_quotes",
  foreignKey: "quoteId",
  otherKey: "userId",
});
db.user.belongsToMany(db.quotes, {
  through: "user_quotes",
  foreignKey: "userId",
  otherKey: "quoteId",
});

module.exports = db;
