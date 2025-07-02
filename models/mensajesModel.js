import pool from '../db/db.js';

export const crearMensaje = async ({ contenido, publicacion_id, usuario_id }) => {
  const consulta = `
    INSERT INTO mensajes (contenido, publicacion_id, usuario_id)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const values = [contenido, publicacion_id, usuario_id];
  const result = await pool.query(consulta, values);
  console.log("Mensaje insertado:", result.rows[0]);
  return result.rows[0];
};

export const obtenerMensajesPorPublicacion = async (publicacion_id) => {
  const consulta = `
    SELECT m.*, u.nombre AS autor_mensaje
    FROM mensajes m
    JOIN usuarios u ON m.usuario_id = u.id
    WHERE m.publicacion_id = $1
    ORDER BY m.fecha_envio ASC
  `;
  const values = [publicacion_id];
  const result = await pool.query(consulta, values);
  return result.rows;
};

export const obtenerPublicacionConMensajes = async (publicacion_id) => {
  const consulta = `
    SELECT p.*, 
      (SELECT COUNT(*) FROM mensajes m WHERE m.publicacion_id = p.id) AS cantidad_mensajes
    FROM publicaciones p
    WHERE p.id = $1
  `;
  const values = [publicacion_id];
  const result = await pool.query(consulta, values);
  return result.rows[0];
};