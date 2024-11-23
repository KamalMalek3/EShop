DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Code` int NOT NULL,
  `Description` varchar(200) NOT NULL,
  `Qty` int DEFAULT NULL,
  `Price` int NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Code` (`Code`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,3301,'Black Ensemble',2,50),(2,3302,'Black sweater with zip neck',8,45),(3,3303,'Dark Blue Top',5,30),(4,3304,'Beige Turtle-neck sweater',5,30),(5,3305,'Black Hoodie',16,25),(6,3306,'Grey Next Jacket',8,35),(7,3307,'Black Ensemble',15,50),(8,3308,'Beige and Black oversized sweater',12,45),(9,3309,'Black Sweatpants',14,30),(10,3310,'Grey Paris Top',15,25),(11,3311,'Dark grey Dress',5,35),(12,3312,'Black and white turtle neck top',6,35),(13,3313,'Black leather pants',8,35),(14,3314,'Black formal dress',9,45),(15,3315,'Black Jacket With pockets',10,40),(16,3316,'Black sweatpants',12,50),(17,3317,'Denim ripped jeans',12,30),(18,3318,'Black Leather Jacket',15,45),(19,3319,'Lightblue ripped jeans with silver Dots',10,35),(23,33201,'colored dress blue',11,55),(24,3320,'Black Skirt with Black top Ensemble',9,20),(28,3345,'pull noire',6,45);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;
