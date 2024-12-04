DROP DATABASE IF EXISTS `TallerMecanico_DB`;
CREATE DATABASE IF NOT EXISTS `TallerMecanico_DB` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `TallerMecanico_DB`;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE IF NOT EXISTS `Users` (
  `id` BINARY(16) PRIMARY KEY DEFAULT(UUID_TO_BIN(UUID())),
  `lastname` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL UNIQUE,
  `password` varchar(50) NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `role` ENUM('admin', 'employee', 'client') NOT NULL
);

DROP TABLE IF EXISTS `Services`;
CREATE TABLE IF NOT EXISTS `Services` (
  `id` BINARY(16) PRIMARY KEY DEFAULT(UUID_TO_BIN(UUID())),
  `description` varchar(50) NOT NULL,
  `state` varchar(100) NOT NULL,
  `fecha_inicio` varchar(50) NOT NULL,
  `fecha_fin` varchar(20) NOT NULL
);

DROP TABLE IF EXISTS `Vehicles`;
CREATE TABLE IF NOT EXISTS `Vehicles` (
  `id` BINARY(16) PRIMARY KEY DEFAULT(UUID_TO_BIN(UUID())),
  `brand` varchar(50) NOT NULL,
  `model` varchar(50) NOT NULL,
  `year` varchar(100) NOT NULL,
  `license_plate` varchar(50) NOT NULL UNIQUE,
  `client_id` BINARY(16) NOT NULL,
  `service_id` BINARY(16) NOT NULL,
  FOREIGN KEY (`client_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`service_id`) REFERENCES `Services`(`id`) ON DELETE CASCADE
);



--   FOREIGN KEY (`vehicle_id`) REFERENCES `Vehicles`(`id`) ON DELETE CASCADE




-- CREATE TABLE IF NOT EXISTS `Vehicles` (
--     cliente_id INT NOT NULL,
--     anio INT NOT NULL,
--     estado VARCHAR(100) NOT NULL,
--     fecha_ingreso DATE NOT NULL,
--     fecha_entrega DATE,
--     FOREIGN KEY (cliente_id) REFERENCES Users(id) ON DELETE CASCADE
-- );



-- INSERT INTO `users` (`id`, `lastname`, `name`, `email`, `password`, `role`) VALUES
-- (UUID_TO_BIN(UUID()), 'Negreanu', 'Daniel', 'danielnegreanu@mail.com', 'negreanu10', 'admin'),
-- (UUID_TO_BIN(UUID()), 'Loccoco', 'Alejandro', 'pappomc@free.es', 'pappoloco1', 'employee'),
-- (UUID_TO_BIN(UUID()), 'Lopez', 'Jose', 'joselopez110@gmail.com', 'hijocarlos22', 'client');




-- INSERT INTO `vehicles` (`id`, `brand`, `model`, `year`, `license_plate`, `client_id`, `service_id`) VALUES
-- (UUID_TO_BIN(UUID()), 'toyota', 'corolla', '2019', 'AB15AF', '', ''),
-- (UUID_TO_BIN(UUID()), 'ford', 'ranger', '2021', 'moe152', '', ''),
-- (UUID_TO_BIN(UUID()), 'renault', 'kangoo', '2022', 'asa110', '', '');