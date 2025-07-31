import { Categoria,Sabor,Tamano } from "../database/syncModels.js";

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


//crear sabores
export const crearSabor = async (req, res) => { 
  try {
    const { nombre, descripcion } = req.body;

    const nombreMayus = nombre ? nombre.toUpperCase() : '';
    const descripcionMayus = descripcion ? descripcion.toUpperCase() : '';
    const sabor = await Sabor.create({ nombre: nombreMayus, descripcion: descripcionMayus });

    res.status(201).json({
      ok: true,
      message: "Sabor creado con éxito",
      sabor,
    });
  } catch (error) {
    console.error("Error al crear sabor:", error);
    res.status(500).json({ message: "Error al crear sabor", error: error.message });
  }
}
// Listar todos los sabores
export const listarSabores = async (req, res) => {  
  try {
    const sabores = await Sabor.findAll({ attributes: ['id', 'nombre'] });

    res.json({
      ok: true,
      message: "Sabores obtenidos correctamente",
      sabores,
    });
  } catch (error) {
    console.error("Error al listar sabores:", error);
    res.status(500).json({ message: "Error al listar sabores", error: error.message });
  }
}
//editar sabores
export const editarSabor = async (req, res) => {
  try {
    const { id } = req.params;
    const sabor = await Sabor.findByPk(id);

    if (!sabor) {
      return res.status(404).json({ message: "Sabor no encontrado" });
    }

    await sabor.update(req.body);

    res.json({
      message: "Sabor actualizado correctamente",
      sabor,
    });
  } catch (error) {
    console.error("Error al actualizar sabor:", error);
    res.status(500).json({ message: "Error al actualizar sabor", error: error.message });
  }
}
//eliminar sabores
export const eliminarSabor = async (req, res) => {  
  try {
    const { id } = req.params;
    const sabor = await Sabor.findByPk(id);

    if (!sabor) {
      return res.status(404).json({ message: "Sabor no encontrado" });
    }

    await sabor.destroy();

    res.json({ message: "Sabor eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar sabor:", error);
    res.status(500).json({ message: "Error al eliminar sabor", error: error.message });
  }
}

//crear tamaño
export const crearTamano = async (req, res) => { 
  try {
    const { nombre, porciones, estado } = req.body;

    const nombreMayus = nombre ? nombre.toUpperCase() : '';
    const tamano = await Tamano.create({ 
      nombre: nombreMayus, 
      porciones, 
      estado: estado !== undefined ? estado : true 
    });

    res.status(201).json({
      ok: true,
      message: "Tamaño creado con éxito",
      tamano,
    });
  } catch (error) {
    console.error("Error al crear tamaño:", error);
    res.status(500).json({ message: "Error al crear tamaño", error: error.message });
  }
}

// Listar todos los tamaños
export const listarTamanos = async (req, res) => {  
  try {
    const tamanos = await Tamano.findAll({ attributes: ['id', 'nombre', 'porciones', 'estado'] });

    res.json({
      ok: true,
      message: "Tamaños obtenidos correctamente",
      tamanos,
    });
  } catch (error) {
    console.error("Error al listar tamaños:", error);
    res.status(500).json({ message: "Error al listar tamaños", error: error.message });
  }
}

//editar tamaño
export const editarTamano = async (req, res) => {
  try {
    const { id } = req.params;
    const tamano = await Tamano.findByPk(id);

    if (!tamano) {
      return res.status(404).json({ message: "Tamaño no encontrado" });
    }

    const { nombre, porciones, estado } = req.body;
    await tamano.update({
      nombre: nombre ? nombre.toUpperCase() : tamano.nombre,
      porciones: porciones !== undefined ? porciones : tamano.porciones,
      estado: estado !== undefined ? estado : tamano.estado
    });

    res.json({
      message: "Tamaño actualizado correctamente",
      tamano,
    });
  } catch (error) {
    console.error("Error al actualizar tamaño:", error);
    res.status(500).json({ message: "Error al actualizar tamaño", error: error.message });
  }
}

//eliminar tamaño
export const eliminarTamano = async (req, res) => {  
  try {
    const { id } = req.params;
    const tamano = await Tamano.findByPk(id);

    if (!tamano) {
      return res.status(404).json({ message: "Tamaño no encontrado" });
    }

    await tamano.destroy();

    res.json({ message: "Tamaño eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar tamaño:", error);
    res.status(500).json({ message: "Error al eliminar tamaño", error: error.message });
  }
}