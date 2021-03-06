angular.module('myApp').controller('editPatientCtrl', 
	['$scope', '$http', '$window', '$filter', function($scope, $http, $window, $filter){
            var urlParam = "patientID=";
            var indexOfHtml = window.location.href.indexOf(urlParam);
            var viewDirectory = window.location.href.substr(0, indexOfHtml);
            var patientID = window.location.href.substr(indexOfHtml + urlParam.length);
            console.log(patientID);

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

            $scope.getNames = function() {
                $http.get("/getNames").success(function (data) {
                    $scope.names = data;
                }).error(function() {
                    alert("Error in request for getNames()" + error);
                });
            };

            $scope.openPatientInformation = function(patientID){
                window.location.href = "/patientInfo?patientID=" + patientID;
            };

            var getPatientInfo = function(){
                var successCallback = function(response){
                    $scope.patient = response;
                    console.log("outer successCallback");
                };
                var failureCallback = function(response){
                    alert("could not load patient data");
                }
                //TODO: create a patientService and add this http call to that
                $http.get("/getPatientInfo?patientID=" + patientID)
                    .success(function (response) {
                        $scope.patient = response;
                        $scope.patient.DOBFormatted = $filter('date')($scope.patient.DOB, 'dd-MM-yyyy');
                        successCallback(response);
                        console.log("inner successCallback");
                        console.log(response);
                    }).error(function () {
                        console.log("failure");
                        failureCallback(null);
                    });
            };

            $scope.edit_patient = function() {

                $http.post("/editPatient?patientID=" + patientID,{'name': $scope.patient.Name, 'DOB': $scope.patient.DOBFormatted, 'patientID': $scope.patient.DescriptivePatientID, 'familyID': $scope.patient.FamilyID, 'ecoName': $scope.patient.ECOName, 'zoneID': $scope.patient.ZoneID, 'gender': $scope.patient.Sex, 'groupID': $scope.patient.GroupID, 'riskFactor': $scope.patient.RiskFactor, 'chronicIllness': $scope.patient.ChronicIllness, 'notes': $scope.patient.Notes})
        			.success(function(data, status, headers, config){
            			console.log("Patient Edited Successfully");
            			console.log('data',data);
            			console.log('status',status);
            			console.log('headers',headers);
            			console.log('config',config);
        			}).error(function () {
					console.log("failure");
					failureCallback(null);
					});

                $scope.openPatientInformation($scope.patient.ID);
            };


            $scope.patient = null;
            $scope.getNames();

            $(document).ready(function(){
                var href = $window.href
                getPatientInfo();
                Array.from(document.getElementsByClassName("tabcontent")).forEach(function(t){
                    t.style.display = "none";});
//                $scope.tabClick("Details");
//                $( function() {
//                    $( "#datepicker" ).datepicker($.datepicker.regional['es']);
//                } );
            });

	}]
);
