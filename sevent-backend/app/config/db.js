require("dotenv").config();
const Sequelize = require('sequelize');

//Konfigurasi Database dengan menagmbil value dari .env
const db = new Sequelize(
  process.env.DB, 
  process.env.USER, 
  process.env.PASSWORD, 
  {
  host: process.env.HOST,
  dialect: 'mysql'
});

//Mengecek apakah berhasil terhubung ke DB
db.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = db;