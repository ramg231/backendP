export default (sequelize, DataTypes) => {
  return sequelize.define("MovimientoStock", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    producto_id: { type: DataTypes.INTEGER, allowNull: false },
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    fecha: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    motivo: { type: DataTypes.STRING },
    usuario_id: { type: DataTypes.INTEGER }
  });
};
