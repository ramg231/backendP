// src/models/productTamanoSabor.js
export default (sequelize, DataTypes) => {
  return sequelize.define("ProductoTamanoSabor", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    saborId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tamanoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: "producto_tamano_sabor",
    timestamps: false,
  });
};
