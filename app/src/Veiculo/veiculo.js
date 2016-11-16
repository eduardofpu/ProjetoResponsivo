'use strict';

angular.module('mutrack')
  .controller('veiculoCtrl', function($scope, ngNotify, RestSrv, SERVICE_PATH) {

    //   Tras os campos dos apartamentos cadastrados


          $scope.ap_v = {};
          $scope.aps = [];

          //  var apUrl =  SERVICE_PATH.PRIVATE_PATH + '/apartamento';
          var apUrl =  SERVICE_PATH.PRIVATE_PATH + '/apartamento/ordenarapartamentos';

          RestSrv.find(apUrl,function(status,data) {
            $scope.aps = data;
            ngNotify.set('Loaded aps with success.', 'success');
          });



    $scope.v = {};
    $scope.vs = [];

    $scope.permissao = {};
    $scope.showAddEditUser = false;


    ngNotify.config({
      theme: 'pastel'
    });



    // Show the form used to edit or add users.
    $scope.show = function() {
      $scope.showAddEditUser = true;
    };

    // Hide the form used to edit or add users.
    $scope.hide = function() {
      $scope.showAddEditUser = false;
      $scope.v = {};
    };

    // Manage CRUD operations.
    var vUrl =  SERVICE_PATH.PRIVATE_PATH + '/veiculo';




    $scope.editVeiculo = function(v) {
      $scope.v = angular.copy(v);
      $scope.show();
    };

    $scope.deleteVeiculo = function(v) {
      RestSrv.delete(vUrl, v, function(status,data) {
        $scope.vs.splice($scope.vs.indexOf(v), 1);
        ngNotify.set('Morador \'' + v.modelo + '\' deleted.', 'success');
      });
    };


    $scope.saveVeiculo = function(v) {
      if (v.id ) {
        RestSrv.edit(vUrl,v, function(status,data) {

            if(status ==='ok'){
          for (var i = 0; i < $scope.vs.length; i++) {
            if ($scope.vs[i].id === v.id) { //=== verifica id e o objeto
              $scope.vs[i] = v;
            }
          }
          $scope.hide();// para esconder o forme
          ngNotify.set('Veiculo \'' + v.modelo+ '\' updated.', 'success');

        } else {

            $scope.statusError = 'unsuccess';
            $scope.messages = data.fieldsErrorMessages;
            $scope.fields = data.mapOfFields;

          }

      });


      } else {
        RestSrv.add(vUrl, v, function(status,data) {
            if(status ==='ok'){

          $scope.vs.push(data.data);
          $scope.statusError = 'success';
          $scope.message = data.atributeMessage.MENSAGEM;

          $scope.hide();
          ngNotify.set('Morador \'' + v.modelo+ '\' added.', 'success');

        }else{
               $scope.statusError = 'unsuccess';
               $scope.messages = data.fieldsErrorMessages;
              $scope.fields = data.mapOfFields;
               console.log(data);
            }

            
        });
      }
    };
    RestSrv.find(vUrl,function(status,data) {
      $scope.vs = data;
      ngNotify.set('Loaded vs with success.', 'success');
    });


    // Request all data (permission and user).



   var permissionUrl =  SERVICE_PATH.PRIVATE_PATH + '/permission';

     RestSrv.find(permissionUrl, function(data) {


         $scope.permissions = data;


  }); // Fim










  });
