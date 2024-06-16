-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2024 at 03:02 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking-app`
--
CREATE DATABASE IF NOT EXISTS `booking-app` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `booking-app`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(1, 2),
(1, 3),
(1, 4),
(1, 7),
(1, 15),
(1, 16),
(2, 3),
(2, 4),
(2, 5),
(3, 1),
(3, 3),
(3, 8),
(3, 10),
(3, 11),
(3, 12),
(3, 14),
(3, 16),
(4, 1),
(4, 2),
(4, 3),
(4, 6),
(4, 7),
(4, 9),
(4, 12),
(4, 15),
(4, 16),
(5, 1),
(5, 2),
(5, 3),
(5, 4),
(5, 7),
(5, 8),
(5, 11),
(5, 13),
(5, 14),
(5, 15),
(5, 16),
(6, 2),
(6, 5),
(6, 6),
(6, 8),
(6, 10),
(6, 14),
(6, 16);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(191) NOT NULL,
  `lastName` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `firstName`, `lastName`, `email`, `password`, `roleId`) VALUES
(1, 'viki', 'Thshchenko', 'admin@gmail.com', '$2b$10$CgW6LdRr7ype1pmYrT.nruShNRGgLKBfdxkyO3tCfMjz/RqCl8U5e', 1),
(2, 'Leo', 'Mateo', 'leo@gmail.com', '$2b$10$8D8cGJPEurc7ZsYQoPZZQO/VFR6JWfM13Lhm7eCp6UyVvpgTxncsC', 2),
(3, 'moshe', 'moshe', 'moshe@gmail.com', '$2b$10$lk4hRmR8wozSlUwY4C2jcu9hPFr0Kz9zf.qtpT41e8VxmxA2FHys2', 2),
(4, 'liam', 'lia', 'liam@gmail.com', '$2b$10$uRH7Jr6TkhaNctMhQX1wxe5KUzmORDavv/QOHwiPaw9TGa5xn1g7a', 2),
(5, 'sasha', 'davis', 'sasha@gmail.com', '$2b$10$3bCeKZXv1njZWYvWBl4eAeR..xjO9jCGViR3HiioHqtgPn8V9BUj2', 2),
(6, 'Tim', 'Leo', 'Tim@gmail.com', '$2b$10$7zJwDimPhuXdY7rcT9kbJu4QFQB47t19loPF4antP5OZQPlPi..TO', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacation`
--

CREATE TABLE `vacation` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `startDate` datetime(3) NOT NULL,
  `endDate` datetime(3) NOT NULL,
  `price` double NOT NULL,
  `imageName` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vacation`
--

INSERT INTO `vacation` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(1, 'Paris, France', 'Known as the \"City of Light,\" Paris is famed for its art, fashion, gastronomy, and culture. Iconic landmarks include the Eiffel Tower, Notre-Dame', '2024-06-11 00:00:00.000', '2024-06-20 00:00:00.000', 1200, '1718026140208.jpg'),
(2, 'Tokyo, Japan', 'Tokyo is a bustling metropolis known for its cutting-edge technology, fashion, and vibrant street life. It offers a mix of modern skyscrapers', '2024-06-11 00:00:00.000', '2024-06-12 00:00:00.000', 870, '1718026308545.jpg'),
(3, 'New York City, USA', 'The epitome of urban living, New York City is a melting pot of cultures, renowned for its iconic skyline, Broadway shows, and diverse culinary scene.', '2024-06-11 00:00:00.000', '2024-06-14 00:00:00.000', 980, '1718026763247.jpg'),
(4, 'Rome, Italy', 'Rome, the Eternal City, is a treasure trove of ancient ruins, Renaissance art, and delicious cuisine. Visitors flock to landmarks like the Colosseum', '2024-06-15 00:00:00.000', '2024-06-17 00:00:00.000', 230, '1718026866338.jpg'),
(5, 'Rio de Janeiro, Brazil', 'Famous for its breathtaking beaches, lively Carnival celebrations, and iconic landmarks like Christ the Redeemer and Sugarloaf Mountain, Rio de Janeiro offers a vibrant mix of culture ', '2024-06-13 00:00:00.000', '2024-06-15 00:00:00.000', 1300, '1718027151026.jpg'),
(6, 'Bali, Indonesia', 'Relax with yoga sessions overlooking lush rice terraces, rejuvenate with spa treatments using local ingredients, and discover Balinese culture.', '2024-06-21 00:00:00.000', '2024-06-21 00:00:00.000', 3400, '1718440569364.jpg'),
(7, 'Norwegian Fjords', 'Sail through breathtaking fjords, witness dramatic landscapes with cascading waterfalls, and explore charming Scandinavian villages.', '2024-07-18 00:00:00.000', '2024-06-27 00:00:00.000', 4500, '1718440739807.jpg'),
(8, 'Aspen, Colorado', 'Ski down world-class slopes, unwind in cozy lodges with mountain views, and enjoy apres-ski activities like hot cocoa by a fireplace.', '2024-08-21 00:00:00.000', '2024-06-28 00:00:00.000', 2340, '1718440849659.jpg'),
(9, 'Paradise in Maldives', 'Enjoy pristine white-sand beaches, crystal-clear waters ideal for snorkeling and diving, and luxurious overwater bungalows.', '2024-08-21 00:00:00.000', '2024-08-22 00:00:00.000', 1300, '1718440974508.jpg'),
(10, 'Patagonia, Chile', 'Trek through rugged landscapes, witness breathtaking glaciers, and explore Torres del Paine National Park for unparalleled hiking experiences.', '2024-06-18 00:00:00.000', '2024-06-28 00:00:00.000', 2400, '1718441074370.jpg'),
(11, 'Santorini, Greece', 'Experience stunning sunsets over the Aegean Sea, explore picturesque white-washed villages, and indulge in Mediterranean cuisine.', '2024-07-17 00:00:00.000', '2024-07-23 00:00:00.000', 3400, '1718441177065.jpg'),
(12, 'Tanzania', 'Witness the annual wildebeest migration, spot the Big Five on game drives, and stay in luxurious tented camps under starry African skies.', '2024-09-19 00:00:00.000', '2024-08-24 00:00:00.000', 5000, '1718441270547.jpg'),
(13, 'Marrakech, Morocco', 'Wander through bustling souks, visit ornate palaces and mosques, and savor traditional Moroccan cuisine in vibrant markets.', '2024-06-16 00:00:00.000', '2024-06-18 00:00:00.000', 380, '1718441395010.jpg'),
(14, 'Queenstown, New Zealand', 'Bungee jump, skydive, and explore Fiordland National Park\'s fjords and glaciers amidst breathtaking landscapes.', '2024-07-01 00:00:00.000', '2024-07-04 00:00:00.000', 1570, '1718441523810.jpg'),
(15, 'Petra, Jordan', 'Marvel at the ancient city carved into pink sandstone cliffs, hike through narrow canyons, and camp under starry desert skies.', '2024-07-25 00:00:00.000', '2024-07-28 00:00:00.000', 2800, '1718441641431.jpg'),
(16, 'Tel Aviv, Israel', 'Experience the vibrant and modern city of Tel Aviv with its beautiful beaches, bustling markets, world-class museums, and vibrant nightlife.', '2024-06-01 00:00:00.000', '2024-06-04 00:00:00.000', 6000, '1718441771028.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('67589aa3-a60a-4782-824a-e39827f4cf11', '67280c4faedcab2a98ceb96bd3df5d6bab3b5ca6e1117a8e7016b0c7e34774b9', '2024-06-09 17:02:00.502', '20240501081249_creating_mysql_tables', NULL, NULL, '2024-06-09 17:02:00.150', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `User_email_key` (`email`),
  ADD KEY `User_roleId_fkey` (`roleId`);

--
-- Indexes for table `vacation`
--
ALTER TABLE `vacation`
  ADD PRIMARY KEY (`vacationId`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `vacation`
--
ALTER TABLE `vacation`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `Followers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Followers_vacationId_fkey` FOREIGN KEY (`vacationId`) REFERENCES `vacation` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
