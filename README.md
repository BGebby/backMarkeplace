Marketplace - UI y API

Este proyecto implementa la API para un Marketplace que permite a vendedores registrar productos, a compradores buscarlos y administradores gestionar la plataforma.

Tecnologías utilizadas

Backend: NestJS, TypeScript

Base de datos: MySQL

Autenticación: JWT

Contenedores: Docker

Instalación

Requisitos previos

Docker y Docker Compose

Clonar el repositorio

git clone https://github.com/tu_usuario/marketplace.git
cd marketplace

Configuración con Docker

Copiar el archivo de entorno:

cp .env.example .env

Construir e iniciar los contenedores:

docker-compose up --build -d

Aplicar migraciones :
docker exec -it nombre_del_contenedor php artisan migrate:status
Si nos sale esto en consola: ERROR  Migration table not found.
Ejecutamos:
nombre del contenedor(laravel_app)
docker exec -it nombre_del_contenedor php artisan migrate


Acceder a la aplicación

Backend: http://localhost:3000

Base de datos: Accesible según configuración en .env



Endpoints principales (API)

Autenticación

POST /auth/register - Registro de usuarios (vendedores y compradores).

POST /auth/login - Inicio de sesión.

Productos

POST /products - Crear producto (solo vendedor autenticado).

GET /products - Listar productos con filtros (nombre, SKU, precio).

GET /products/mine - Ver productos del vendedor autenticado.

GET /products/all - Ver todos los productos (solo administrador).

