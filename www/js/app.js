// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

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
.controller('TodosCtrl', function($scope,TodosService) {
  $scope.todos = TodosService.todos
})
.controller('TodoCtrl', function($scope, tdo, message) {
  $scope.todo = tdo
  console.log(message)
})
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/todos')

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
