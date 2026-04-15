-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: kk_spare_parts
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `full_name` varchar(150) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address_line1` varchar(255) DEFAULT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bought_together`
--

DROP TABLE IF EXISTS `bought_together`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bought_together` (
  `product_id` int NOT NULL,
  `related_product_id` int NOT NULL,
  PRIMARY KEY (`product_id`,`related_product_id`),
  KEY `related_product_id` (`related_product_id`),
  CONSTRAINT `bought_together_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `bought_together_ibfk_2` FOREIGN KEY (`related_product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bought_together`
--

LOCK TABLES `bought_together` WRITE;
/*!40000 ALTER TABLE `bought_together` DISABLE KEYS */;
INSERT INTO `bought_together` VALUES (4,1),(7,1),(6,2),(8,3),(1,4),(7,4),(2,6),(1,7),(3,8);
/*!40000 ALTER TABLE `bought_together` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Hero','2026-03-31 18:04:41'),(2,'Honda','2026-03-31 18:04:41'),(3,'Bajaj','2026-03-31 18:04:41'),(4,'TVS','2026-03-31 18:04:41'),(5,'Royal Enfield','2026-03-31 18:04:41'),(6,'Yamaha','2026-03-31 18:04:41'),(7,'Suzuki','2026-03-31 18:04:41'),(8,'Scooters','2026-03-31 18:04:41');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int DEFAULT '1',
  `added_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_cart_item` (`user_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `part_count` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Engine',12540,'2026-03-31 18:04:42'),(2,'Brakes',8320,'2026-03-31 18:04:42'),(3,'Electrical',6410,'2026-03-31 18:04:42'),(4,'Suspension',4215,'2026-03-31 18:04:42'),(5,'Body',9102,'2026-03-31 18:04:42'),(6,'Tyres',3200,'2026-03-31 18:04:42'),(7,'Filters',5420,'2026-03-31 18:04:42'),(8,'Lights',7100,'2026-03-31 18:04:42'),(9,'Exhaust',2150,'2026-03-31 18:04:42'),(10,'Transmission',3890,'2026-03-31 18:04:42');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `models`
--

DROP TABLE IF EXISTS `models`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `models` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brand_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_brand_model` (`brand_id`,`name`),
  CONSTRAINT `models_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `models`
--

LOCK TABLES `models` WRITE;
/*!40000 ALTER TABLE `models` DISABLE KEYS */;
INSERT INTO `models` VALUES (1,1,'Splendor','2026-03-31 18:04:41'),(2,1,'Passion','2026-03-31 18:04:41'),(3,1,'CBZ','2026-03-31 18:04:41'),(4,1,'Xpulse','2026-03-31 18:04:41'),(5,2,'Shine','2026-03-31 18:04:41'),(6,2,'Unicorn','2026-03-31 18:04:41'),(7,2,'CBR','2026-03-31 18:04:41'),(8,2,'Activa','2026-03-31 18:04:41'),(9,3,'Pulsar','2026-03-31 18:04:41'),(10,3,'Discover','2026-03-31 18:04:41'),(11,3,'Dominar','2026-03-31 18:04:41'),(12,3,'Platina','2026-03-31 18:04:41'),(13,4,'Apache','2026-03-31 18:04:41'),(14,4,'Jupiter','2026-03-31 18:04:41'),(15,4,'NTORQ','2026-03-31 18:04:41'),(16,4,'Star City','2026-03-31 18:04:41'),(17,5,'Classic 350','2026-03-31 18:04:41'),(18,5,'Bullet 350','2026-03-31 18:04:41'),(19,5,'Himalayan','2026-03-31 18:04:41'),(20,5,'Meteor','2026-03-31 18:04:41'),(21,6,'R15','2026-03-31 18:04:41'),(22,6,'MT-15','2026-03-31 18:04:41'),(23,6,'FZS','2026-03-31 18:04:41'),(24,6,'Fascino','2026-03-31 18:04:41'),(25,7,'Gixxer','2026-03-31 18:04:41'),(26,7,'Access','2026-03-31 18:04:41'),(27,7,'Burgman','2026-03-31 18:04:41'),(28,7,'Intruder','2026-03-31 18:04:41'),(29,8,'Generic 110cc','2026-03-31 18:04:41'),(30,8,'Generic 125cc','2026-03-31 18:04:41'),(31,8,'Electric Scooty','2026-03-31 18:04:41');
/*!40000 ALTER TABLE `models` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `unit_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,4,2,2450.00),(2,1,5,1,3200.00),(3,2,1,2,1200.00),(4,2,2,1,450.00),(5,2,3,1,1100.00);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `address_id` int DEFAULT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','confirmed','shipped','delivered','cancelled') DEFAULT 'pending',
  `payment_method` enum('COD','online') DEFAULT 'COD',
  `payment_status` enum('unpaid','paid','refunded') DEFAULT 'unpaid',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,NULL,8100.00,'confirmed','COD','unpaid','2026-04-02 07:30:14','2026-04-02 09:08:18'),(2,1,NULL,3950.00,'pending','COD','unpaid','2026-04-02 14:19:39','2026-04-02 14:19:39');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_compatibility`
--

DROP TABLE IF EXISTS `product_compatibility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_compatibility` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `brand_id` int NOT NULL,
  `model_id` int NOT NULL,
  `year_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_compat` (`product_id`,`brand_id`,`model_id`,`year_id`),
  KEY `brand_id` (`brand_id`),
  KEY `model_id` (`model_id`),
  KEY `year_id` (`year_id`),
  CONSTRAINT `product_compatibility_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_compatibility_ibfk_2` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  CONSTRAINT `product_compatibility_ibfk_3` FOREIGN KEY (`model_id`) REFERENCES `models` (`id`),
  CONSTRAINT `product_compatibility_ibfk_4` FOREIGN KEY (`year_id`) REFERENCES `years` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_compatibility`
--

LOCK TABLES `product_compatibility` WRITE;
/*!40000 ALTER TABLE `product_compatibility` DISABLE KEYS */;
INSERT INTO `product_compatibility` VALUES (1,1,1,1,10),(2,2,2,8,10),(3,9,1,1,1),(4,9,1,1,2),(5,9,1,1,3),(6,9,1,1,4),(7,9,1,1,5),(8,9,1,1,6),(9,9,1,1,7),(10,9,1,1,8),(11,9,1,1,9),(12,9,1,1,10),(13,10,3,9,1),(14,10,3,9,2),(15,10,3,9,3),(16,10,3,9,4),(17,10,3,9,5),(18,10,3,9,6),(19,10,3,9,7),(20,10,3,9,8),(21,10,3,9,9),(22,10,3,9,10),(23,11,2,5,1),(24,11,2,5,2),(25,11,2,5,3),(26,11,2,5,4),(27,11,2,5,5),(28,11,2,5,6),(29,11,2,5,7),(30,11,2,5,8),(31,11,2,5,9),(32,11,2,5,10),(33,12,1,1,1),(34,12,1,1,2),(35,12,1,1,3),(36,12,1,1,4),(37,12,1,1,5),(38,12,1,1,6),(39,12,1,1,7),(40,12,1,1,8),(41,12,1,1,9),(42,12,1,1,10),(43,12,5,18,1),(44,12,5,18,2),(45,12,5,18,3),(46,12,5,18,4),(47,12,5,18,5),(48,12,5,18,6),(49,12,5,18,7),(50,12,5,18,8),(51,12,5,18,9),(52,12,5,18,10),(53,13,5,18,1),(54,13,5,18,2),(55,13,5,18,3),(56,13,5,18,4),(57,13,5,18,5),(58,13,5,18,6),(59,13,5,18,7),(60,13,5,18,8),(61,13,5,18,9),(62,13,5,18,10),(63,14,6,23,1),(64,14,6,23,2),(65,14,6,23,3),(66,14,6,23,4),(67,14,6,23,5),(68,14,6,23,6),(69,14,6,23,7),(70,14,6,23,8),(71,14,6,23,9),(72,14,6,23,10),(73,15,4,13,1),(74,15,4,13,2),(75,15,4,13,3),(76,15,4,13,4),(77,15,4,13,5),(78,15,4,13,6),(79,15,4,13,7),(80,15,4,13,8),(81,15,4,13,9),(82,15,4,13,10),(83,16,3,11,1),(84,16,3,11,2),(85,16,3,11,3),(86,16,3,11,4),(87,16,3,11,5),(88,16,3,11,6),(89,16,3,11,7),(90,16,3,11,8),(91,16,3,11,9),(92,16,3,11,10),(93,17,2,8,1),(94,17,2,8,2),(95,17,2,8,3),(96,17,2,8,4),(97,17,2,8,5),(98,17,2,8,6),(99,17,2,8,7),(100,17,2,8,8),(101,17,2,8,9),(102,17,2,8,10),(103,18,3,9,1),(104,18,3,9,2),(105,18,3,9,3),(106,18,3,9,4),(107,18,3,9,5),(108,18,3,9,6),(109,18,3,9,7),(110,18,3,9,8),(111,18,3,9,9),(112,18,3,9,10),(113,18,4,13,1),(114,18,4,13,2),(115,18,4,13,3),(116,18,4,13,4),(117,18,4,13,5),(118,18,4,13,6),(119,18,4,13,7),(120,18,4,13,8),(121,18,4,13,9),(122,18,4,13,10),(123,18,6,21,1),(124,18,6,21,2),(125,18,6,21,3),(126,18,6,21,4),(127,18,6,21,5),(128,18,6,21,6),(129,18,6,21,7),(130,18,6,21,8),(131,18,6,21,9),(132,18,6,21,10),(133,19,7,25,1),(134,19,7,25,2),(135,19,7,25,3),(136,19,7,25,4),(137,19,7,25,5),(138,19,7,25,6),(139,19,7,25,7),(140,19,7,25,8),(141,19,7,25,9),(142,19,7,25,10),(143,20,1,1,1),(144,20,1,1,2),(145,20,1,1,3),(146,20,1,1,4),(147,20,1,1,5),(148,20,1,1,6),(149,20,1,1,7),(150,20,1,1,8),(151,20,1,1,9),(152,20,1,1,10),(153,20,1,2,1),(154,20,1,2,2),(155,20,1,2,3),(156,20,1,2,4),(157,20,1,2,5),(158,20,1,2,6),(159,20,1,2,7),(160,20,1,2,8),(161,20,1,2,9),(162,20,1,2,10),(163,20,1,3,1),(164,20,1,3,2),(165,20,1,3,3),(166,20,1,3,4),(167,20,1,3,5),(168,20,1,3,6),(169,20,1,3,7),(170,20,1,3,8),(171,20,1,3,9),(172,20,1,3,10),(173,20,1,4,1),(174,20,1,4,2),(175,20,1,4,3),(176,20,1,4,4),(177,20,1,4,5),(178,20,1,4,6),(179,20,1,4,7),(180,20,1,4,8),(181,20,1,4,9),(182,20,1,4,10),(183,20,2,5,1),(184,20,2,5,2),(185,20,2,5,3),(186,20,2,5,4),(187,20,2,5,5),(188,20,2,5,6),(189,20,2,5,7),(190,20,2,5,8),(191,20,2,5,9),(192,20,2,5,10),(193,20,2,6,1),(194,20,2,6,2),(195,20,2,6,3),(196,20,2,6,4),(197,20,2,6,5),(198,20,2,6,6),(199,20,2,6,7),(200,20,2,6,8),(201,20,2,6,9),(202,20,2,6,10),(203,20,2,7,1),(204,20,2,7,2),(205,20,2,7,3),(206,20,2,7,4),(207,20,2,7,5),(208,20,2,7,6),(209,20,2,7,7),(210,20,2,7,8),(211,20,2,7,9),(212,20,2,7,10),(213,20,2,8,1),(214,20,2,8,2),(215,20,2,8,3),(216,20,2,8,4),(217,20,2,8,5),(218,20,2,8,6),(219,20,2,8,7),(220,20,2,8,8),(221,20,2,8,9),(222,20,2,8,10),(223,20,3,9,1),(224,20,3,9,2),(225,20,3,9,3),(226,20,3,9,4),(227,20,3,9,5),(228,20,3,9,6),(229,20,3,9,7),(230,20,3,9,8),(231,20,3,9,9),(232,20,3,9,10),(233,20,3,10,1),(234,20,3,10,2),(235,20,3,10,3),(236,20,3,10,4),(237,20,3,10,5),(238,20,3,10,6),(239,20,3,10,7),(240,20,3,10,8),(241,20,3,10,9),(242,20,3,10,10),(243,20,3,11,1),(244,20,3,11,2),(245,20,3,11,3),(246,20,3,11,4),(247,20,3,11,5),(248,20,3,11,6),(249,20,3,11,7),(250,20,3,11,8),(251,20,3,11,9),(252,20,3,11,10),(253,20,3,12,1),(254,20,3,12,2),(255,20,3,12,3),(256,20,3,12,4),(257,20,3,12,5),(258,20,3,12,6),(259,20,3,12,7),(260,20,3,12,8),(261,20,3,12,9),(262,20,3,12,10),(263,20,4,13,1),(264,20,4,13,2),(265,20,4,13,3),(266,20,4,13,4),(267,20,4,13,5),(268,20,4,13,6),(269,20,4,13,7),(270,20,4,13,8),(271,20,4,13,9),(272,20,4,13,10),(273,20,4,14,1),(274,20,4,14,2),(275,20,4,14,3),(276,20,4,14,4),(277,20,4,14,5),(278,20,4,14,6),(279,20,4,14,7),(280,20,4,14,8),(281,20,4,14,9),(282,20,4,14,10),(283,20,4,15,1),(284,20,4,15,2),(285,20,4,15,3),(286,20,4,15,4),(287,20,4,15,5),(288,20,4,15,6),(289,20,4,15,7),(290,20,4,15,8),(291,20,4,15,9),(292,20,4,15,10),(293,20,4,16,1),(294,20,4,16,2),(295,20,4,16,3),(296,20,4,16,4),(297,20,4,16,5),(298,20,4,16,6),(299,20,4,16,7),(300,20,4,16,8),(301,20,4,16,9),(302,20,4,16,10),(303,20,5,17,1),(304,20,5,17,2),(305,20,5,17,3),(306,20,5,17,4),(307,20,5,17,5),(308,20,5,17,6),(309,20,5,17,7),(310,20,5,17,8),(311,20,5,17,9),(312,20,5,17,10),(313,20,5,18,1),(314,20,5,18,2),(315,20,5,18,3),(316,20,5,18,4),(317,20,5,18,5),(318,20,5,18,6),(319,20,5,18,7),(320,20,5,18,8),(321,20,5,18,9),(322,20,5,18,10),(323,20,5,19,1),(324,20,5,19,2),(325,20,5,19,3),(326,20,5,19,4),(327,20,5,19,5),(328,20,5,19,6),(329,20,5,19,7),(330,20,5,19,8),(331,20,5,19,9),(332,20,5,19,10),(333,20,5,20,1),(334,20,5,20,2),(335,20,5,20,3),(336,20,5,20,4),(337,20,5,20,5),(338,20,5,20,6),(339,20,5,20,7),(340,20,5,20,8),(341,20,5,20,9),(342,20,5,20,10),(343,20,6,21,1),(344,20,6,21,2),(345,20,6,21,3),(346,20,6,21,4),(347,20,6,21,5),(348,20,6,21,6),(349,20,6,21,7),(350,20,6,21,8),(351,20,6,21,9),(352,20,6,21,10),(353,20,6,22,1),(354,20,6,22,2),(355,20,6,22,3),(356,20,6,22,4),(357,20,6,22,5),(358,20,6,22,6),(359,20,6,22,7),(360,20,6,22,8),(361,20,6,22,9),(362,20,6,22,10),(363,20,6,23,1),(364,20,6,23,2),(365,20,6,23,3),(366,20,6,23,4),(367,20,6,23,5),(368,20,6,23,6),(369,20,6,23,7),(370,20,6,23,8),(371,20,6,23,9),(372,20,6,23,10),(373,20,6,24,1),(374,20,6,24,2),(375,20,6,24,3),(376,20,6,24,4),(377,20,6,24,5),(378,20,6,24,6),(379,20,6,24,7),(380,20,6,24,8),(381,20,6,24,9),(382,20,6,24,10),(383,20,7,25,1),(384,20,7,25,2),(385,20,7,25,3),(386,20,7,25,4),(387,20,7,25,5),(388,20,7,25,6),(389,20,7,25,7),(390,20,7,25,8),(391,20,7,25,9),(392,20,7,25,10),(393,20,7,26,1),(394,20,7,26,2),(395,20,7,26,3),(396,20,7,26,4),(397,20,7,26,5),(398,20,7,26,6),(399,20,7,26,7),(400,20,7,26,8),(401,20,7,26,9),(402,20,7,26,10),(403,20,7,27,1),(404,20,7,27,2),(405,20,7,27,3),(406,20,7,27,4),(407,20,7,27,5),(408,20,7,27,6),(409,20,7,27,7),(410,20,7,27,8),(411,20,7,27,9),(412,20,7,27,10),(413,20,7,28,1),(414,20,7,28,2),(415,20,7,28,3),(416,20,7,28,4),(417,20,7,28,5),(418,20,7,28,6),(419,20,7,28,7),(420,20,7,28,8),(421,20,7,28,9),(422,20,7,28,10),(423,20,8,29,1),(424,20,8,29,2),(425,20,8,29,3),(426,20,8,29,4),(427,20,8,29,5),(428,20,8,29,6),(429,20,8,29,7),(430,20,8,29,8),(431,20,8,29,9),(432,20,8,29,10),(433,20,8,30,1),(434,20,8,30,2),(435,20,8,30,3),(436,20,8,30,4),(437,20,8,30,5),(438,20,8,30,6),(439,20,8,30,7),(440,20,8,30,8),(441,20,8,30,9),(442,20,8,30,10),(443,20,8,31,1),(444,20,8,31,2),(445,20,8,31,3),(446,20,8,31,4),(447,20,8,31,5),(448,20,8,31,6),(449,20,8,31,7),(450,20,8,31,8),(451,20,8,31,9),(452,20,8,31,10),(453,21,5,17,1),(454,21,5,17,2),(455,21,5,17,3),(456,21,5,17,4),(457,21,5,17,5),(458,21,5,17,6),(459,21,5,17,7),(460,21,5,17,8),(461,21,5,17,9),(462,21,5,17,10),(463,22,1,1,1),(464,22,1,1,2),(465,22,1,1,3),(466,22,1,1,4),(467,22,1,1,5),(468,22,1,1,6),(469,22,1,1,7),(470,22,1,1,8),(471,22,1,1,9),(472,22,1,1,10),(473,22,1,2,1),(474,22,1,2,2),(475,22,1,2,3),(476,22,1,2,4),(477,22,1,2,5),(478,22,1,2,6),(479,22,1,2,7),(480,22,1,2,8),(481,22,1,2,9),(482,22,1,2,10),(483,23,6,21,1),(484,23,6,21,2),(485,23,6,21,3),(486,23,6,21,4),(487,23,6,21,5),(488,23,6,21,6),(489,23,6,21,7),(490,23,6,21,8),(491,23,6,21,9),(492,23,6,21,10),(493,24,4,14,1),(494,24,4,14,2),(495,24,4,14,3),(496,24,4,14,4),(497,24,4,14,5),(498,24,4,14,6),(499,24,4,14,7),(500,24,4,14,8),(501,24,4,14,9),(502,24,4,14,10),(503,25,1,1,1),(504,25,1,1,2),(505,25,1,1,3),(506,25,1,1,4),(507,25,1,1,5),(508,25,1,1,6),(509,25,1,1,7),(510,25,1,1,8),(511,25,1,1,9),(512,25,1,1,10),(513,25,1,2,1),(514,25,1,2,2),(515,25,1,2,3),(516,25,1,2,4),(517,25,1,2,5),(518,25,1,2,6),(519,25,1,2,7),(520,25,1,2,8),(521,25,1,2,9),(522,25,1,2,10),(523,25,1,3,1),(524,25,1,3,2),(525,25,1,3,3),(526,25,1,3,4),(527,25,1,3,5),(528,25,1,3,6),(529,25,1,3,7),(530,25,1,3,8),(531,25,1,3,9),(532,25,1,3,10),(533,25,1,4,1),(534,25,1,4,2),(535,25,1,4,3),(536,25,1,4,4),(537,25,1,4,5),(538,25,1,4,6),(539,25,1,4,7),(540,25,1,4,8),(541,25,1,4,9),(542,25,1,4,10),(543,25,2,5,1),(544,25,2,5,2),(545,25,2,5,3),(546,25,2,5,4),(547,25,2,5,5),(548,25,2,5,6),(549,25,2,5,7),(550,25,2,5,8),(551,25,2,5,9),(552,25,2,5,10),(553,25,2,6,1),(554,25,2,6,2),(555,25,2,6,3),(556,25,2,6,4),(557,25,2,6,5),(558,25,2,6,6),(559,25,2,6,7),(560,25,2,6,8),(561,25,2,6,9),(562,25,2,6,10),(563,25,2,7,1),(564,25,2,7,2),(565,25,2,7,3),(566,25,2,7,4),(567,25,2,7,5),(568,25,2,7,6),(569,25,2,7,7),(570,25,2,7,8),(571,25,2,7,9),(572,25,2,7,10),(573,25,2,8,1),(574,25,2,8,2),(575,25,2,8,3),(576,25,2,8,4),(577,25,2,8,5),(578,25,2,8,6),(579,25,2,8,7),(580,25,2,8,8),(581,25,2,8,9),(582,25,2,8,10),(583,25,3,9,1),(584,25,3,9,2),(585,25,3,9,3),(586,25,3,9,4),(587,25,3,9,5),(588,25,3,9,6),(589,25,3,9,7),(590,25,3,9,8),(591,25,3,9,9),(592,25,3,9,10),(593,25,3,10,1),(594,25,3,10,2),(595,25,3,10,3),(596,25,3,10,4),(597,25,3,10,5),(598,25,3,10,6),(599,25,3,10,7),(600,25,3,10,8),(601,25,3,10,9),(602,25,3,10,10),(603,25,3,11,1),(604,25,3,11,2),(605,25,3,11,3),(606,25,3,11,4),(607,25,3,11,5),(608,25,3,11,6),(609,25,3,11,7),(610,25,3,11,8),(611,25,3,11,9),(612,25,3,11,10),(613,25,3,12,1),(614,25,3,12,2),(615,25,3,12,3),(616,25,3,12,4),(617,25,3,12,5),(618,25,3,12,6),(619,25,3,12,7),(620,25,3,12,8),(621,25,3,12,9),(622,25,3,12,10),(623,25,4,13,1),(624,25,4,13,2),(625,25,4,13,3),(626,25,4,13,4),(627,25,4,13,5),(628,25,4,13,6),(629,25,4,13,7),(630,25,4,13,8),(631,25,4,13,9),(632,25,4,13,10),(633,25,4,14,1),(634,25,4,14,2),(635,25,4,14,3),(636,25,4,14,4),(637,25,4,14,5),(638,25,4,14,6),(639,25,4,14,7),(640,25,4,14,8),(641,25,4,14,9),(642,25,4,14,10),(643,25,4,15,1),(644,25,4,15,2),(645,25,4,15,3),(646,25,4,15,4),(647,25,4,15,5),(648,25,4,15,6),(649,25,4,15,7),(650,25,4,15,8),(651,25,4,15,9),(652,25,4,15,10),(653,25,4,16,1),(654,25,4,16,2),(655,25,4,16,3),(656,25,4,16,4),(657,25,4,16,5),(658,25,4,16,6),(659,25,4,16,7),(660,25,4,16,8),(661,25,4,16,9),(662,25,4,16,10),(663,25,5,17,1),(664,25,5,17,2),(665,25,5,17,3),(666,25,5,17,4),(667,25,5,17,5),(668,25,5,17,6),(669,25,5,17,7),(670,25,5,17,8),(671,25,5,17,9),(672,25,5,17,10),(673,25,5,18,1),(674,25,5,18,2),(675,25,5,18,3),(676,25,5,18,4),(677,25,5,18,5),(678,25,5,18,6),(679,25,5,18,7),(680,25,5,18,8),(681,25,5,18,9),(682,25,5,18,10),(683,25,5,19,1),(684,25,5,19,2),(685,25,5,19,3),(686,25,5,19,4),(687,25,5,19,5),(688,25,5,19,6),(689,25,5,19,7),(690,25,5,19,8),(691,25,5,19,9),(692,25,5,19,10),(693,25,5,20,1),(694,25,5,20,2),(695,25,5,20,3),(696,25,5,20,4),(697,25,5,20,5),(698,25,5,20,6),(699,25,5,20,7),(700,25,5,20,8),(701,25,5,20,9),(702,25,5,20,10),(703,25,6,21,1),(704,25,6,21,2),(705,25,6,21,3),(706,25,6,21,4),(707,25,6,21,5),(708,25,6,21,6),(709,25,6,21,7),(710,25,6,21,8),(711,25,6,21,9),(712,25,6,21,10),(713,25,6,22,1),(714,25,6,22,2),(715,25,6,22,3),(716,25,6,22,4),(717,25,6,22,5),(718,25,6,22,6),(719,25,6,22,7),(720,25,6,22,8),(721,25,6,22,9),(722,25,6,22,10),(723,25,6,23,1),(724,25,6,23,2),(725,25,6,23,3),(726,25,6,23,4),(727,25,6,23,5),(728,25,6,23,6),(729,25,6,23,7),(730,25,6,23,8),(731,25,6,23,9),(732,25,6,23,10),(733,25,6,24,1),(734,25,6,24,2),(735,25,6,24,3),(736,25,6,24,4),(737,25,6,24,5),(738,25,6,24,6),(739,25,6,24,7),(740,25,6,24,8),(741,25,6,24,9),(742,25,6,24,10),(743,25,7,25,1),(744,25,7,25,2),(745,25,7,25,3),(746,25,7,25,4),(747,25,7,25,5),(748,25,7,25,6),(749,25,7,25,7),(750,25,7,25,8),(751,25,7,25,9),(752,25,7,25,10),(753,25,7,26,1),(754,25,7,26,2),(755,25,7,26,3),(756,25,7,26,4),(757,25,7,26,5),(758,25,7,26,6),(759,25,7,26,7),(760,25,7,26,8),(761,25,7,26,9),(762,25,7,26,10),(763,25,7,27,1),(764,25,7,27,2),(765,25,7,27,3),(766,25,7,27,4),(767,25,7,27,5),(768,25,7,27,6),(769,25,7,27,7),(770,25,7,27,8),(771,25,7,27,9),(772,25,7,27,10),(773,25,7,28,1),(774,25,7,28,2),(775,25,7,28,3),(776,25,7,28,4),(777,25,7,28,5),(778,25,7,28,6),(779,25,7,28,7),(780,25,7,28,8),(781,25,7,28,9),(782,25,7,28,10),(783,25,8,29,1),(784,25,8,29,2),(785,25,8,29,3),(786,25,8,29,4),(787,25,8,29,5),(788,25,8,29,6),(789,25,8,29,7),(790,25,8,29,8),(791,25,8,29,9),(792,25,8,29,10),(793,25,8,30,1),(794,25,8,30,2),(795,25,8,30,3),(796,25,8,30,4),(797,25,8,30,5),(798,25,8,30,6),(799,25,8,30,7),(800,25,8,30,8),(801,25,8,30,9),(802,25,8,30,10),(803,25,8,31,1),(804,25,8,31,2),(805,25,8,31,3),(806,25,8,31,4),(807,25,8,31,5),(808,25,8,31,6),(809,25,8,31,7),(810,25,8,31,8),(811,25,8,31,9),(812,25,8,31,10),(813,26,2,7,1),(814,26,2,7,2),(815,26,2,7,3),(816,26,2,7,4),(817,26,2,7,5),(818,26,2,7,6),(819,26,2,7,7),(820,26,2,7,8),(821,26,2,7,9),(822,26,2,7,10),(823,27,3,12,1),(824,27,3,12,2),(825,27,3,12,3),(826,27,3,12,4),(827,27,3,12,5),(828,27,3,12,6),(829,27,3,12,7),(830,27,3,12,8),(831,27,3,12,9),(832,27,3,12,10),(833,28,1,1,1),(834,28,1,1,2),(835,28,1,1,3),(836,28,1,1,4),(837,28,1,1,5),(838,28,1,1,6),(839,28,1,1,7),(840,28,1,1,8),(841,28,1,1,9),(842,28,1,1,10),(843,28,1,2,1),(844,28,1,2,2),(845,28,1,2,3),(846,28,1,2,4),(847,28,1,2,5),(848,28,1,2,6),(849,28,1,2,7),(850,28,1,2,8),(851,28,1,2,9),(852,28,1,2,10),(853,28,1,3,1),(854,28,1,3,2),(855,28,1,3,3),(856,28,1,3,4),(857,28,1,3,5),(858,28,1,3,6),(859,28,1,3,7),(860,28,1,3,8),(861,28,1,3,9),(862,28,1,3,10),(863,28,1,4,1),(864,28,1,4,2),(865,28,1,4,3),(866,28,1,4,4),(867,28,1,4,5),(868,28,1,4,6),(869,28,1,4,7),(870,28,1,4,8),(871,28,1,4,9),(872,28,1,4,10),(873,28,2,5,1),(874,28,2,5,2),(875,28,2,5,3),(876,28,2,5,4),(877,28,2,5,5),(878,28,2,5,6),(879,28,2,5,7),(880,28,2,5,8),(881,28,2,5,9),(882,28,2,5,10),(883,28,2,6,1),(884,28,2,6,2),(885,28,2,6,3),(886,28,2,6,4),(887,28,2,6,5),(888,28,2,6,6),(889,28,2,6,7),(890,28,2,6,8),(891,28,2,6,9),(892,28,2,6,10),(893,28,2,7,1),(894,28,2,7,2),(895,28,2,7,3),(896,28,2,7,4),(897,28,2,7,5),(898,28,2,7,6),(899,28,2,7,7),(900,28,2,7,8),(901,28,2,7,9),(902,28,2,7,10),(903,28,2,8,1),(904,28,2,8,2),(905,28,2,8,3),(906,28,2,8,4),(907,28,2,8,5),(908,28,2,8,6),(909,28,2,8,7),(910,28,2,8,8),(911,28,2,8,9),(912,28,2,8,10),(913,28,3,9,1),(914,28,3,9,2),(915,28,3,9,3),(916,28,3,9,4),(917,28,3,9,5),(918,28,3,9,6),(919,28,3,9,7),(920,28,3,9,8),(921,28,3,9,9),(922,28,3,9,10),(923,28,3,10,1),(924,28,3,10,2),(925,28,3,10,3),(926,28,3,10,4),(927,28,3,10,5),(928,28,3,10,6),(929,28,3,10,7),(930,28,3,10,8),(931,28,3,10,9),(932,28,3,10,10),(933,28,3,11,1),(934,28,3,11,2),(935,28,3,11,3),(936,28,3,11,4),(937,28,3,11,5),(938,28,3,11,6),(939,28,3,11,7),(940,28,3,11,8),(941,28,3,11,9),(942,28,3,11,10),(943,28,3,12,1),(944,28,3,12,2),(945,28,3,12,3),(946,28,3,12,4),(947,28,3,12,5),(948,28,3,12,6),(949,28,3,12,7),(950,28,3,12,8),(951,28,3,12,9),(952,28,3,12,10),(953,28,4,13,1),(954,28,4,13,2),(955,28,4,13,3),(956,28,4,13,4),(957,28,4,13,5),(958,28,4,13,6),(959,28,4,13,7),(960,28,4,13,8),(961,28,4,13,9),(962,28,4,13,10),(963,28,4,14,1),(964,28,4,14,2),(965,28,4,14,3),(966,28,4,14,4),(967,28,4,14,5),(968,28,4,14,6),(969,28,4,14,7),(970,28,4,14,8),(971,28,4,14,9),(972,28,4,14,10),(973,28,4,15,1),(974,28,4,15,2),(975,28,4,15,3),(976,28,4,15,4),(977,28,4,15,5),(978,28,4,15,6),(979,28,4,15,7),(980,28,4,15,8),(981,28,4,15,9),(982,28,4,15,10),(983,28,4,16,1),(984,28,4,16,2),(985,28,4,16,3),(986,28,4,16,4),(987,28,4,16,5),(988,28,4,16,6),(989,28,4,16,7),(990,28,4,16,8),(991,28,4,16,9),(992,28,4,16,10),(993,28,5,17,1),(994,28,5,17,2),(995,28,5,17,3),(996,28,5,17,4),(997,28,5,17,5),(998,28,5,17,6),(999,28,5,17,7),(1000,28,5,17,8),(1001,28,5,17,9),(1002,28,5,17,10),(1003,28,5,18,1),(1004,28,5,18,2),(1005,28,5,18,3),(1006,28,5,18,4),(1007,28,5,18,5),(1008,28,5,18,6),(1009,28,5,18,7),(1010,28,5,18,8),(1011,28,5,18,9),(1012,28,5,18,10),(1013,28,5,19,1),(1014,28,5,19,2),(1015,28,5,19,3),(1016,28,5,19,4),(1017,28,5,19,5),(1018,28,5,19,6),(1019,28,5,19,7),(1020,28,5,19,8),(1021,28,5,19,9),(1022,28,5,19,10),(1023,28,5,20,1),(1024,28,5,20,2),(1025,28,5,20,3),(1026,28,5,20,4),(1027,28,5,20,5),(1028,28,5,20,6),(1029,28,5,20,7),(1030,28,5,20,8),(1031,28,5,20,9),(1032,28,5,20,10),(1033,28,6,21,1),(1034,28,6,21,2),(1035,28,6,21,3),(1036,28,6,21,4),(1037,28,6,21,5),(1038,28,6,21,6),(1039,28,6,21,7),(1040,28,6,21,8),(1041,28,6,21,9),(1042,28,6,21,10),(1043,28,6,22,1),(1044,28,6,22,2),(1045,28,6,22,3),(1046,28,6,22,4),(1047,28,6,22,5),(1048,28,6,22,6),(1049,28,6,22,7),(1050,28,6,22,8),(1051,28,6,22,9),(1052,28,6,22,10),(1053,28,6,23,1),(1054,28,6,23,2),(1055,28,6,23,3),(1056,28,6,23,4),(1057,28,6,23,5),(1058,28,6,23,6),(1059,28,6,23,7),(1060,28,6,23,8),(1061,28,6,23,9),(1062,28,6,23,10),(1063,28,6,24,1),(1064,28,6,24,2),(1065,28,6,24,3),(1066,28,6,24,4),(1067,28,6,24,5),(1068,28,6,24,6),(1069,28,6,24,7),(1070,28,6,24,8),(1071,28,6,24,9),(1072,28,6,24,10),(1073,28,7,25,1),(1074,28,7,25,2),(1075,28,7,25,3),(1076,28,7,25,4),(1077,28,7,25,5),(1078,28,7,25,6),(1079,28,7,25,7),(1080,28,7,25,8),(1081,28,7,25,9),(1082,28,7,25,10),(1083,28,7,26,1),(1084,28,7,26,2),(1085,28,7,26,3),(1086,28,7,26,4),(1087,28,7,26,5),(1088,28,7,26,6),(1089,28,7,26,7),(1090,28,7,26,8),(1091,28,7,26,9),(1092,28,7,26,10),(1093,28,7,27,1),(1094,28,7,27,2),(1095,28,7,27,3),(1096,28,7,27,4),(1097,28,7,27,5),(1098,28,7,27,6),(1099,28,7,27,7),(1100,28,7,27,8),(1101,28,7,27,9),(1102,28,7,27,10),(1103,28,7,28,1),(1104,28,7,28,2),(1105,28,7,28,3),(1106,28,7,28,4),(1107,28,7,28,5),(1108,28,7,28,6),(1109,28,7,28,7),(1110,28,7,28,8),(1111,28,7,28,9),(1112,28,7,28,10),(1113,28,8,29,1),(1114,28,8,29,2),(1115,28,8,29,3),(1116,28,8,29,4),(1117,28,8,29,5),(1118,28,8,29,6),(1119,28,8,29,7),(1120,28,8,29,8),(1121,28,8,29,9),(1122,28,8,29,10),(1123,28,8,30,1),(1124,28,8,30,2),(1125,28,8,30,3),(1126,28,8,30,4),(1127,28,8,30,5),(1128,28,8,30,6),(1129,28,8,30,7),(1130,28,8,30,8),(1131,28,8,30,9),(1132,28,8,30,10),(1133,28,8,31,1),(1134,28,8,31,2),(1135,28,8,31,3),(1136,28,8,31,4),(1137,28,8,31,5),(1138,28,8,31,6),(1139,28,8,31,7),(1140,28,8,31,8),(1141,28,8,31,9),(1142,28,8,31,10);
/*!40000 ALTER TABLE `product_compatibility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category_id` int NOT NULL,
  `badge` enum('HOT','NEW','SALE','') DEFAULT '',
  `image` varchar(255) DEFAULT NULL,
  `type` enum('OEM','Aftermarket') NOT NULL,
  `stock` int DEFAULT '0',
  `warranty` varchar(50) DEFAULT 'N/A',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'High-Performance Brake Pads (Ceramic)',1200.00,2,'HOT','/images/brake_pads.png','Aftermarket',43,'1 Year','2026-03-31 18:04:42','2026-04-02 14:19:39'),(2,'NGK Iridium Spark Plug',450.00,3,'NEW','/images/spark_plug.png','OEM',209,'6 Months','2026-03-31 18:04:42','2026-04-02 14:19:39'),(3,'Motul 7100 4T 20W-50 Synthetic Engine Oil',1100.00,1,'SALE','/images/engine_oil.png','Aftermarket',14,'N/A','2026-03-31 18:04:42','2026-04-02 14:19:39'),(4,'Front Disc Brake Master Cylinder Assembly',2450.00,2,'','/images/brake_pads.png','OEM',6,'1 Year','2026-03-31 18:04:42','2026-04-02 07:30:14'),(5,'Endurance Rear Shock Absorber Pair',3200.00,4,'HOT','/images/shock_absorber.png','OEM',31,'2 Years','2026-03-31 18:04:42','2026-04-02 07:30:14'),(6,'LED Headlight Bulb 40W (White)',850.00,8,'NEW','/images/headlight_bulb.png','Aftermarket',120,'1 Year','2026-03-31 18:04:42','2026-03-31 18:04:42'),(7,'Brake Fluid DOT 4 (250ml)',250.00,2,'','/images/engine_oil.png','Aftermarket',300,'N/A','2026-03-31 18:04:42','2026-03-31 18:04:42'),(8,'Premium Oil Filter',150.00,7,'','/images/oil_filter.png','OEM',500,'N/A','2026-03-31 18:04:42','2026-03-31 18:04:42'),(9,'Hero Splendor Air Filter',180.00,7,'','/images/air_filter.png','OEM',150,'6 Months','2026-04-06 19:53:27','2026-04-06 19:53:27'),(10,'Bajaj Pulsar Chain Sprocket Kit',650.00,10,'NEW','/images/chain_sprocket.png','OEM',80,'1 Year','2026-04-06 19:53:27','2026-04-06 19:53:27'),(11,'Honda Shine Clutch Plate Set',420.00,1,'','/images/clutch_plate.png','OEM',60,'6 Months','2026-04-06 19:53:27','2026-04-06 19:53:27'),(12,'Universal Bike Horn 12V',199.00,3,'HOT','/images/bike_horn.png','Aftermarket',200,'3 Months','2026-04-06 19:53:27','2026-04-06 19:53:27'),(13,'Royal Enfield Bullet Exhaust Pipe',2800.00,9,'','/images/exhaust_pipe.png','OEM',20,'1 Year','2026-04-06 19:53:27','2026-04-06 19:53:27'),(14,'Yamaha FZS Front Fork Assembly',3500.00,4,'HOT','/images/yamaha_fzs_fork.png','OEM',15,'2 Years','2026-04-06 20:17:39','2026-04-06 20:17:39'),(15,'TVS Apache Rear Disc Brake Rotor',1800.00,2,'','/images/tvs_apache_rotor.png','OEM',35,'1 Year','2026-04-06 20:17:39','2026-04-06 20:17:39'),(16,'Bajaj Dominar Battery 12V 9Ah',1350.00,3,'NEW','/images/bajaj_dominar_battery.png','OEM',45,'1 Year','2026-04-06 20:17:39','2026-04-06 20:17:39'),(17,'Honda Activa Body Panel Set',2200.00,5,'','/images/honda_activa_panels.png','OEM',25,'6 Months','2026-04-06 20:17:39','2026-04-06 20:17:39'),(18,'MRF Nylogrip Zapper Tyre 100/90-17',1950.00,6,'HOT','/images/mrf_zapper_tyre.png','OEM',40,'2 Years','2026-04-06 20:17:39','2026-04-06 20:17:39'),(19,'Suzuki Gixxer Fuel Tank Cap',380.00,5,'','/images/suzuki_gixxer_cap.png','OEM',55,'6 Months','2026-04-06 20:17:39','2026-04-06 20:17:39'),(20,'Universal LED Turn Signal Indicators',299.00,8,'NEW','/images/led_turn_signals.png','Aftermarket',180,'6 Months','2026-04-06 20:17:39','2026-04-06 20:17:39'),(21,'Royal Enfield Classic 350 Seat Cover',750.00,5,'','/images/classic_350_seat.png','Aftermarket',70,'3 Months','2026-04-06 20:17:40','2026-04-06 20:17:40'),(22,'Hero Honda CD100 Piston Kit',890.00,1,'','/images/hero_cd100_piston.png','OEM',30,'1 Year','2026-04-06 20:17:40','2026-04-06 20:17:40'),(23,'Yamaha R15 V3 Windshield Visor',1100.00,5,'NEW','/images/r15_visor.png','Aftermarket',50,'3 Months','2026-04-06 20:17:40','2026-04-06 20:17:40'),(24,'TVS Jupiter Scooter CVT Belt',480.00,10,'','/images/jupiter_cvt_belt.png','OEM',90,'6 Months','2026-04-06 20:17:41','2026-04-06 20:17:41'),(25,'Bosch Automotive Relay 12V 40A',220.00,3,'','/images/bosch_relay.png','Aftermarket',250,'1 Year','2026-04-06 20:17:41','2026-04-06 20:17:41'),(26,'Honda CBR 150R Full Fairing Kit',4500.00,5,'HOT','/images/honda_activa_panels.png','Aftermarket',12,'6 Months','2026-04-06 20:17:42','2026-04-06 20:17:42'),(27,'Bajaj Platina Headlight Assembly',950.00,8,'','/images/led_turn_signals.png','OEM',40,'1 Year','2026-04-06 20:17:42','2026-04-06 20:17:42'),(28,'Universal Engine Guard Crash Bar',1600.00,5,'NEW','/images/yamaha_fzs_fork.png','Aftermarket',30,'6 Months','2026-04-06 20:17:42','2026-04-06 20:17:42');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `rating` int NOT NULL,
  `comment` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_review` (`user_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_chk_1` CHECK (((`rating` >= 1) and (`rating` <= 5)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` enum('customer','admin') DEFAULT 'customer',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'najath','najathniju007@gmail.com','$2a$10$J8zoJijxK/xDQFO3hCJMfu7Q9eafJywVMjYo41c/IBBw5mhqldwQ.','8547533754','admin','2026-04-02 07:07:43');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `added_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_wishlist` (`user_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `years`
--

DROP TABLE IF EXISTS `years`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `years` (
  `id` int NOT NULL AUTO_INCREMENT,
  `year` year NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `year` (`year`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `years`
--

LOCK TABLES `years` WRITE;
/*!40000 ALTER TABLE `years` DISABLE KEYS */;
INSERT INTO `years` VALUES (1,2015),(2,2016),(3,2017),(4,2018),(5,2019),(6,2020),(7,2021),(8,2022),(9,2023),(10,2024);
/*!40000 ALTER TABLE `years` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-15 22:30:41

