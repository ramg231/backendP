export default (sequelize, DataTypes) => {
  return sequelize.define("ImagenProducto", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    producto_id: { type: DataTypes.INTEGER, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },           // URL segura de Cloudinary
    public_id: { type: DataTypes.STRING, allowNull: false },     // ID de Cloudinary para eliminación
    orden: { type: DataTypes.INTEGER, defaultValue: 1 }          // Para ordenar las imágenes
  });
};
