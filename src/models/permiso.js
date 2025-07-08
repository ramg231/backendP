export default (sequelize, DataTypes) => {
  return sequelize.define("Permiso", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
    descripcion: { type: DataTypes.STRING }
  });
};
