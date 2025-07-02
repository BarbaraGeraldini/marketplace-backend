import {
    crearPublicacion as crearPublicacionDB,
    obtenerPublicaciones,
    obtenerPublicacionPorId,
    obtenerPublicacionesPorUsuario,
    actualizarPublicacion,
    borrarPublicacion
} from '../models/publicacionesModel.js';

export const listarPublicaciones = async (req, res) => {
  try {
    const publicaciones = await obtenerPublicaciones();
    res.status(200).json(publicaciones || []); // Devuelve un array vacío si no hay publicaciones
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las publicaciones' });
  }
}; // mostrar todas las publicaciones

export const detallePublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const publicacion = await obtenerPublicacionPorId(id);
    if (!publicacion) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }
    res.status(200).json(publicacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la publicación' });
  }
}; // mostrar una publicación por su ID

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
        res.status(201).json(publicacion); // o el objeto que quieras devolver
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la publicación' });
    }
}; // crear nueva publicación (requiere autenticación)

export const publicacionesUsuario = async (req, res) => {
    try {
        const usuario_id = req.user.id;
        const publicaciones = await obtenerPublicacionesPorUsuario(usuario_id);
        return res.status(200).json(publicaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las publicaciones del usuario' });
    }
}; // mostrar publicaciones del usuario autenticado

export const editarPublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;
    const usuario_id = req.user.id;
    const actualizada = await actualizarPublicacion(id, datos, usuario_id);
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al editar publicación" });
  }
};

export const eliminarPublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.user.id;
    await borrarPublicacion(id, usuario_id);
    res.json({ message: "Publicación eliminada" });
  } catch (error) {
    if (error.message.includes("No autorizado")) {
      return res.status(403).json({ error: "No autorizado para eliminar esta publicación" });
    }
    console.error(error);
    res.status(500).json({ error: "Error al eliminar publicación" });
  }
};

const agregarPublicacion = async (nuevaPublicacion, token) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/publicaciones`,
      nuevaPublicacion,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const nueva = res.data; // Asegúrate de que el backend devuelve la publicación creada
    setPublicaciones((prev) => [nueva, ...prev]); // Agrega la nueva publicación al estado global
    return nueva;
  } catch (error) {
    console.error("Error al agregar publicación:", error);
    throw error;
  }
};



