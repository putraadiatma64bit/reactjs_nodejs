-- MariaDB dump 10.19  Distrib 10.4.21-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: dbprofile
-- ------------------------------------------------------
-- Server version	10.4.21-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cat`
--

DROP TABLE IF EXISTS `cat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `users` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat`
--

LOCK TABLES `cat` WRITE;
/*!40000 ALTER TABLE `cat` DISABLE KEYS */;
INSERT INTO `cat` VALUES (1,'artikel',1),(2,'berita',1),(3,'olahraga',1);
/*!40000 ALTER TABLE `cat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page`
--

DROP TABLE IF EXISTS `page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `page` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `photo` varchar(100) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `users` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page`
--

LOCK TABLES `page` WRITE;
/*!40000 ALTER TABLE `page` DISABLE KEYS */;
INSERT INTO `page` VALUES (1,'title1','photo-1690362424876-46336786.png','content1',1,NULL,'2023-07-26 09:07:04'),(2,'title27777',NULL,'content23',1,NULL,'2023-07-26 08:23:29'),(8,'title3',NULL,'asd',1,NULL,NULL),(9,'asd',NULL,'as',1,NULL,NULL),(10,'asd',NULL,'qwe',1,'2023-07-27 01:35:42','2023-07-27 01:35:42'),(11,'asd','photo-1690421790306-8156719.png','qwe',1,'2023-07-27 01:36:30','2023-07-27 01:36:30'),(12,'asd','photo-1690421822672-615892365.png','asdasd',1,'2023-07-27 01:37:02','2023-07-27 01:37:02'),(13,'asd','photo-1690421998896-925559455.png','asdasd',1,'2023-07-27 01:39:58','2023-07-27 01:39:58'),(14,'asd',NULL,'qwe',1,'2023-07-27 01:42:51','2023-07-27 01:42:51'),(15,'asd','photo-1690422196631-860016546.png','qwe',1,'2023-07-27 01:43:16','2023-07-27 01:43:16'),(16,'asd','photo-1690422238245-216513518.png','asdasd',1,'2023-07-27 01:43:58','2023-07-27 01:43:58'),(17,'asd','photo-1690422266546-949402940.png','asdasd',1,'2023-07-27 01:44:26','2023-07-27 01:44:26'),(18,'asd','photo-1690422356338-97665413.png','asdasd',1,'2023-07-27 01:45:56','2023-07-27 01:45:56');
/*!40000 ALTER TABLE `page` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cat` int(11) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `photo` varchar(100) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `users` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,1,'title',NULL,'content',1,NULL,NULL),(2,3,'title2','photo-1690362289796-682480928.png','content27',1,NULL,'2023-07-26 09:04:49'),(4,1,'haloo1','photo-1690357284477-144277875.png','asd',1,'2023-07-26 07:40:18','2023-07-26 08:03:12');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','$2b$10$PPbPRv8iEegO4DYY4I0USunrSfiLrIkA/H6Sdmw11KTLUGry2HVs2','page, post, cat','2023-07-20 10:27:32','2023-07-20 10:27:32');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-27 18:53:21
