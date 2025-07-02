import { Router } from "express";
import requireAuth from "../middlewares/requireAuth.js";
import { crearMensaje, listarMensajesPorPublicacion } from "../controllers/mensajesController.js";

const router = Router();

router.post("/mensajes", requireAuth, crearMensaje);
router.get("/mensajes/publicacion/:id", listarMensajesPorPublicacion);

export default router;