import { Router } from "express";
import {
  crearCategoria,
  listarCategorias,
  obtenerCategoria,
  actualizarCategoria,
  eliminarCategoria

} from "../controllers/categoria.controller.js";

const router = Router();

// Categorías
router.post("/crear", crearCategoria);
router.get("/", listarCategorias);
router.put("/:id", actualizarCategoria);
router.delete("/:id", eliminarCategoria);
router.get("/:id", obtenerCategoria);



export default router;
