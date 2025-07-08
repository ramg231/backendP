export default (sequelize, DataTypes) => {
  return sequelize.define("DetalleVenta", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    venta_id: { type: DataTypes.INTEGER, allowNull: false },
    producto_id: { type: DataTypes.INTEGER, allowNull: false },
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    precio_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
  });
};
