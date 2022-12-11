const { Sequelize, Model, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const ModelInitiater = require('./models');
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: 'postgres',
});

async function db_initialize() {
  try {
    await sequelize.authenticate().then(() => {
      console.log('Connection has been established successfully.');
      return true;
    });
    await ModelInitiater(sequelize, Model, DataTypes);
    await sequelize.sync({ alter: true });
    const models = sequelize.models;
    Object.keys(models).forEach((key) => {
      if ('associate' in models[key]) {
        models[key].associate(models);
      }
    });
    console.log('models>>>>>>>>>', models);
    return sequelize;
  } catch (error) {
    console.error('Error in Database', error);
    throw error;
  }
}

module.exports = db_initialize;
