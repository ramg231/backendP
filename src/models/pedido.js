export default (sequelize, DataTypes) => {
  const Pedido = sequelize.define("Pedido", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(20),
      defaultValue: "pendiente",
    },
  }, {
    tableName: "pedidos",
    timestamps: true,
  });

  return Pedido;
};