'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FieldMaster extends Model {
    static associate(models) {
      // define association here
    }
  }

  FieldMaster.init({
    Ncode: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    FieldName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FieldType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FieldValue: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    FieldRequired: {
      type: DataTypes.ENUM('Y', 'N'),
      allowNull: false,
    },
    IsActive: {
      type: DataTypes.ENUM('I', 'A'),
      allowNull: false,
    },
    CreatedOn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ModifiedOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'FieldMaster', 
  });

  return FieldMaster;
};
