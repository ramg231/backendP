export default (sequelize, DataTypes) => {
  return sequelize.define("RolPermiso", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    rol_id: { type: DataTypes.INTEGER, allowNull: false },
    permiso_id: { type: DataTypes.INTEGER, allowNull: false }
  });
};
