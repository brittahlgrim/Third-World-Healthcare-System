angular.module('myApp').controller('createPatientCtrl', 
	['$scope', '$http', '$window', function($scope, $http, $window){
		
            $scope.new_patient = {};


		$scope.factorsCom = [ 
        		{risk_community:'Bajos ingresos económicos'},
        		{risk_community:'Malas condiciones de trabajo'},
        		{risk_community:'Violencia e inseguridad ciudadana'},
        		{risk_community:'Hacinamiento y vivienda precaria'},
        		{risk_community:'Baja disponibilidad y acceso a alimentos sanos e inocuos'},
        		{risk_community:'Saneamiento ambiental inadecuado'},
        		{risk_community:'Transporte público inexistente o desordenado'},
        		{risk_community:'Analfabetismo y deficiencias en la educación'},
        		{risk_community:'Inequidad en salud'},
        		{risk_community:'Dificultad en el acceso de los servicios de salud'},
        		{risk_community:'Ausencia de espacios públicos para realizar actividad física'},
        		{risk_community:'Contaminación ambiental'},
        		{risk_community:'Inseguridad vial'},
        		{risk_community:'Vulnerabilidad geográfica y geológica'}
                        ];  

		$scope.factorsIndv = [ 
        		{risk_individual:'Consumo de alcohol, drogas, tabaco'},
        		{risk_individual:'Consumo de dieta no saludable'},
        		{risk_individual:'Inactividad física y sedentarismo'},
        		{risk_individual:'Falta de práctica de lactancia materna'},
        		{risk_individual:'Prácticas sexuales sin protección'},
        		{risk_individual:'Embarazo no deseado y precoz,'},
        		{risk_individual:'Irrespeto a las leyes de tránsito'},
        		{risk_individual:'Hábitos higiénicos inadecuados'},
        		{risk_individual:'Inadecuado autocuido'},
        		{risk_individual:'Violencia de género (familiar, sexual y otras)'},
        		{risk_individual:'Trabajo infantil'}
                        ];  
            $scope.create_patient = function() {


	            $scope.new_patient.RiskFactor = "Environmental Risks";
	            $scope.new_patient.GroupID = parseInt($scope.new_patient.GroupID, 10);
	           	console.log($scope.new_patient);

                $http.post("/addNewPatient",{'name': $scope.new_patient.Name, 'DOB': $scope.new_patient.DOB, 'patientID': $scope.new_patient.DescriptivePatientID, 'familyID': $scope.new_patient.FamilyID, 'ecoName': $scope.new_patient.ECOName, 'zoneID': $scope.new_patient.ZoneID, 'gender': $scope.new_patient.Sex, 'groupID': $scope.new_patient.GroupID, 'riskFactor': $scope.new_patient.RiskFactor, 'chronicIllness': $scope.new_patient.ChronicIllness, 'notes': $scope.new_patient.notes})
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
