angular.module('myApp', [])
            .controller('HomeCtrl', function($scope, $http) {
      
        $scope.info = {};
        // $scope.asdfg="Kumar";
        
        $scope.showAdd = true;
        $scope.graph_data_test=null;
        $scope.machine_id_selected = null;

        $scope.submit=function(id, machine_status){

          $scope.machine_id_selected = $scope[machine_status][id]["machine_id"];

          console.log("machine_id_selected ", $scope.machine_id_selected);
          $http({
            method: 'POST',
            url: '/graph_date_sound',
            data: {'0': $scope.machine_id_selected }, headers: { 'Content-Type': 'application/json' },
          }).then(function(response) {
            // Get the modal view for showing graph
            var modal = document.getElementById('myModal');
            var span = document.getElementsByClassName("close")[0];
            modal.style.display = "block";
            span.onclick = function() {
                modal.style.display = "none";
            }

            $scope.machines_gragh = response["data"];
            console.log('machines_gragh', $scope.machines_gragh);

            var data_for_chart =  [];
            console.log("d3 json", $scope.machines_gragh);
            if($scope.machines_gragh.length > 0){
               data_for_chart = linechart_sound($scope.machines_gragh);
            }
            simpleLineChart(data_for_chart, "time series", "avg sound");

          }, function(error) {
            console.log(error);
          });
        }

        

        $scope.btnSound = function(){
          console.log("machine_id_selected ", $scope.machine_id_selected);
          $http({
            method: 'POST',
            url: '/graph_date_sound',
            data: {'0': $scope.machine_id_selected }, headers: { 'Content-Type': 'application/json' },
          }).then(function(response) {

            // Get the modal view for showing graph
            var modal = document.getElementById('myModal');
            var span = document.getElementsByClassName("close")[0];
            modal.style.display = "block";
            span.onclick = function() {
                modal.style.display = "none";
            }

            $scope.machines_gragh = response["data"];
            console.log('machines_gragh', $scope.machines_gragh);

            var data_for_chart =  [];
            console.log("d3 json", $scope.machines_gragh);
            if($scope.machines_gragh.length > 0){
               data_for_chart = linechart_sound($scope.machines_gragh);
            }
            simpleLineChart(data_for_chart, "time series", "avg sound");

          }, function(error) {
            console.log(error);
          });
        }

        $scope.btnTemp = function(){
          console.log("machine_id_selected ", $scope.machine_id_selected);
          $http({
            method: 'POST',
            url: '/graph_date_temp',
            data: {'0': $scope.machine_id_selected }, headers: { 'Content-Type': 'application/json' },
          }).then(function(response) {

            $scope.machines_gragh = response["data"];
            console.log('machines_gragh', $scope.machines_gragh);

            var modal = document.getElementById('myModal');
            var span = document.getElementsByClassName("close")[0];
            modal.style.display = "block";
            span.onclick = function() {
                modal.style.display = "none";
            }

            var data_for_chart =  [];
            console.log("d3 json", $scope.machines_gragh);
            if($scope.machines_gragh.length > 0){
               data_for_chart = linechart_temp($scope.machines_gragh);
            }
            simpleLineChart(data_for_chart, "time series", "avg temp");

          }, function(error) {
            console.log(error);
          });
        }

        $scope.btnDistance = function(){
          console.log("machine_id_selected ", $scope.machine_id_selected);
          $http({
            method: 'POST',
            url: '/graph_date_dist',
            data: {'0': $scope.machine_id_selected }, headers: { 'Content-Type': 'application/json' },
          }).then(function(response) {

            // Get the modal view for showing graph
            var modal = document.getElementById('myModal');
            var span = document.getElementsByClassName("close")[0];
            modal.style.display = "block";
            span.onclick = function() {
                modal.style.display = "none";
            }

            $scope.machines_gragh = response["data"];
            console.log('machines_gragh', $scope.machines_gragh);

            var data_for_chart =  [];
            console.log("d3 json", $scope.machines_gragh);
            if($scope.machines_gragh.length > 0){
               data_for_chart = linechart_dist($scope.machines_gragh);
            }
            simpleLineChart(data_for_chart, "time series", "avg distance");

          }, function(error) {
            console.log(error);
          });
        }
  

          //total_machines api data 
        $http({  method: 'POST', url: '/total_machines', data: {'0':'{{ data }}'}, headers: { 'Content-Type': 'application/json' },
          }).then(function(response) {

            $scope.total_machiness=response["data"];
            
          }, function(error) {
            console.log(error);
          })

            //anomalous_mc api data 
          $http({  method: 'POST', url: '/anomalous_mc', data: {'0':'{{ data }}'}, headers: { 'Content-Type': 'application/json' },
          }).then(function(response) {

            $scope.anomalous_mc=response["data"];
            
          }, function(error) {
            console.log(error);
          })
          //faulty api data
          $http({  method: 'POST', url: '/faulty_mc', data: {'0':'{{ data }}'}, headers: { 'Content-Type': 'application/json' },
          }).then(function(response) {

            $scope.faulty_mc=response["data"];
            
          }, function(error) {
            console.log(error);
          })

  })