const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Country = sequelize.define('Country', {
  ncode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  countryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  countryShortName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.ENUM('I', 'A'),
    allowNull: false,
  },
});

module.exports = Country;
