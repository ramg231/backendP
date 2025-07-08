import { Categoria } from "../database/syncModels.js";

// Crear categoría
export const crearCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const nombreMayus = nombre ? nombre.toUpperCase() : '';
    const descripcionMayus = descripcion ? descripcion.toUpperCase() : '';
    const categoria = await Categoria.create({ nombre: nombreMayus, descripcion: descripcionMayus });

    res.status(201).json({
      ok: true,
      message: "Categoría creada con éxito",
      categoria,
    });
  } catch (error) {
    console.error("Error al crear categoría:", error);
    res.status(500).json({ message: "Error al crear categoría", error: error.message });
  }
};

// Listar todas las categorías
export const listarCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({ attributes: ['id', 'nombre'] });

    res.json({
      ok: true,
      message: "Categorías obtenidas correctamente",
      categorias,
    });
  } catch (error) {
    console.error("Error al listar categorías:", error);
    res.status(500).json({ message: "Error al listar categorías", error: error.message });
  }
};

// Obtener una categoría por ID
export const obtenerCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.json(categoria);
  } catch (error) {
    console.error("Error al obtener categoría:", error);
    res.status(500).json({ message: "Error al obtener categoría", error: error.message });
  }
};

// Actualizar categoría
export const actualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    await categoria.update(req.body);

    res.json({
      message: "Categoría actualizada correctamente",
      categoria,
    });
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    res.status(500).json({ message: "Error al actualizar categoría", error: error.message });
  }
};

// Eliminar categoría
export const eliminarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    await categoria.destroy();

    res.json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    res.status(500).json({ message: "Error al eliminar categoría", error: error.message });
  }
};
