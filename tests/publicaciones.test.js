import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db/db.js';
import usuariosRoutes from './routes/usuariosRoutes.js';
import publicacionesRoutes from './routes/publicacionesRoutes.js';
import mensajesRoutes from './routes/mensajesRouters.js';

dotenv.config();

const app = express();

app.use(express.json());

// 🚦 Configuración CORS: permite frontend local y deployado en Netlify
app.use(cors({
  origin: [
    "http://localhost:5173", // Desarrollo local
    "https://galeriadeartecreativa.netlify.app", // <--- TU URL de Netlify (sin / al final)
  ],
  credentials: true
}));

app.use('/api', usuariosRoutes);
app.use('/api', publicacionesRoutes);
app.use('/api', mensajesRoutes);

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al conectar con la base de datos");
  }
});

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Backend del Marketplace está funcionando correctamente.");
});

// Solo escucha si no estás en modo test
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
  });
}

export default app;
