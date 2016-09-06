var app = angular.module('app.login', ['ui.router','angular-md5','ngFlash']);

app.controller('LoginCtrl',['$scope', '$http','md5','$state','AuthService','Session','$rootScope','$stateParams','Flash',
 function($scope, $http,md5,$state,AuthService,Session,$rootScope,$stateParams,Flash){       
    var params = $stateParams;
    if ((params.message != null) || params.type != null) {
      if (params.type ==1) {
        Flash.create('success', params.message);
      }else if (params.type == 2) {
        Flash.create('danger', params.message);
      }
    }
    
  $scope.signIn = function(){

    var username = $scope.username;
    var password = md5.createHash($scope.password || '');
    var url = 'http://localhost:3000/user/auth';
    var credentials = {
      username:username,
      password:password
    }

    AuthService.login(credentials).then(function (result) {
     if (result.data.status == "error") {
       $state.go('login',{message:"Your Email or Password are not correct",type:2});
     }else{
        $scope.setCurrentUser(result.data); 
        $rootScope.isLogin = true;
        $state.go('main');
     }

   });

  }


}]);
