import { Router } from "express";
import requireAuth from "../middlewares/requireAuth.js";
import { crearMensaje, listarMensajesPorPublicacion, listarTodosLosMensajes } from "../controllers/mensajesController.js";

const router = Router();

// 🚦 Nuevo endpoint: listar todos los mensajes (para admin/pruebas)
router.get("/mensajes", listarTodosLosMensajes);

// Crear mensaje (requiere login)
router.post("/mensajes", requireAuth, crearMensaje);

// Listar mensajes de una publicación específica
router.get("/mensajes/publicacion/:id", listarMensajesPorPublicacion);

export default router;
