CREATE SCHEMA IF NOT EXISTS HauntedHouseDB;
USE HauntedHouseDB;

CREATE TABLE IF NOT EXISTS Usuario(
	IdUsuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    NombreUsuario VARCHAR(25) NOT NULL,
    Contrasena VARCHAR(25) NOT NULL,
    TopScore TIME NOT NULL,
    CONSTRAINT UC_Name UNIQUE (IdUsuario, NombreUsuario)
);

DROP PROCEDURE IF EXISTS CrearUsuario;
DELIMITER $$
CREATE PROCEDURE CrearUsuario(Nombre VARCHAR(25), Contra VARCHAR(25))
BEGIN
	INSERT INTO Usuario (NombreUsuario, Contrasena, TopScore)
    VALUES (Nombre, Contra, '00:00:00');
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS VerificarUsuario;
DELIMITER $$
CREATE PROCEDURE VerificarUsuario(Nombre VARCHAR(25), Contra VARCHAR(25))
BEGIN	
	SELECT IdUsuario, NombreUsuario, TopScore FROM Usuario WHERE NombreUsuario = Nombre AND Contrasena = Contra LIMIT 1;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS ExisteUsuario;
DELIMITER $$
CREATE PROCEDURE ExisteUsuario(Nombre VARCHAR (25))
BEGIN
	SELECT IdUsuario, NombreUsuario FROM Usuario WHERE NombreUsuario = Nombre LIMIT 1;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS ActualizarPuntaje;
DELIMITER $$
CREATE PROCEDURE ActualizarPuntaje(Id VARCHAR (25), ScoreIn TIME)
BEGIN
	UPDATE Usuario SET TopScore = ScoreIn WHERE IdUsuario = Id;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS ObtenerPuntajes;
DELIMITER $$
CREATE PROCEDURE ObtenerPuntajes()
BEGIN
	SELECT NombreUsuario, TopScore FROM Usuario WHERE NombreUsuario != NULL OR TopScore != '00:00:00' ORDER BY TopScore ASC;
END $$
DELIMITER ;