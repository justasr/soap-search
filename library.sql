-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2014 m. Lap 24 d. 07:54
-- Server version: 5.6.17-log
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `library`
--

-- --------------------------------------------------------

--
-- Sukurta duomenų struktūra lentelei `authors`
--

CREATE TABLE IF NOT EXISTS `authors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `birthdate` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Sukurta duomenų kopija lentelei `authors`
--

INSERT INTO `authors` (`id`, `name`, `birthdate`) VALUES
(2, 'Author1', '1980-01-01 01 01'),
(3, 'Author2', '1980-01-02 01 01');

-- --------------------------------------------------------

--
-- Sukurta duomenų struktūra lentelei `books`
--

CREATE TABLE IF NOT EXISTS `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `isbn` varchar(15) NOT NULL,
  `theme` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `books_id` (`author_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Sukurta duomenų kopija lentelei `books`
--

INSERT INTO `books` (`id`, `author_id`, `title`, `isbn`, `theme`) VALUES
(1, 2, 'Book Title1', '1234567', 'Horror'),
(2, 3, 'Book Title2', '12345678', 'Drama'),
(3, 2, 'Book Title 3', '987456123', 'Horror'),
(4, 2, 'Book Title 4', '98456321', 'Comedy');

--
-- Apribojimai eksportuotom lentelėm
--

--
-- Apribojimai lentelei `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_authors` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
