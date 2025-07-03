// Define los endpoints
import { Router } from 'express';
import { registrarUsuario, loginUsuario, listarUsuarios } from '../controllers/usuariosController.js';

const router = Router();

// GET: Listar todos los usuarios (para pruebas/demo)
router.get('/usuarios', listarUsuarios);

// POST: Registrar un nuevo usuario
router.post('/usuarios', registrarUsuario);

// POST: Iniciar sesión
router.post('/login', loginUsuario);

export default router;
