import { Pedido, PedidoProducto } from "../database/syncModels.js";

export const crearPedido = async (req, res) => {
  try {
    const { nombre, telefono, productos, total } = req.body;

    // Crear el pedido principal
    const pedido = await Pedido.create({ nombre, telefono, total });

    // Crear los productos del pedido
    const productosPedido = productos.map(prod => ({
      pedido_id: pedido.id,
      producto_id: prod.id,
      nombre: prod.nombre,
      cantidad: prod.cantidad,
      sabor: prod.sabor,
      tamano: prod.tamano,
      precio: prod.precio,
    }));

    await PedidoProducto.bulkCreate(productosPedido);

    res.status(201).json({
      ok: true,
      message: "Pedido registrado correctamente",
      pedido_id: pedido.id,
    });
  } catch (error) {
    console.error("Error al registrar pedido:", error);
    res.status(500).json({ message: "Error al registrar pedido", error: error.message });
  }
};
export const listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: PedidoProducto,
          attributes: ["producto_id", "nombre", "cantidad", "sabor", "tamano", "precio"]
        }
      ]
    });

    res.json({
      ok: true,
      pedidos
    });
  } catch (error) {
    console.error("Error al listar pedidos:", error);
    res.status(500).json({ message: "Error al listar pedidos", error: error.message });
  }
};

export const confirmarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    pedido.estado = "confirmado";
    await pedido.save();
    res.json({ ok: true, message: "Pedido confirmado" });
  } catch (error) {
    console.error("Error al confirmar pedido:", error);
    res.status(500).json({ message: "Error al confirmar pedido", error: error.message });
  }
};

export const denegarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    pedido.estado = "denegado";
    await pedido.save();
    res.json({ ok: true, message: "Pedido denegado" });
  } catch (error) {
    console.error("Error al denegar pedido:", error);
    res.status(500).json({ message: "Error al denegar pedido", error: error.message });
  }
};