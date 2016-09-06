var app = angular.module('app.video', ['ngSanitize','com.2fdevs.videogular','lazy-scroll','jkAngularRatingStars']);

app.controller('VideoCtrl',['$scope','VideosService','$sce','$state',function($scope,VideosService,$sce,$state){
  if ($scope.currentUser != null) {
    $scope.videos = null;
    $scope.skip = 0;
    $scope.newArr = [];
    $scope.loading = false;
    $scope.rating = function(ratings){
      var i=0,ele=null;
      ratings.forEach(function(element) {    
        ele+=element;
        i++;
      }, this);
      return Math.round(ele/i);
    }
    $scope.readOnly = true;
    var controller = this;
    controller.API = null;
    
    $scope.onPlayerReady = function(API) {
      controller.API = API;
    };
    var query = {
      sessionId : $scope.currentUser.sessionId,
      limit:8,
      skip:$scope.skip
    }      

    VideosService
      .getAll(query)
      .then(function(allVideos){
          var size = 4;
          for (var i=0; i<allVideos.data.length; i+=size) {
            $scope.newArr.push(allVideos.data.slice(i, i+size));
          } 
          $scope.videoSilce = $scope.newArr;    
          $scope.skip += 8; 
      });
      $scope.paginationFuntion = function(){
 
        $scope.loading = true;
        if($scope.skip<=96){
          var data = {
            sessionId : $scope.currentUser.sessionId,
            limit:8,
            skip:$scope.skip
          }
          console.log($scope.skip);
          VideosService
            .getAll(data)
            .then(function(allVideos){        

                var size = 4;
                for (var i=0; i<allVideos.data.length; i+=size) {
                  $scope.newArr.push(allVideos.data.slice(i, i+size));
                }                 
                $scope.skip += 8;
                $scope.loading = false; 
            });
        }else if($scope.skip>96 && $scope.skip<= 100){
          var data = {
            sessionId : $scope.currentUser.sessionId,
            limit:4,
            skip:96
          }
          console.log($scope.skip);
          VideosService
            .getAll(data)
            .then(function(allVideos){        

                var size = 4;
                for (var i=0; i<allVideos.data.length; i+=size) {
                  $scope.newArr.push(allVideos.data.slice(i, i+size));
                }                 
                $scope.skip += 4;
                $scope.loading = false; 
            });
        }

        
      } 

  }else{
    $state.go('login');
  };
}]);
