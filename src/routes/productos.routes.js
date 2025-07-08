import { Router } from 'express';
import {
  crearProducto,
  listarProductos,
   buscarProductosPorCategoriaYNombre,
  actualizarProducto,
  eliminarProducto,
  asignarSaborProducto,
  asignarTamanoProducto,
  obtenerSabores,
  obtenerTamanos,
  obtenerSaboresDeProducto,
  obtenerTamanosDeProducto,
  actualizarSaboresDeProducto,
  actualizarTamanosDeProducto
} from '../controllers/productos.controller.js';

const router = Router();

router.post('/crear', crearProducto);                   // Crear producto
router.get('/', listarProductos);                 // Listar todos
router.get('/buscar', buscarProductosPorCategoriaYNombre);              // Obtener por ID
router.put('/:id', actualizarProducto);           // Actualizar por ID
router.delete('/:id', eliminarProducto);          // Eliminar por ID
router.post("/sabor", asignarSaborProducto);
router.post("/tamano", asignarTamanoProducto);
router.get("/tamanos", obtenerTamanos);
router.get("/sabores", obtenerSabores);
router.get('/:id/sabores', obtenerSaboresDeProducto);
router.get('/:id/tamanos', obtenerTamanosDeProducto);
router.put('/:id/sabores', actualizarSaboresDeProducto);
router.put('/:id/tamanos', actualizarTamanosDeProducto);

export default router;