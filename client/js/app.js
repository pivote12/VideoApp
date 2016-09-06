var app = angular.module('app',
 [
    'ui.router',
    'app.login',
    'app.main',
    'app.video',
    'app.logout',
    'app.singleVideo',
    'ngFlash'
  ]);

app
  .factory('VideosService',function($http){
    var videosService = {};

    videosService.getAll = function(data){
      var config = {
          method: 'GET',
          url: 'http://localhost:3000/videos',
          params: data,   
          headers: {              
              'Content-Type': 'application/json'
          }
      }
      
      return $http(config)
        .then(function(res){          
          return res.data;
        },function(res){      
          return res;
        });
    };
    videosService.getSingle = function(data){
      var config = {
          method: 'GET',
          url: 'http://localhost:3000/video',
          params: data,   
          headers: {              
              'Content-Type': 'application/json'
          }
      }
      return $http(config)
        .then(function(res){          
          return res.data;
        },function(res){      
          return res;
        });
    }
    videosService.rate = function(data,session){
      var config = { 
          params: session

      }
      return $http.post('http://localhost:3000/video/ratings',data,config)
        .then(function(res){          
          return res.data;
        },function(res){      
          return res;
        });
    }
    return videosService;
  })
  .factory('AuthService', function ($http, Session) {
  var authService = {};

  authService.login = function (credentials) {
    return $http
      .post('http://localhost:3000/user/auth', credentials)
      .then(function (res) {
        Session.create(res.data.sessionId,
                       res.data.username);
        return res;
      });
  };
  authService.isAuthenticated = function () {
    return !!Session.sessionId;
  };
    authService.logout = function (sessionId) {
     var config = {
          method: 'GET',
          url: 'http://localhost:3000/user/logout',
          params: sessionId,   
          headers: {              
              'Content-Type': 'application/json'
          }
      }
 
    return $http(config)
      .then(function (res) {
        return res;
      });
  };
  return authService;
  })
  .service('Session', function () {
    this.create = function (sessionId, username) {
      this.sessionId = sessionId;
      this.username = username;
    };
    this.destroy = function () {
      this.id = null;
      this.username = null;
    };
  })

  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/login");
      // Now set up the states
      $stateProvider
        .state('main', {
          url: "/",
          templateUrl: "../views/main.html",
          data: {
           requireLogin: true
         }
        }).
        state('login',{
          url:'/login',
          templateUrl:'../views/login.html',
          params:{
            message:null,
            type:null
          },
          data: {
             requireLogin: false
          }
        })
        .state('singleVideo', {
          url: "/singleVideo",
           params:{
            sessionId:null,
            videoId:null
          },
          templateUrl: "../views/single-video.html",
          data: {
           requireLogin: true
         }
        }) ;      
  });
