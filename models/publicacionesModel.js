// Condensar todas las consultas SQL

import pool from '../db/db.js';

// Crear publicación (sin cambios)
export const crearPublicacion = async ({ usuario_id, titulo, descripcion, categoria_id, precio, imagen_url }) => {
    const consulta = `
        INSERT INTO publicaciones (usuario_id, titulo, descripcion, categoria_id, precio, imagen_url)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `;
    const values = [usuario_id, titulo, descripcion, categoria_id, precio, imagen_url];
    const result = await pool.query(consulta, values);
    return result.rows[0];
};

// Listar todas las publicaciones con cantidad de mensajes
export const obtenerPublicaciones = async () => {
    const consulta = `
        SELECT 
            p.*, 
            u.nombre AS autor, 
            c.nombre AS categoria,
            COUNT(m.id) AS cantidad_mensajes
        FROM publicaciones p
        JOIN usuarios u ON p.usuario_id = u.id
        JOIN categorias c ON p.categoria_id = c.id
        LEFT JOIN mensajes m ON m.publicacion_id = p.id
        GROUP BY p.id, u.nombre, c.nombre
        ORDER BY p.fecha_creacion DESC
    `;
    const result = await pool.query(consulta);
    return result.rows;
};

// Obtener una publicación por ID con cantidad de mensajes
export const obtenerPublicacionPorId = async (id) => {
    const consulta = `
        SELECT 
            p.*, 
            u.nombre AS autor, 
            c.nombre AS categoria,
            (SELECT COUNT(*) FROM mensajes m WHERE m.publicacion_id = p.id) AS cantidad_mensajes
        FROM publicaciones p
        JOIN usuarios u ON p.usuario_id = u.id
        JOIN categorias c ON p.categoria_id = c.id
        WHERE p.id = $1
    `;
    const values = [id];
    const result = await pool.query(consulta, values);
    return result.rows[0];
};

export const obtenerPublicacionesPorUsuario = async (usuario_id) => {
    const consulta = `
        SELECT 
            p.*, 
            u.nombre AS autor, 
            c.nombre AS categoria
        FROM publicaciones p
        JOIN usuarios u ON p.usuario_id = u.id
        JOIN categorias c ON p.categoria_id = c.id
        WHERE p.usuario_id = $1
        ORDER BY p.fecha_creacion DESC
    `;
    const values = [usuario_id];
    const result = await pool.query(consulta, values);
    return result.rows;
};

export const actualizarPublicacion = async (id, datos, usuario_id) => {
  const { titulo, descripcion, categoria_id, precio, imagen_url } = datos;
  const consulta = `
    UPDATE publicaciones
    SET titulo=$1, descripcion=$2, categoria_id=$3, precio=$4, imagen_url=$5
    WHERE id=$6 AND usuario_id=$7
    RETURNING *
  `;
  const values = [titulo, descripcion, categoria_id, precio, imagen_url, id, usuario_id];
  const result = await pool.query(consulta, values);
  return result.rows[0];
};

export const borrarPublicacion = async (id, usuario_id) => {
  const consulta = `DELETE FROM publicaciones WHERE id=$1 AND usuario_id=$2 RETURNING *`;
  const result = await pool.query(consulta, [id, usuario_id]);
  if (result.rowCount === 0) {
    throw new Error("No autorizado o publicación no encontrada");
  }
};