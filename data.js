const connection = require('./database');
const Sequelize = require('sequelize');

const Data = connection.define('login', {
  email: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

Data.sync({ force: false }).then(() => {
  console.log('Table has been created!');
})
module.exports = Data;