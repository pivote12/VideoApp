var app = angular.module('app.main', []);

app.controller('MainCtrl',['$scope','$rootScope',function($scope,$rootScope){

  $scope.currentUser = null;
  $rootScope.isLogin = false;   
  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
    $rootScope.currentUser = user;
  };
  
}]);
