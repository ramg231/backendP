// src/controllers/producto.controller.js
import { Producto, Categoria,Sabor,Tamano  ,ProductoSabor,ProductoTamano} from "../database/syncModels.js";
import { Op } from "sequelize";
 
// Crear producto
export const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoria_id, destacado = false } = req.body;
    const nombreMayus = nombre ? nombre.toUpperCase() : '';
    const descripcionMayus = descripcion ? descripcion.toUpperCase() : '';
    const safeStock = stock === '' ? null : stock;
    const safePrecio = precio === '' ? null : precio;
    
    const producto = await Producto.create({
      nombre: nombreMayus,
      descripcion: descripcionMayus,
      precio: safePrecio,
      stock: safeStock,
      categoria_id,
      destacado,
    });

    res.status(201).json({
      ok: true,
      message: "Producto creado correctamente",
      producto_id: producto.id, // devolvemos el ID
    });
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ message: "Error al crear producto", error: error.message });
  }
};


// Listar todos los productos
export const listarProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      attributes: ["id", "nombre", "descripcion", "precio", "stock", "categoria_id", "destacado"],
      include: {
        model: Categoria,
        attributes: ["nombre"], // Solo el nombre de la categoría
      },
    });

    res.json({
      ok: true,
      productos,
    });
  } catch (error) {
    console.error("Error al listar productos:", error);
    res.status(500).json({ message: "Error al listar productos", error: error.message });
  }
};

// Obtener producto por nombre
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
      attributes: ["id", "nombre"],
    });

    res.json(productos);
  } catch (error) {
    console.error("Error al buscar productos:", error);
    res.status(500).json({ message: "Error al buscar productos", error: error.message });
  }
};

// Actualizar producto
export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });

    // Convertir nombre y descripcion a mayúsculas si existen
    const updateData = { ...req.body };
    if (updateData.nombre) updateData.nombre = updateData.nombre.toUpperCase();
    if (updateData.descripcion) updateData.descripcion = updateData.descripcion.toUpperCase();
    if (updateData.stock === '') updateData.stock = null;
    if (updateData.precio === '') updateData.precio = null;

    await producto.update(updateData);

    res.json({
      message: "Producto actualizado correctamente",
      producto,
    });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ message: "Error al actualizar producto", error: error.message });
  }
};


// Eliminar producto
export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });

    await producto.destroy();

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ message: "Error al eliminar producto", error: error.message });
  }
};


export const asignarSaborProducto = async (req, res) => {
  try {
    const { producto_id, sabor_id } = req.body;

    if (!producto_id || !sabor_id) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const existente = await ProductoSabor.findOne({ where: { producto_id, sabor_id } });
    if (existente) {
      return res.status(200).json({ message: "Ya estaba asignado" });
    }

    const nuevo = await ProductoSabor.create({ producto_id, sabor_id });
    res.status(201).json({ message: "Sabor asignado", data: nuevo });
  } catch (error) {
    console.error("Error en asignarSaborProducto:", error);
    res.status(500).json({ message: "Error interno" });
  }
};

// POST /producto/tamano
export const asignarTamanoProducto = async (req, res) => {
  try {
    const { producto_id, tamano_id, precio } = req.body;

    if (!producto_id || !tamano_id || !precio) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const existente = await ProductoTamano.findOne({ where: { producto_id, tamano_id } });
    if (existente) {
      return res.status(200).json({ message: "Ya estaba asignado" });
    }

    const nuevo = await ProductoTamano.create({ producto_id, tamano_id, precio });
    res.status(201).json({ message: "Tamaño asignado", data: nuevo });
  } catch (error) {
    console.error("Error en asignarTamanoProducto:", error);
    res.status(500).json({ message: "Error interno" });
  }
};



export const obtenerSabores = async (req, res) => {
  try {
    const sabores = await Sabor.findAll({
      attributes: ["id", "nombre"],
      order: [["nombre", "ASC"]],
    });

    res.json({ sabores });
  } catch (error) {
    console.error("Error al obtener sabores:", error);
    res.status(500).json({ message: "Error interno" });
  }
};

export const obtenerTamanos = async (req, res) => {
  try {
    const tamanos = await Tamano.findAll({
      attributes: ["id", "nombre"],
      order: [["nombre", "ASC"]],
    });

    res.json({ tamanos });
  } catch (error) {
    console.error("Error al obtener tamaños:", error);
    res.status(500).json({ message: "Error interno" });
  }
};

// Obtener sabores de un producto
export const obtenerSaboresDeProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id, {
      include: {
        model: Sabor,
        attributes: ["id", "nombre"],
        through: { attributes: [] },
      },
    });
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ sabores: producto.Sabors || [] });
  } catch (error) {
    console.error("Error al obtener sabores del producto:", error);
    res.status(500).json({ message: "Error interno" });
  }
};

// Obtener tamaños de un producto (incluyendo estado)
export const obtenerTamanosDeProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id, {
      include: {
        model: Tamano,
        attributes: ["id", "nombre"],
        through: { attributes: ["precio", "estado"] },
      },
    });
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
    // Mapear para incluir estado y precio
    const tamanos = (producto.Tamanos || []).map(t => ({
      id: t.id,
      nombre: t.nombre,
      precio: t.ProductoTamano?.precio,
      estado: t.ProductoTamano?.estado
    }));
    res.json({ tamanos });
  } catch (error) {
    console.error("Error al obtener tamaños del producto:", error);
    res.status(500).json({ message: "Error interno" });
  }
};

// Actualizar sabores de un producto (incluyendo estado)
export const actualizarSaboresDeProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { sabores } = req.body; // Array de objetos: [{ sabor_id, estado }]
    if (!Array.isArray(sabores)) {
      return res.status(400).json({ message: "sabores debe ser un array" });
    }
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
    // Limpiar todos los sabores actuales
    const deleted = await ProductoSabor.destroy({ where: { producto_id: id } });
    console.log(`Se eliminaron ${deleted} sabores para el producto ${id}`);
    // Asignar nuevos sabores con estado
    for (const s of sabores) {
      if (s.sabor_id) {
        await ProductoSabor.create({ producto_id: id, sabor_id: s.sabor_id, estado: s.estado ?? true });
      }
    }
    res.json({ message: "Sabores actualizados correctamente" });
  } catch (error) {
    console.error("Error al actualizar sabores del producto:", error);
    res.status(500).json({ message: "Error interno" });
  }
};

// Actualizar tamaños de un producto (incluyendo estado)
export const actualizarTamanosDeProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { tamanos } = req.body; // Array de objetos: [{ tamano_id, precio, estado }]
    if (!Array.isArray(tamanos)) {
      return res.status(400).json({ message: "tamanos debe ser un array" });
    }
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
    // Eliminar todos los tamaños actuales
    await ProductoTamano.destroy({ where: { producto_id: id } });
    // Asignar nuevos tamaños con precio y estado
    for (const t of tamanos) {
      if (t.tamano_id && t.precio) {
        await ProductoTamano.create({ producto_id: id, tamano_id: t.tamano_id, precio: t.precio, estado: t.estado ?? true });
      }
    }
    res.json({ message: "Tamaños actualizados correctamente" });
  } catch (error) {
    console.error("Error al actualizar tamaños del producto:", error);
    res.status(500).json({ message: "Error interno" });
  }
};