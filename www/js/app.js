// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','config.service'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  })
})
.factory('TodosService', function() {
  var todos = [
      {title: "Take out the trash", done: true},
      {title: "Do laundry", done: false},
      {title: "Start cooking dinner", done: false}
   ]

  return {
    todos: todos,
    getTodo: function(index) {
      return todos[index]
    }
  }
})
.controller('TodosCtrl', function($scope,TodosService,ConfigService) {
  console.log("todos");
  $scope.todos = TodosService.todos

  $scope.click = function() {
    console.log(JSON.stringify(ConfigService.getConfig()));
  }
})
.controller('TodoCtrl', function($scope, tdo, message) {
  $scope.todo = tdo
  console.log(message)
})
.controller("ConfigCtrl",function($scope,$ionicModal,ConfigService){
  console.log("ConfigCtrl "+ JSON.stringify(ConfigService.getConfig()))
  $scope.newConfig=ConfigService.getConfig()

  $scope.save= function() {
    console.log("Before Set "+JSON.stringify($scope.newConfig))
    ConfigService.setConfig($scope.newConfig)
    $scope.modal.hide();
  }

  $ionicModal.fromTemplateUrl('templates/modal-config.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/todos')
  console.log("config")
  $stateProvider.state('todos', {
    abstract: true,
    url: '/todos',
    views: {
      todos: {
        template: '<ion-nav-view></ion-nav-view>'
      }
    }
  })

  $stateProvider.state('todos.index', {
    url: '',
    templateUrl: 'todos.html',
    controller: 'TodosCtrl'
  })

  $stateProvider.state('todos.detail', {
    url: '/:todo',
    templateUrl: 'todo.html',
    controller: 'TodoCtrl',
    resolve: {
      tdo: function($stateParams, TodosService) {
        return TodosService.getTodo($stateParams.todo)
      },
      message: function() {
        return "Hello World"
      }
    }
  })

  $stateProvider.state('help', {
    url: '/help',
    views: {
      help: {
        templateUrl: 'help.html'
      }
    }
  })
});
