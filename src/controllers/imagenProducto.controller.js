// src/controllers/imagenProducto.controller.js
import { ImagenProducto, Producto } from "../database/syncModels.js";
import cloudinary from "../helpers/cloudinary.js";
import { Op } from "sequelize";
// Subir imagen (asumiendo que ya subiste a Cloudinary)
export const agregarImagen = async (req, res) => {
  try {
    const { producto_id, url, public_id, orden } = req.body;

    // Verifica si existe el producto
    const producto = await Producto.findByPk(producto_id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const imagen = await ImagenProducto.create({
      producto_id,
      url,
      public_id,
      orden,
    });

    res.status(201).json({
      message: "Imagen agregada correctamente",
      imagen,
    });
  } catch (error) {
    console.error("Error al agregar imagen:", error);
    res.status(500).json({ message: "Error al agregar imagen", error: error.message });
  }
};

// Obtener imágenes por producto
export const obtenerImagenesPorProducto = async (req, res) => {
  try {
    const { producto_id } = req.params;

    const imagenes = await ImagenProducto.findAll({
      where: { producto_id },
      order: [["orden", "ASC"]],
    });

    res.json(imagenes);
  } catch (error) {
    console.error("Error al obtener imágenes:", error);
    res.status(500).json({ message: "Error al obtener imágenes", error: error.message });
  }
};

 

export const subirImagenesProducto = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No se subieron imágenes" });
    }

    // Verifica si existe el producto
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Consultar cuántas imágenes ya tiene el producto
    const cantidadActual = await ImagenProducto.count({
      where: { producto_id: id },
    });

    // Agregar imágenes con orden correcto
    const imagenes = req.files.map((file, index) => ({
      producto_id: id,
      url: file.path,
      public_id: file.filename,
      orden: cantidadActual + index + 1,
    }));

    const registros = await ImagenProducto.bulkCreate(imagenes);

    res.status(201).json({
      ok: true,
      message: "Imágenes subidas correctamente",
      imagenes: registros,
    });
  } catch (error) {
    console.error("Error al subir imágenes:", error);
    res.status(500).json({ message: "Error al subir imágenes", error: error.message });
  }
};


export const eliminarImagen = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar imagen en la BD
    const imagen = await ImagenProducto.findByPk(id);

    if (!imagen) {
      return res.status(404).json({ message: "Imagen no encontrada" });
    }

    // Eliminar de Cloudinary
    await cloudinary.uploader.destroy(imagen.public_id);

    // Eliminar de la base de datos
    await imagen.destroy();

    res.json({ message: "Imagen eliminada correctamente" });

  } catch (error) {
    console.error("Error al eliminar imagen:", error);
    res.status(500).json({ message: "Error al eliminar imagen", error: error.message });
  }
};

export const buscarProductosPorCategoriaYNombre = async (req, res) => {
  try {
    const { categoria_id, q } = req.query;

    if (!categoria_id || !q) {
      return res.status(400).json({ message: "Faltan parámetros de búsqueda" });
    }

    const productos = await Producto.findAll({
      where: {
        categoria_id,
        nombre: {
          [Op.like]: `%${q}%`,
        },
      },
      attributes: ["id", "nombre", "destacado"],
      include: [
        {
          model: ImagenProducto,
          attributes: ["id", "url", "orden"],
          as: "imagenes",
        },
      ],
      order: [[{ model: ImagenProducto, as: "imagenes" }, "orden", "ASC"]],
    });

    res.json(productos);
  } catch (error) {
    console.error("Error al buscar productos:", error);
    res.status(500).json({ message: "Error al buscar productos", error: error.message });
  }
};