import { Router } from "express";
import {
  crearPedido,
  listarPedidos,
  confirmarPedido,
  denegarPedido
} from "../controllers/pedido.controller.js";

const router = Router();

router.post("/", crearPedido);
router.get("/", listarPedidos);
router.put("/:id/confirmar", confirmarPedido);
router.put("/:id/denegar", denegarPedido);

export default router;