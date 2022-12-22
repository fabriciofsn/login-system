const Sequelize = require('sequelize');

const connection = new Sequelize('login', 'root', 'xtm440', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = connection;