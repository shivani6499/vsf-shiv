const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const DocumentMaster = sequelize.define('DocumentMaster', {
  Ncode: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  DocumentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DocumentType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  DocumentValue: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  DocumentRequired: {
    type: DataTypes.CHAR(1),
    allowNull: false,
  },
  IsActive: {
    type: DataTypes.CHAR(1),
    allowNull: false,
  },
  CreatedOn: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  ModifiedOn: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = DocumentMaster;