// Encapsula la lógica de base de datos, tomando todas las consultas

import pool from '../db/db.js';

export const crearUsuario = async ({ nombre, email, password }) => {
    const consulta = "INSERT INTO usuarios values (DEFAULT, $1, $2, $3, DEFAULT) RETURNING *";
    const values = [nombre, email, password];
    const result = await pool.query(consulta, values);
    return result.rows[0];
};

export const buscarUsuarioPorEmail = async (email) => {
    const consulta = "SELECT * FROM usuarios WHERE email = $1";
    const values = [email];
    const result = await pool.query(consulta, values);
    return result.rows[0];
    // Retorna el usuario encontrado
};

export const buscarUsuarioPorId = async (id) => {
    const consulta = "SELECT * FROM usuarios WHERE id = $1";
    const values = [id];
    const result = await pool.query(consulta, values);
    return result.rows[0];
    // Retorna el usuario encontrado
};