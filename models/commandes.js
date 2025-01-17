'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commandes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Commandes.init({
    num: DataTypes.STRING,
    email: DataTypes.STRING,
    prix: DataTypes.FLOAT,
    nop: DataTypes.STRING,
    detail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Commandes',
  });
  return Commandes;
};