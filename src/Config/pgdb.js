const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.PG_DB, process.env.PG_USER,  process.env.PG_PASS, {
    host:  process.env.PG_HOST,
    dialect:'postgres' 
  });

  try {
     sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }