export default (sequelize, DataTypes) => {
  return sequelize.define("Producto", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    categoria_id: { type: DataTypes.INTEGER, allowNull: false },
    destacado: { type: DataTypes.BOOLEAN, defaultValue: false }, // ✅ nuevo campo
  });
};
