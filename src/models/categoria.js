export default (sequelize, DataTypes) => {
  return sequelize.define("Categoria", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.STRING }
  });
};
