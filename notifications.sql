-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 12, 2017 at 10:38 PM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ccsdomai_workcohol`
--

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` mediumint(8) UNSIGNED NOT NULL,
  `sender_user_id` mediumint(8) UNSIGNED NOT NULL,
  `target_user_id` mediumint(8) UNSIGNED NOT NULL,
  `type` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `createdTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notification_id`, `sender_user_id`, `target_user_id`, `type`, `message`, `is_read`, `createdTime`, `updatedTime`) VALUES
(1, 2, 3, 'friendlist', 'This is notification message', 1, '2017-10-12 18:11:56', '2017-10-12 20:37:46'),
(2, 2, 3, 'request_connect', ' You have a new connection request from User ID : 2', 1, '2017-10-12 19:10:31', '2017-10-12 20:31:35'),
(3, 10, 3, 'request_connect', ' You have a new connection request from User ID : 10', 1, '2017-10-12 19:11:12', '2017-10-12 20:31:39'),
(4, 10, 3, 'accept_connect', ' User ID : 10 has accepted your connection request', 1, '2017-10-12 19:30:00', '2017-10-12 20:37:59'),
(5, 10, 3, 'request_connect', ' You have a new connection request from User ID : 10', 1, '2017-10-12 20:37:50', '2017-10-12 20:37:58'),
(6, 10, 4, 'accept_connect', ' User ID : 10 has accepted your connection request', 0, '2017-10-12 20:37:52', '2017-10-12 20:37:52'),
(7, 10, 3, 'message', ' You have a new message from User ID : 10', 0, '2017-10-12 20:37:54', '2017-10-12 20:37:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
