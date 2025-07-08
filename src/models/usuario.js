export default (sequelize, DataTypes) => {
  return sequelize.define("Usuario", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    rol_id: { type: DataTypes.INTEGER, allowNull: false }
  });
};
