// src/routes/permiso.routes.js
import express from "express";
import {
  crearPermiso,
  listarPermisos,
  actualizarPermiso,
  eliminarPermiso,
} from "../controllers/permiso.controller.js";

const router = express.Router();

router.post("/crear", crearPermiso);
router.get("/", listarPermisos);
router.put("/:id", actualizarPermiso);
router.delete("/permisos/:id", eliminarPermiso);

export default router;
