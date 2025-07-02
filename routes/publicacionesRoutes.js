import { Router } from "express";
import requireAuth from "../middlewares/requireAuth.js";
import {
    listarPublicaciones,
    detallePublicacion,
    crearPublicacion,
    publicacionesUsuario,
    editarPublicacion,
    eliminarPublicacion
} from "../controllers/publicacionesController.js";

const router = Router();

// Rutas públicas
router.get("/publicaciones", listarPublicaciones);
router.get("/publicaciones/:id", detallePublicacion);

// Rutas protegidas
router.post("/publicaciones", requireAuth, crearPublicacion);
router.get("/perfil/mis-publicaciones", requireAuth, publicacionesUsuario);
router.put("/publicaciones/:id", requireAuth, editarPublicacion);
router.delete("/publicaciones/:id", requireAuth, eliminarPublicacion);

// 🚩 ELIMINA ESTA RUTA EXTRA (no la necesitas)
// router.post("/api/publicaciones", ...);

export default router;
