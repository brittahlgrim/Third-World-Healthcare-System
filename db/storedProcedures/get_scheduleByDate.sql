USE [twhs_test_db];

IF EXISTS(SELECT 1 FROM mysql.proc p WHERE db = 'twhs_test_db' AND name = 'get_scheduleByDate') THEN
	DROP PROCEDURE get_scheduleByDate;

CREATE PROCEDURE get_scheduleByDate
(IN requestedDate CHAR(8))
BEGIN
	SELECT
		PatientID = p.ID,
		PatientName = p.Name,
		Patient
	FROM dbo.PATIENTS p
	INNER JOIN dbo.APPOINTMENTS a
		on p.ID = a.patientID


	SELECT p.PatientID, p.PatientName, z.Zone
	FROM dbo.Schedule s
	INNER JOIN dbo.Patients p
		on p.ID = s.PatientID
	INNER JOIN dbo.zones z
		on p.zone = z.ID
	WHERE s.date = requestedDate;
END;