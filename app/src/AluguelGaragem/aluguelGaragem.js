'use strict';

angular.module('mutrack')
  .controller('AluguelGaragemCtrl', function($scope, ngNotify, RestSrv, SERVICE_PATH) {


    $scope.al = {};
    $scope.als = [];
    $scope.showAddEditGaragem = false;

    // Show the form used to edit or add packagees.
    $scope.show = function() {
      $scope.showAddEditGaragem = true;
    };





    // Hide the form used to edit or add packagees.
    $scope.hide = function() {
      $scope.showAddEditGaragem = false;
      $scope.al = {};
    };

    // Manage CRUD operations.
    var aluguelGaragemUrl = SERVICE_PATH.PRIVATE_PATH + '/alugarGaragem';

    $scope.editAluguelGaragem = function(al) {


      $scope.al = angular.copy(al);
          $scope.show();
    };

    $scope.deleteAluguelGaragem = function(al) {
      RestSrv.delete(aluguelGaragemUrl,al, function(status,data) {
        $scope.als.splice($scope.als.indexOf(al), 1);
        ngNotify.set('AluguelGaragem \'' + al.motorista + '\' deleted.', 'success');
      });
    };

    $scope.saveAluguelGaragem = function(al) {

      if (al.id) {
        RestSrv.edit(aluguelGaragemUrl, al, function(status,data) {
          for (var i = 0; i < $scope.als.length; i++) {
            if ($scope.als[i].id === al.id) {
              $scope.als[i] = al;
            }
          }

          $scope.hide();
          ngNotify.set('AluguerGaragem \'' + al.modelo + '\' updated.', 'success');
        });
      } else {
        RestSrv.add(aluguelGaragemUrl, al, function(status,data) {
          $scope.als.push(data.data);
          $scope.hide();
          ngNotify.set('AluguerGaragem \'' + al.modelo+ '\' added.', 'success');
        });
      }
    };

    // Request all data (packagees).
    RestSrv.find(aluguelGaragemUrl, function(status,data) {
      $scope.als = data;
      ngNotify.set('Loaded als with success.', 'success');
    });

  });
