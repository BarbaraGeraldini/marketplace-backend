create table usuarios (
	id serial primary key,
	nombre varchar(50) not null,
	email varchar(50) unique not null,
	contraseña varchar(20) not null,
	fecha_registro timestamp default current_timestamp
);

create table categorias (
	id serial primary key,
	nombre varchar(50) not null
);

create table publicaciones (
	id serial primary key,
	titulo varchar(20) not null,
	precio integer,
	imagen_url varchar not null,
	usuario_id integer references usuarios(id),
	categoria_id integer references categorias(id),
	fecha_creacion timestamp default current_timestamp
);

create table mensajes (
	id serial primary key,
	contenido varchar not null,
	publicacion_id integer references publicaciones(id),
	usuario_id integer references usuarios(id),
	fecha_envio timestamp default current_timestamp
)

alter table publicaciones add descripcion varchar; 
alter table usuarios alter column contraseña type varchar(100)




INSERT INTO categorias (nombre) VALUES ('General');


