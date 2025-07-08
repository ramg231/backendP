// src/models/tamano.js
export default (sequelize, DataTypes) => {
  return sequelize.define("Tamano", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    porciones: {
      type: DataTypes.STRING(20), // ✅ Cambiado de INTEGER a STRING
      allowNull: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: "tamanos",
    timestamps: false,
  });
};
