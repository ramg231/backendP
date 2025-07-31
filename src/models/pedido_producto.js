export default (sequelize, DataTypes) => {
  const PedidoProducto = sequelize.define("PedidoProducto", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pedido_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sabor: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    tamano: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, {
    tableName: "pedido_productos",
    timestamps: false,
  });

  return PedidoProducto;
};