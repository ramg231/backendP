  import { Router } from "express";
  import {
  crearSabor,
  listarSabores,
  editarSabor,
  eliminarSabor,
  crearTamano,
  listarTamanos,
  editarTamano,
  eliminarTamano,
} from "../controllers/categoria.controller.js";
const router = Router();
// Sabores
router.post("/sabor/crear", crearSabor);
router.get("/sabores", listarSabores);
router.put("/sabor/:id", editarSabor);
router.delete("/sabor/:id", eliminarSabor);

// Tamaños
router.post("/tamano/crear", crearTamano);
router.get("/tamanos", listarTamanos);
router.put("/tamano/:id", editarTamano);
router.delete("/tamano/:id", eliminarTamano);

export default router;
