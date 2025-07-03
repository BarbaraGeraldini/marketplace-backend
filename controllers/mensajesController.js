import { crearMensaje as crearMensajeDB, obtenerMensajesPorPublicacion } from "../models/mensajesModel.js";
import pool from "../db/db.js"; // <--- Para usarlo en el GET general

export const crearMensaje = async (req, res) => {
  try {
    const { contenido, publicacion_id } = req.body;
    const usuario_id = req.user.id;
    if (!contenido || !publicacion_id) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const mensaje = await crearMensajeDB({ contenido, publicacion_id, usuario_id });
    res.status(201).json({ message: "Mensaje enviado", mensaje });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al enviar el mensaje" });
  }
};

export const listarMensajesPorPublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const mensajes = await obtenerMensajesPorPublicacion(id);
    res.json(mensajes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los mensajes" });
  }
};

// 🚦 GET: Listar todos los mensajes (para admin/pruebas)
export const listarTodosLosMensajes = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, contenido, publicacion_id, usuario_id, fecha_envio 
      FROM mensajes 
      ORDER BY fecha_envio DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener todos los mensajes" });
  }
};
