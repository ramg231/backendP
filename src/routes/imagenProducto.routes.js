import express from "express";
import { subirImagenesProducto, obtenerImagenesPorProducto, eliminarImagen,buscarProductosPorCategoriaYNombre} from '../controllers/imagenProducto.controller.js';
import upload from '../middlewares/upload.js';
const router = express.Router();
router.post('/productos/:id', upload.array('imagenes', 10), subirImagenesProducto);
//router.get('/productos/:producto_id', obtenerImagenesPorProducto);
router.delete('/productos/:id', eliminarImagen);
router.get("/productos/buscarv", buscarProductosPorCategoriaYNombre);

export default router;
