
--
-- Table structure for table `checkout`
--

DROP TABLE IF EXISTS `checkout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checkout` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `Code` int NOT NULL,
  `Date` date NOT NULL,
  `qty` int DEFAULT NULL,
  `time` time DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `username` (`username`),
  KEY `Code` (`Code`),
  CONSTRAINT `checkout_ibfk_1` FOREIGN KEY (`Code`) REFERENCES `items` (`Code`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `checkout_ibfk_2` FOREIGN KEY (`username`) REFERENCES `customers` (`Username`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
