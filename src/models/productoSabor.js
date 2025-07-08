// src/models/productoSabor.js
export default (sequelize, DataTypes) => {
  return sequelize.define("ProductoSabor", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sabor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    tableName: "producto_sabor",
    timestamps: false,
  });
};
