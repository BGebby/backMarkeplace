-- db
CREATE DATABASE IF NOT EXISTS Marketplace 
  DEFAULT CHARACTER SET utf8mb4 
  DEFAULT COLLATE utf8mb4_general_ci;

USE Marketplace;

-- tabla users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name VARCHAR(100) NOT NULL,
  borrado TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- tabla products
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) UNIQUE NOT NULL,
  sku INT,
  descripcion VARCHAR(100) NULL,
  imagen VARCHAR(300) NULl,
  cantidad INT,
  precio varchar (255),
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- tabla roles
CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  rol VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertar los roles solo si no existen
INSERT INTO roles (rol)
SELECT * FROM (SELECT 'admin') AS tmp WHERE NOT EXISTS (SELECT 1 FROM roles WHERE rol = 'admin') LIMIT 1;

INSERT INTO roles (rol)
SELECT * FROM (SELECT 'vendedor') AS tmp WHERE NOT EXISTS (SELECT 1 FROM roles WHERE rol = 'vendedor') LIMIT 1;

INSERT INTO roles (rol)
SELECT * FROM (SELECT 'cliente') AS tmp WHERE NOT EXISTS (SELECT 1 FROM roles WHERE rol = 'cliente') LIMIT 1;


-- tabla relacion roles users
CREATE TABLE IF NOT EXISTS role_user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  rol_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_rol_id (rol_id),
  INDEX idx_user_id (user_id),
  CONSTRAINT fk_role_user_rol FOREIGN KEY (rol_id) REFERENCES roles(id) ON DELETE CASCADE,
  CONSTRAINT fk_role_user_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

