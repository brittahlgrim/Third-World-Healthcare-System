-- MySQL dump 10.13  Distrib 5.7.16, for osx10.11 (x86_64)
--
-- Host: localhost    Database: twhs_test_db
-- ------------------------------------------------------
-- Server version	5.7.17

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
-- Current Database: `twhs_test_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `twhs_test_db` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `twhs_test_db`;

--
-- Table structure for table `APPOINTMENTS`
--

DROP TABLE IF EXISTS `APPOINTMENTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `APPOINTMENTS` (
  `PatientID` int(11) DEFAULT NULL,
  `AppointmentID` int(11) DEFAULT NULL,
  `AppointmentDate` datetime DEFAULT NULL,
  `AppointmentType` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `APPOINTMENTS`
--

LOCK TABLES `APPOINTMENTS` WRITE;
/*!40000 ALTER TABLE `APPOINTMENTS` DISABLE KEYS */;
INSERT INTO `APPOINTMENTS` VALUES (1,231,'2012-08-10 10:10:09','Regular checkup'),(3,233,'2012-09-30 08:11:09','Home visit'),(2,232,'2012-09-27 20:10:09','Sick checkup');
/*!40000 ALTER TABLE `APPOINTMENTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ECOSF`
--

DROP TABLE IF EXISTS `ECOSF`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ECOSF` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` blob NOT NULL,
  `Zones` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ECOSF`
--

LOCK TABLES `ECOSF` WRITE;
/*!40000 ALTER TABLE `ECOSF` DISABLE KEYS */;
/*!40000 ALTER TABLE `ECOSF` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FAMILY`
--

DROP TABLE IF EXISTS `FAMILY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FAMILY` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` blob NOT NULL,
  `HeadPersonID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FAMILY`
--

LOCK TABLES `FAMILY` WRITE;
/*!40000 ALTER TABLE `FAMILY` DISABLE KEYS */;
/*!40000 ALTER TABLE `FAMILY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GRUPO`
--

DROP TABLE IF EXISTS `GRUPO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GRUPO` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Description` blob,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GRUPO`
--

LOCK TABLES `GRUPO` WRITE;
/*!40000 ALTER TABLE `GRUPO` DISABLE KEYS */;
/*!40000 ALTER TABLE `GRUPO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `NEXT_APT_CODE`
--

DROP TABLE IF EXISTS `NEXT_APT_CODE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `NEXT_APT_CODE` (
  `GroupID` int(11) NOT NULL AUTO_INCREMENT,
  `NextAptDate` datetime DEFAULT NULL,
  PRIMARY KEY (`GroupID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NEXT_APT_CODE`
--

LOCK TABLES `NEXT_APT_CODE` WRITE;
/*!40000 ALTER TABLE `NEXT_APT_CODE` DISABLE KEYS */;
/*!40000 ALTER TABLE `NEXT_APT_CODE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PATIENTS`
--

DROP TABLE IF EXISTS `PATIENTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PATIENTS` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(150) NOT NULL,
  `DOB` date NOT NULL,
  `DescriptivePatientID` varchar(150) DEFAULT NULL,
  `FamilyID` int(11) DEFAULT NULL,
  `ECOName` varchar(150) DEFAULT NULL,
  `ZoneID` int(11) DEFAULT NULL,
  `Sex` char(1) DEFAULT NULL,
  `GroupID` int(11) DEFAULT NULL,
  `RiskFactor` varchar(150) DEFAULT NULL,
  `ChronicIllness` varchar(150) DEFAULT NULL,
  `Notes` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PATIENTS`
--

LOCK TABLES `PATIENTS` WRITE;
/*!40000 ALTER TABLE `PATIENTS` DISABLE KEYS */;
INSERT INTO `PATIENTS` VALUES (1,'Julio Perez','1940-01-03','06-14-U-[]-E-003-003-01',3,'2',2,'M',2,'Smoking','Athsma','Notes'),(2,'Lupita Brizuela','1983-03-06','06-14-U-[]-E-005-005-02',5,'1',1,'3',0,'Biological','Artheritis','Notes'),(3,'Alvaro Diaz','2007-08-01','06-14-U-[]-E-002-002-01',2,'4',6,'4',0,'None','Intelligence','Notes');
/*!40000 ALTER TABLE `PATIENTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SEX`
--

DROP TABLE IF EXISTS `SEX`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SEX` (
  `ID` char(1) NOT NULL,
  `Name` varchar(10) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SEX`
--

LOCK TABLES `SEX` WRITE;
/*!40000 ALTER TABLE `SEX` DISABLE KEYS */;
/*!40000 ALTER TABLE `SEX` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VISIT_HISTORY`
--

DROP TABLE IF EXISTS `VISIT_HISTORY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `VISIT_HISTORY` (
  `PatientID` int(11) DEFAULT NULL,
  `Age` int(11) DEFAULT NULL,
  `Incident` blob,
  `Prevalence` blob,
  `Deceased` tinyint(1) DEFAULT NULL,
  `DateOfVisit` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VISIT_HISTORY`
--

LOCK TABLES `VISIT_HISTORY` WRITE;
/*!40000 ALTER TABLE `VISIT_HISTORY` DISABLE KEYS */;
/*!40000 ALTER TABLE `VISIT_HISTORY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ZONE`
--

DROP TABLE IF EXISTS `ZONE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ZONE` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` blob NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ZONE`
--

LOCK TABLES `ZONE` WRITE;
/*!40000 ALTER TABLE `ZONE` DISABLE KEYS */;
/*!40000 ALTER TABLE `ZONE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authentication`
--

DROP TABLE IF EXISTS `authentication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authentication` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ck_username_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authentication`
--

LOCK TABLES `authentication` WRITE;
/*!40000 ALTER TABLE `authentication` DISABLE KEYS */;
INSERT INTO `authentication` VALUES (1,'admin','$2a$10$wviqP2np9wE6TPDsiToK6.Q9iujhIyehCf4Jhk99z/U6WoJ03C48O');
/*!40000 ALTER TABLE `authentication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `firstTable`
--

DROP TABLE IF EXISTS `firstTable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `firstTable` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `gender` char(1) DEFAULT NULL,
  `owner` varchar(150) NOT NULL,
  `birth` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `firstTable`
--

LOCK TABLES `firstTable` WRITE;
/*!40000 ALTER TABLE `firstTable` DISABLE KEYS */;
INSERT INTO `firstTable` VALUES (1,'Sandy',NULL,'Lennon','2015-01-03'),(3,'Charlie',NULL,'River','2016-05-21');
/*!40000 ALTER TABLE `firstTable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rf_table`
--

DROP TABLE IF EXISTS `rf_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rf_table` (
  `riskFactor` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rf_table`
--

LOCK TABLES `rf_table` WRITE;
/*!40000 ALTER TABLE `rf_table` DISABLE KEYS */;
INSERT INTO `rf_table` VALUES ('bad environment'),('smoking');
/*!40000 ALTER TABLE `rf_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-25 20:24:13
