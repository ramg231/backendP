import express from "express";
import { obtenerSaboresYtamanosDeProducto, obtenerSlidesProductos, obtenerProductos, obtenerDetalleProducto, obtenerProductosAleatorios } from '../controllers/public.controller.js';
 const router = express.Router();
router.get('/', obtenerSlidesProductos);
router.get("/catalogo", obtenerProductos);
router.get("/detalle/:id", obtenerDetalleProducto);
router.get("/tamanos-sabores/:id", obtenerSaboresYtamanosDeProducto);
router.get("/aleatorios", obtenerProductosAleatorios);
export default router;
