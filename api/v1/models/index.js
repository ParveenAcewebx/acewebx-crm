require("dotenv").config();
const config = require("../../../config/db.config");
const { Sequelize, Op } = require("sequelize");

const dbObj = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  
  port: process.env.DB_PORT,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.dbObj = dbObj;
db.Op = Op;
db.candidateObj = require("./candidate.models")(dbObj, Sequelize);



dbObj.sync({ force: false });
module.exports = db;