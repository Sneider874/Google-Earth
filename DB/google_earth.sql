-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 27-11-2025 a las 02:43:45
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `google_earth`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `analisis`
--

DROP TABLE IF EXISTS `analisis`;
CREATE TABLE IF NOT EXISTS `analisis` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_proyecto` int DEFAULT NULL,
  `nombre_analisis` varchar(255) DEFAULT NULL,
  `tipo` varchar(100) DEFAULT NULL,
  `descripcion` text,
  `estado` varchar(50) DEFAULT 'Pendiente',
  `resultado` text,
  `usuario_id` int DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_proyecto` (`id_proyecto`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadisticas`
--

DROP TABLE IF EXISTS `estadisticas`;
CREATE TABLE IF NOT EXISTS `estadisticas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_estadistica` varchar(255) NOT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `unidad` varchar(50) DEFAULT NULL,
  `id_analisis` int DEFAULT NULL,
  `id_rio` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_analisis` (`id_analisis`),
  KEY `id_rio` (`id_rio`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

DROP TABLE IF EXISTS `proyectos`;
CREATE TABLE IF NOT EXISTS `proyectos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `proyectos`
--

INSERT INTO `proyectos` (`id`, `nombre`, `descripcion`, `fecha_creacion`) VALUES
(1, 'Google Earth V3', 'Proyecto de desarrollo basado en plataforma con Google Earth V3', '2025-09-13 23:40:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportes`
--

DROP TABLE IF EXISTS `reportes`;
CREATE TABLE IF NOT EXISTS `reportes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_analisis` int DEFAULT NULL,
  `nombre_reporte` varchar(255) NOT NULL,
  `fecha_generacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `contenido` text,
  PRIMARY KEY (`id`),
  KEY `id_analisis` (`id_analisis`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultados`
--

DROP TABLE IF EXISTS `resultados`;
CREATE TABLE IF NOT EXISTS `resultados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_analisis` int DEFAULT NULL,
  `tipo_resultado` varchar(255) NOT NULL,
  `ruta_archivo_o_url` text,
  PRIMARY KEY (`id`),
  KEY `id_analisis` (`id_analisis`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rios`
--

DROP TABLE IF EXISTS `rios`;
CREATE TABLE IF NOT EXISTS `rios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `ubicacion` text,
  `caudal` decimal(10,2) DEFAULT NULL,
  `fecha_medicion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Admin', 'Rol de administrador del sistema');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `correo` varchar(191) NOT NULL,
  `rol` int DEFAULT NULL,
  `contrasena` varchar(255) NOT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT '0',
  `isPublic` tinyint(1) DEFAULT '0',
  `imagenUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `correo` (`correo`),
  KEY `rol` (`rol`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombre`, `correo`, `rol`, `contrasena`, `isVerified`, `isPublic`, `imagenUrl`) VALUES
(1, 'Edward Murillo', 'ing.murillo@example.com', 1, '', 0, 0, NULL),
(2, 'Chipalo', 'Chipalo@', 0, '', 0, 0, NULL),
(3, 'Usuario Prueba', 'prueba@app.com', 1, '$2b$10$6/758X3T7P2xW5ZEluFN9.suTPrPkJivgC2.SfSE.T5LVZ3Etsa9e', 0, 0, NULL),
(4, 'Pedro Prueba', 'tucorreo.prueba@ejemplo.com', 2, '$2b$10$EQgkuFOwiF6G5ZbbgecDp.AoYZcRCF8pqX/n6DG8UIhQb1OR2h4RK', 0, 0, NULL),
(5, 'Pedro Prueba', 'sneidermurillogonzalez@gmail.com', 2, '$2b$10$ctykQnwcLnuWJiNeglwW/.l3O6NdglO9RWa80IqnBP1.5nyxBFiLO', 1, 0, NULL),
(20, 'jonathan', 'salgadodiaz110@gmail.com', 2, '$2b$10$WYf8gsZwyPXlCW8NEaKHwOwnw5phqVlDu.W0y/bep3F3q39sOvSvC', 0, 0, NULL),
(23, 'edwar', 'edwardibague@gmail.com', 2, '$2b$10$uVkTXz88t3Et/tEErMK2BO261KfglLkI8qMs081tVjZphAenTxWAS', 1, 0, NULL),
(31, 'jerson 2', 'jersonmauriciomurillogonzalez@gmail.com', 1, '$2b$10$nk/Yfmsm5KDAczNQbMiiSe8d54RBzMVOn6PoSwuGquL.TXd3WGhN6', 1, 0, '/uploads/avatars/user-31-1764171730601.jpg');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
