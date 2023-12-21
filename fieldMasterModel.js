const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const FieldMaster = sequelize.define('FieldMaster', {
  Ncode: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  FieldName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  FieldType: {
    type: DataTypes.STRING,
  },
  FieldValue: {
    type: DataTypes.TEXT,
  },
  FieldRequired: {
    type: DataTypes.CHAR(1),
  },
  IsActive: {
    type: DataTypes.CHAR(1),
  },
  CreatedOn: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  ModifiedOn: {
    type: DataTypes.DATE,
  },
});

module.exports = FieldMaster;
