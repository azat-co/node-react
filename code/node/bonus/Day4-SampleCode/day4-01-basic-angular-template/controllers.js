var helloWorld = angular.module('helloWorld', []);

helloWorld.controller('HelloController', function ($scope) {
  $scope.greeting = { text: "Hello" };
});