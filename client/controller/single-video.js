var app = angular.module('app.singleVideo',
 [
     'ngSanitize','com.2fdevs.videogular','ngMaterial', 'jkAngularRatingStars','ngFlash']);

app.controller('SingleVideoCtrl',['$scope','$rootScope','$stateParams','VideosService','Flash','$state',
    function($scope,$rootScope,$stateParams,VideosService,Flash,$state){   
    if ($rootScope.currentUser == null) {
        $state.go('login');
    }else{
        $scope.rate = function(){
            var sessionId = $stateParams.sessionId;
            var videoId = $stateParams.videoId;
            var rate = $scope.sRate;
            if (rate==undefined) {
                return Flash.create('danger', 'please select a number to rate the video');
            } 
            var query = {                 
                videoId:videoId,
                rating:rate
            };
            var session = {
                sessionId:sessionId
            }
        
            VideosService
                    .rate(query,session)
                    .then(function(video){
                    Flash.create('success', 'Rate Added satisfactory');
                        
                });
        };
        var query = {
        sessionId : $stateParams.sessionId,
        videoId:$stateParams.videoId
        }
        var limit ={
        sessionId : $stateParams.sessionId,
        limit:4
        }    
        VideosService
        .getSingle(query)
        .then(function(video){               
            $scope.video = video.data;          
        });
        VideosService
        .getAll(limit)
        .then(function(allVideos){     
            $scope.allVideos = allVideos.data;
            $scope.readOnly = true;
            $scope.rating = function(ratings){
                    var i=0,ele=null;
                    ratings.forEach(function(element) {    
                    ele+=element;
                    i++;
                    }, this);
                    return Math.round(ele/i);
                }
                /* */
            
        });
        }
  
  
    }
]);