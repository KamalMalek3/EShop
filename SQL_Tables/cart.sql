
DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(20) NOT NULL,
  `Code` int NOT NULL,
  `qty` int DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Username` (`Username`),
  KEY `Code` (`Code`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`Code`) REFERENCES `items` (`Code`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`Username`) REFERENCES `customers` (`Username`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump completed on 2023-12-14  9:05:31
