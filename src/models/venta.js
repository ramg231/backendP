export default (sequelize, DataTypes) => {
  return sequelize.define("Venta", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nro_venta: { type: DataTypes.STRING, allowNull: false, unique: true },
    fecha: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    usuario_id: { type: DataTypes.INTEGER }
  });
};
