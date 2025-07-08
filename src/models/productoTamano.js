// src/models/productoTamano.js
export default (sequelize, DataTypes) => {
  return sequelize.define("ProductoTamano", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tamano_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    tableName: "producto_tamano",
    timestamps: false,
  });
};
