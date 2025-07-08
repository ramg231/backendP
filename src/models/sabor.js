// src/models/sabor.js
export default (sequelize, DataTypes) => {
  return sequelize.define("Sabor", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    estado: { type: DataTypes.BOOLEAN, defaultValue: true },
  }, {
    tableName: "sabores",
    timestamps: false,
  });
};
