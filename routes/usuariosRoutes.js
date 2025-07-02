// Define los endpoints
import { Router } from 'express';
import { registrarUsuario, loginUsuario } from '../controllers/usuariosController.js';

const router = Router();

// Ruta para registrar un nuevo usuario
router.post('/usuarios', registrarUsuario);

// Ruta para iniciar sesión
router.post('/login', loginUsuario);

export default router;