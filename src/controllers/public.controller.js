import { Op ,Sequelize } from "sequelize";
import { Producto, ImagenProducto, Categoria, ProductoTamano, Tamano, ProductoSabor, Sabor } from "../database/syncModels.js";
/*
export const obtenerProductos = async (req, res) => {
  try {
    const {
      categoria = "all",
      q = "",
      min = 0,
      max = 9999,
      page = 1,
      limit = 9,
      destacado, // ✅ nuevo filtro
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const where = {
      precio: { [Op.between]: [parseFloat(min), parseFloat(max)] },
      nombre: { [Op.iLike]: `%${q}%` },
    };

    if (categoria !== "all") {
      where.categoria_id = categoria;
    }

    if (destacado === "true") {
      where.destacado = true;
    }

    const { rows: productos, count: total } = await Producto.findAndCountAll({
      where,
      offset,
      limit: parseInt(limit),
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Categoria,
          attributes: ["nombre"],
        },
        {
          model: ImagenProducto,
          as: "imagenes",
          attributes: ["url"],
          separate: true,
          limit: 1,
          order: [["orden", "ASC"]],
        },
      ],
    });

    const resultado = productos.map((producto) => ({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      destacado: producto.destacado,
      categoria: producto.Categorium?.nombre || null,
      imagen: producto.imagenes[0]?.url || null,
    }));

    res.json({
      total,
      pagina: parseInt(page),
      paginas: Math.ceil(total / limit),
      productos: resultado,
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({
      message: "Error al obtener productos",
      error: error.message,
    });
  }
};
*/
/*
export const obtenerProductos = async (req, res) => {
  try {
    const {
      categoria = "all",
      q = "",
      min = 0,
      max = 9999,
      page = 1,
      limit = 9,
      destacado,
      sabores // <-- nuevo
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const where = {
      precio: { [Op.between]: [parseFloat(min), parseFloat(max)] },
      nombre: { [Op.iLike]: `%${q}%` },
    };

    if (categoria !== "all") {
      where.categoria_id = categoria;
    }

    if (destacado === "true") {
      where.destacado = true;
    }

    // Procesar sabores
    let include = [
      {
        model: Categoria,
        attributes: ["nombre"],
      },
      {
        model: ImagenProducto,
        as: "imagenes",
        attributes: ["url"],
        separate: true,
        limit: 1,
        order: [["orden", "ASC"]],
      },
    ];

    if (sabores) {
      // Soporta ambos formatos: array o string separado por comas
      let saborIds = [];
      if (Array.isArray(sabores)) {
        saborIds = sabores.map(Number);
      } else if (typeof sabores === "string") {
        saborIds = sabores.split(",").map(Number);
      }
      if (saborIds.length > 0) {
        include.push({
          model: Sabor,
          attributes: [],
          through: { attributes: [] },
          where: { id: { [Op.in]: saborIds } }
        });
      }
    }

    const { rows: productos, count: total } = await Producto.findAndCountAll({
      where,
      offset,
      limit: parseInt(limit),
      order: [["createdAt", "DESC"]],
      include,
      distinct: true // importante para que el count sea correcto con include
    });

    const resultado = productos.map((producto) => ({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      destacado: producto.destacado,
      categoria: producto.Categorium?.nombre || null,
      imagen: producto.imagenes[0]?.url || null,
    }));

    res.json({
      total,
      pagina: parseInt(page),
      paginas: Math.ceil(total / limit),
      productos: resultado,
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
      res.status(500).json({
      message: "Error al obtener productos",
      error: error.message,
    });
  }
};

*/
/*
//cambio 11-07-2025
export const obtenerProductos = async (req, res) => {
  try {
    let {
      categoria = "all",
      q = "",
      min = 0,
      max = 9999,
      page = 1,
      limit = 9,
      destacado,
      sabores
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Procesar categorías
    let categoriaIds = [];
    if (categoria !== "all") {
      if (Array.isArray(categoria)) {
        categoriaIds = categoria.map(Number);
      } else if (typeof categoria === "string") {
        categoriaIds = categoria.split(",").map(Number);
      }
    }

    const where = {
      precio: { [Op.between]: [parseFloat(min), parseFloat(max)] },
      nombre: { [Op.iLike]: `%${q}%` },
    };

    if (categoriaIds.length === 1) {
      where.categoria_id = categoriaIds[0];
    } else if (categoriaIds.length > 1) {
      where.categoria_id = { [Op.in]: categoriaIds };
    }

    if (destacado === "true") {
      where.destacado = true;
    }

    // Procesar sabores
    let include = [
      {
        model: Categoria,
        attributes: ["nombre"],
      },
      {
        model: ImagenProducto,
        as: "imagenes",
        attributes: ["url"],
        separate: true,
        limit: 1,
        order: [["orden", "ASC"]],
      },
    ];

    if (sabores) {
      let saborIds = [];
      if (Array.isArray(sabores)) {
        saborIds = sabores.map(Number);
      } else if (typeof sabores === "string") {
        saborIds = sabores.split(",").map(Number);
      }
      if (saborIds.length > 0) {
        include.push({
          model: Sabor,
          attributes: [],
          through: { attributes: [] },
          where: { id: { [Op.in]: saborIds } }
        });
      }
    }

    const { rows: productos, count: total } = await Producto.findAndCountAll({
      where,
      offset,
      limit: parseInt(limit),
      order: [["createdAt", "DESC"]],
      include,
      distinct: true
    });

    const resultado = productos.map((producto) => ({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      destacado: producto.destacado,
      categoria: producto.Categorium?.nombre || null,
      imagen: producto.imagenes[0]?.url || null,
    }));

    res.json({
      total,
      pagina: parseInt(page),
      paginas: Math.ceil(total / limit),
      productos: resultado,
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({
      message: "Error al obtener productos",
      error: error.message,
    });
  }
};
*/
export const obtenerProductos = async (req, res) => {
  try {
    let {
      categoria = "all",
      q = "",
      min = 0,
      max = 9999,
      page = 1,
      limit = 9,
      destacado,
      sabores
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Procesar categorías
    let categoriaIds = [];
    if (categoria !== "all") {
      if (Array.isArray(categoria)) {
        categoriaIds = categoria.map(Number);
      } else if (typeof categoria === "string") {
        categoriaIds = categoria.split(",").map(Number);
      }
    }

    const where = {
      precio: { [Op.between]: [parseFloat(min), parseFloat(max)] },
      nombre: { [Op.iLike]: `%${q}%` },
    };

    if (categoriaIds.length === 1) {
      where.categoria_id = categoriaIds[0];
    } else if (categoriaIds.length > 1) {
      where.categoria_id = { [Op.in]: categoriaIds };
    }

    if (destacado === "true") {
      where.destacado = true;
    }

    // Procesar sabores
    let include = [
      {
        model: Categoria,
        attributes: ["nombre"],
      },
      {
        model: ImagenProducto,
        as: "imagenes",
        attributes: ["url"],
        separate: true,
        limit: 1,
        order: [["orden", "ASC"]],
      },
      {
        model: Sabor,
        attributes: ["nombre"],
        through: { attributes: [] }
      },
      {
        model: Tamano,
        attributes: ["nombre"],
        through: { attributes: ["precio"] }
      }
    ];

    if (sabores) {
      let saborIds = [];
      if (Array.isArray(sabores)) {
        saborIds = sabores.map(Number);
      } else if (typeof sabores === "string") {
        saborIds = sabores.split(",").map(Number);
      }
      if (saborIds.length > 0) {
        include.push({
          model: Sabor,
          attributes: [],
          through: { attributes: [] },
          where: { id: { [Op.in]: saborIds } }
        });
      }
    }

    const { rows: productos, count: total } = await Producto.findAndCountAll({
      where,
      offset,
      limit: parseInt(limit),
      order: [["createdAt", "DESC"]],
      include,
      distinct: true
    });

    const resultado = productos.map((producto) => ({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      destacado: producto.destacado,
      categoria: producto.Categorium?.nombre || null,
      imagen: producto.imagenes[0]?.url || null,
      sabores: producto.Sabors ? producto.Sabors.map(s => s.nombre) : [],
      tamanos: producto.Tamanos
        ? producto.Tamanos.map(t => ({
            nombre: t.nombre,
            precio: t.ProductoTamano?.precio ?? null
          }))
        : []
    }));

    res.json({
      total,
      pagina: parseInt(page),
      paginas: Math.ceil(total / limit),
      productos: resultado,
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({
      message: "Error al obtener productos",
      error: error.message,
    });
  }
};


export const obtenerSlidesProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      where: { destacado: true },
      attributes: ["id", "nombre"],
      include: [
        {
          model: ImagenProducto,
          as: "imagenes",
          attributes: ["url", "orden"],
          required: true,
        },
      ],
    });

    // Mapear a la imagen de menor orden
    const slides = productos
      .map((producto) => {
        // Obtener la imagen con menor orden
        const imagenOrdenMin = producto.imagenes.reduce((min, img) => {
          return img.orden < min.orden ? img : min;
        }, producto.imagenes[0]);

        return {
          id: producto.id,
          nombre: producto.nombre,
          url: imagenOrdenMin?.url,
        };
      })
      .filter((slide) => slide.url) // Por si acaso
      .slice(0, 7); // Solo los primeros 7

    res.json(slides);
  } catch (error) {
    console.error("Error al obtener slides:", error);
    res.status(500).json({
      message: "Error al obtener slides",
      error: error.message,
    });
  }
};
/*
export const obtenerDetalleProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findByPk(id, {
      include: [
        {
          model: Categoria,
          attributes: ["nombre"],
        },
        {
          model: ImagenProducto,
          as: "imagenes",
          attributes: ["id", "url", "orden"],
          order: [["orden", "ASC"]],
        },
      ],
    });

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const detalle = {
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: parseFloat(producto.precio),
      stock: producto.stock,
      categoria: producto.Categorium?.nombre || null,
      destacado: producto.destacado,
      imagenes: producto.imagenes?.sort((a, b) => a.orden - b.orden) || [],
    };

    res.json(detalle);
  } catch (error) {
    console.error("Error al obtener detalle del producto:", error);
    res.status(500).json({ message: "Error al obtener detalle del producto", error: error.message });
  }
};
*/
export const obtenerDetalleProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findByPk(id, {
      include: [
        {
          model: Categoria,
          attributes: ["nombre"],
        },
        {
          model: ImagenProducto,
          as: "imagenes",
          attributes: ["id", "url", "orden"],
          order: [["orden", "ASC"]],
        },
        {
          model: Sabor,
          attributes: ["nombre"],
          through: { attributes: [] }
        },
        {
          model: Tamano,
          attributes: ["nombre", "porciones"],
          through: { attributes: ["precio"] }
        }
      ],
    });

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const detalle = {
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: parseFloat(producto.precio),
      stock: producto.stock,
      categoria: producto.Categorium?.nombre || null,
      destacado: producto.destacado,
      imagenes: producto.imagenes?.sort((a, b) => a.orden - b.orden) || [],
      sabores: producto.Sabors ? producto.Sabors.map(s => s.nombre) : [],
      tamanos: producto.Tamanos
        ? producto.Tamanos.map(t => ({
            nombre: t.nombre,
            porciones: t.porciones,
            precio: t.ProductoTamano?.precio ?? null
          }))
        : []
    };

    res.json(detalle);
  } catch (error) {
    console.error("Error al obtener detalle del producto:", error);
    res.status(500).json({ message: "Error al obtener detalle del producto", error: error.message });
  }
};

export const obtenerProductosAleatorios = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      where: {
        destacado: false,
      },
      order: Sequelize.literal("RANDOM()"),
      limit: 5,
      include: [
        {
          model: Categoria,
          attributes: ["nombre"],
        },
        {
          model: ImagenProducto,
          as: "imagenes",
          attributes: ["url"],
          separate: true,
          limit: 1,
          order: [["orden", "ASC"]],
        },
      ],
    });

    const resultado = productos.map((producto) => ({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      categoria: producto.Categorium?.nombre || null,
      imagen: producto.imagenes[0]?.url || null,
    }));

    res.json({
      productos: resultado,
    });
  } catch (error) {
    console.error("Error al obtener productos aleatorios:", error);
    res.status(500).json({
      message: "Error al obtener productos aleatorios",
      error: error.message,
    });
  }
};

// Obtener tamaños y sabores de un producto (para frontend)
export const obtenerSaboresYtamanosDeProducto = async (req, res) => {
  try {
    const { id } = req.params;
    // Tamaños (solo estado true)
    const tamanos = await ProductoTamano.findAll({
      where: { producto_id: id, estado: true },
      include: [{ model: Tamano, attributes: ["id", "nombre", "porciones"] }],
    });
    // Sabores (solo estado true)
    const sabores = await ProductoSabor.findAll({
      where: { producto_id: id, estado: true },
      include: [{ model: Sabor, attributes: ["id", "nombre"] }],
    });
    res.json({
      tamanos: tamanos.map(t => ({
        id: t.Tamano?.id,
        nombre: t.Tamano?.nombre,
        porciones: t.Tamano?.porciones,
        precio: t.precio,
        estado: t.estado
      })),
      sabores: sabores.map(s => ({
        id: s.Sabor?.id,
        nombre: s.Sabor?.nombre,
        estado: s.estado
      }))
    });
  } catch (error) {
    console.error("Error al obtener tamaños y sabores del producto:", error);
    res.status(500).json({ message: "Error interno" });
  }
};
