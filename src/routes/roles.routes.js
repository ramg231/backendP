import { Router } from 'express';
import {
  crearRol,
  listarRoles,
  obtenerRol,
  actualizarRol,
  eliminarRol,
} from '../controllers/roles.controller.js';

const router = Router();

router.post('/crear', crearRol);
router.get('/', listarRoles);
router.get('/:id', obtenerRol);
router.put('/:id', actualizarRol);
router.delete('/:id', eliminarRol);

export default router;
