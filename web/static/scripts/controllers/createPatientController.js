angular.module('myApp').controller('createPatientCtrl', 
	['$scope', '$http', '$window', function($scope, $http, $window){
		
            $scope.new_patient = {};
/*
			$scope.factors = [ 
        		{risk:'smoking'},
       			{risk:'drugs'},
				{risk:'Saneamiento ambiental inadecuado'},
                {risk:'Transporte público inexistente o desordenado'},
                {risk:'Analfabetismo y deficiencias en la educación'},
                {risk:'Inequidad en salud'},
                {risk:'Dificultad en el acceso de los servicios de salud'},
                {risk:'Ausencia de espacios públicos para realizar actividad física'},
                {risk:'Contaminación ambiental'},
                {risk:'Inseguridad vial'},
                {risk:'Vulnerabilidad geográfica y geológica'},
                {risk:'Consumo de alcohol, drogas, tabaco'},
                {risk:'Consumo de dieta no saludable'},
                {risk:'Inactividad física y sedentarismo'},
                {risk:'Falta de práctica de lactancia materna'},
                {risk:'Prácticas sexuales sin protección'},
       			{risk:'exposure to chemicals'}
                        	];  
*/                        	


		$scope.factors = [ 
       		'Bajos ingresos economicos',
       		'Malas condiciones de trabajo',
       		'Violencia e inseguridad ciudadana',
       		'Hacinamiento y vivienda precaria',
       		'Baja disponibilidad y acceso a alimentos sanos e inocuos',
       		'Saneamiento ambiental inadecuado',
       		'Transporte publico inexistente o desordenado',
       		'Analfabetismo y deficiencias en la educación',
       		'Inequidad en salud',
       		'Dificultad en el acceso de los servicios de salud',
       		'Ausencia de espacios publicos para realizar actividad fisica',
       		'Contaminacion ambiental',
       		'Inseguridad vial',
       		'Vulnerabilidad geografica y geologica',
       		'Consumo de alcohol, drogas, tabaco',
       		'Consumo de dieta no saludable',
       		'Inactividad fisica y sedentarismo',
       		'Falta de practica de lactancia materna',
       		'Practicas sexuales sin proteccion',
       		'Embarazo no deseado y precoz,',
       		'Irrespeto a las leyes de transito',
       		'Hábitos higienicos inadecuados',
       		'Inadecuado autocuido',
       		'Violencia de genero (familiar, sexual y otras)',
      		'Trabajo infantil'
        ];  

/*
		$scope.factors = [ 
        		{risk:'Bajos ingresos económicos'},
        		{risk:'Malas condiciones de trabajo'},
        		{risk:'Violencia e inseguridad ciudadana'},
        		{risk:'Hacinamiento y vivienda precaria'},
        		{risk:'Baja disponibilidad y acceso a alimentos sanos e inocuos'},
        		{risk:'Saneamiento ambiental inadecuado'},
        		{risk:'Transporte público inexistente o desordenado'},
        		{risk:'Analfabetismo y deficiencias en la educación'},
        		{risk:'Inequidad en salud'},
        		{risk:'Dificultad en el acceso de los servicios de salud'},
        		{risk:'Ausencia de espacios públicos para realizar actividad física'},
        		{risk:'Contaminación ambiental'},
        		{risk:'Inseguridad vial'},
        		{risk:'Vulnerabilidad geográfica y geológica'},
        		{risk:'Consumo de alcohol, drogas, tabaco'},
        		{risk:'Consumo de dieta no saludable'},
        		{risk:'Inactividad física y sedentarismo'},
        		{risk:'Falta de práctica de lactancia materna'},
        		{risk:'Prácticas sexuales sin protección'},
        		{risk:'Embarazo no deseado y precoz,'},
        		{risk:'Irrespeto a las leyes de tránsito'},
        		{risk:'Hábitos higiénicos inadecuados'},
        		{risk:'Inadecuado autocuido'},
        		{risk:'Violencia de género (familiar, sexual y otras)'},
        		{risk:'Trabajo infantil'}
                        ];  
*/
            $scope.create_patient = function() {


//	            $scope.new_patient.RiskFactor = "Environmental Risks";
	            $scope.new_patient.GroupID = parseInt($scope.new_patient.GroupID, 10);
	           	console.log($scope.new_patient);

                $http.post("/addNewPatient",{'name': $scope.new_patient.Name, 'DOB': $scope.new_patient.DOB, 'patientID': $scope.new_patient.DescriptivePatientID, 'familyID': $scope.new_patient.FamilyID, 'ecoName': $scope.new_patient.ECOName, 'zoneID': $scope.new_patient.ZoneID, 'gender': $scope.new_patient.Sex, 'groupID': $scope.new_patient.GroupID, 'riskFactor': $scope.new_patient.RiskFactor, 'chronicIllness': $scope.new_patient.ChronicIllness, 'notes': $scope.new_patient.Notes})
        			.success(function(data, status, headers, config){
            			console.log("Patient Created Successfully");
            			console.log('data',data);
            			console.log('status',status);
            			console.log('headers',headers);
            			console.log('config',config);
        			}).error(function () {
					console.log("failure");
					failureCallback(null);
					});


            };

	}]
);
