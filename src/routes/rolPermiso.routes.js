// src/routes/rolPermiso.routes.js
import express from "express";
import {
 asignarPermisos,
 obtenerPermisosPorRol,
} from '../controllers/rolPermiso.controller.js';

const router = express.Router();

router.post("/", asignarPermisos);
router.get("/:rol_id", obtenerPermisosPorRol);

export default router;
