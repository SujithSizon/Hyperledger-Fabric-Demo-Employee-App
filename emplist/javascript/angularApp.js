<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.14/angular.min.js"></script>
  <meta charset="utf-8">
  <title>JS Bin</title>
</head>
<body ng-app="myApp">
  <div ng-controller="CtrlOne">Hello, {{name}}</div>
  <script>
    var myApp = angular.module("myApp", []);
    myApp.controller("CtrlOne", function ($scope) {
      $scope.name = "Andre";
    });
  </script>
</body>
</html>