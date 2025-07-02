import { crearMensaje as crearMensajeDB, obtenerMensajesPorPublicacion } from "../models/mensajesModel.js";

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