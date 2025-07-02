const request = require('supertest');
const app = require('../index'); 

describe('Pruebas API REST', () => {
    test('Registro de usuario (POST /api/usuarios)', async () => {
        const response = await request(app)
        .post('/api/usuarios')
        .send({
            nombre: 'test',
            email: `test${Date.now()}@mail.com`,
            password: '1234'
        });

    expect(response.statusCode).toBe(201);
    expect(response.body.usuario).toHaveProperty('id');
});

test('Login de usuario (POST /api/login)', async () => {
    const response = await request(app)
        .post('/api/login')
        .send({
            email: 'chucho@gmail.com',
            password: 'admin'
        });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
});

test('Obtener publicaciones sin token (GET /api/publicaciones)', async () => {
    const response = await request(app).get('/api/publicaciones');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
});

test('Crear publicación sin token (POST /api/publicaciones)', async () => {
    const response = await request(app)
        .post('/api/publicaciones')
        .send({
            titulo: 'post sin token',
            descripcion: 'esto no debe pasar',
            precio: 1000,
            imagen_url: 'http://ejemplo.com/img.jpg',
            categoria_id: 1
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBeDefined();
    });
});
