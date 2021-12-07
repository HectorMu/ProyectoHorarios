CREATE DATABASE horariostect;

USE horariostect;

CREATE TABLE usuarios(
id INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR (100),
correo VARCHAR(100),
PASSWORD VARCHAR(255));
CREATE TABLE maestros(
id INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(50),
academia VARCHAR(100)
);
DROP TABLE horarios;
horariosCREATE TABLE horarios
(
id INT PRIMARY KEY AUTO_INCREMENT,
dia VARCHAR(50),
rangohoras VARCHAR(50),
ubicacion VARCHAR (50),
fk_maestro INT,
FOREIGN KEY (fk_maestro) REFERENCES maestros(id)
);

