import {
    crearPublicacion as crearPublicacionDB,
    obtenerPublicaciones,
    obtenerPublicacionPorId,
    obtenerPublicacionesPorUsuario,
    actualizarPublicacion,
    borrarPublicacion
} from '../models/publicacionesModel.js';

// Listar todas las publicaciones
export const listarPublicaciones = async (req, res) => {
  try {
    const publicaciones = await obtenerPublicaciones();
    res.status(200).json(publicaciones || []);
  } catch (error) {
    // LOG DE ERROR DETALLADO
    console.error("Error en listarPublicaciones:", error);
    res.status(500).json({
      error: 'Error al obtener las publicaciones',
      detalle: error.message,
      stack: error.stack // Esto ayuda mucho a encontrar el bug real en Render
    });
  }
};

// Mostrar una publicación por su ID
export const detallePublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const publicacion = await obtenerPublicacionPorId(id);
    if (!publicacion) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }
    res.status(200).json(publicacion);
  } catch (error) {
    console.error("Error en detallePublicacion:", error);
    res.status(500).json({ error: 'Error al obtener la publicación' });
  }
};

// Crear nueva publicación (requiere autenticación)
export const crearPublicacion = async (req, res) => {
    try {
        const { titulo, descripcion, precio, imagen_url, categoria_id } = req.body;
        const usuario_id = req.user.id;

        if (!titulo || !descripcion || !precio || !imagen_url || !categoria_id) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        const publicacion = await crearPublicacionDB({
            usuario_id,
            titulo,
            descripcion,
            categoria_id,
            precio,
            imagen_url
        });
        res.status(201).json(publicacion);
    } catch (error) {
        console.error("Error en crearPublicacion:", error);
        res.status(500).json({ error: 'Error al crear la publicación', detalle: error.message });
    }
};

// Mostrar publicaciones del usuario autenticado
export const publicacionesUsuario = async (req, res) => {
    try {
        const usuario_id = req.user.id;
        const publicaciones = await obtenerPublicacionesPorUsuario(usuario_id);
        return res.status(200).json(publicaciones);
    } catch (error) {
        console.error("Error en publicacionesUsuario:", error);
        res.status(500).json({ error: 'Error al obtener las publicaciones del usuario' });
    }
};

// Editar publicación
export const editarPublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;
    const usuario_id = req.user.id;
    const actualizada = await actualizarPublicacion(id, datos, usuario_id);
    res.json(actualizada);
  } catch (error) {
    console.error("Error en editarPublicacion:", error);
    res.status(500).json({ error: "Error al editar publicación" });
  }
};

// Eliminar publicación
export const eliminarPublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.user.id;
    await borrarPublicacion(id, usuario_id);
    res.json({ message: "Publicación eliminada" });
  } catch (error) {
    if (error.message && error.message.includes("No autorizado")) {
      return res.status(403).json({ error: "No autorizado para eliminar esta publicación" });
    }
    console.error("Error en eliminarPublicacion:", error);
    res.status(500).json({ error: "Error al eliminar publicación" });
  }
};
