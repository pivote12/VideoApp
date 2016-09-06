var app = angular.module('app.logout', []);

app.controller('LogOutCtrl',['$scope','$rootScope','AuthService','$state',function($scope,$rootScope,AuthService,$state){

$scope.logout = function(){
    var query ={
        sessionId : $rootScope.currentUser.sessionId
    }

    AuthService
        .logout(query)
        .then(function(result){
            if (result.status == 200) {
                $rootScope.isLogin = false;
                $state.go('login',{message:'logout susscefully',type:1});
            }
        })
}
}]);