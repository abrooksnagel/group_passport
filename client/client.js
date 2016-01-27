var app = angular.module("myApp", []);

app.controller("myController", ['$scope', '$http', function($scope, $http){



        $http.get('/getUser').then(function(response) {
            console.log(response);
            $scope.user = response.data;
        })
}]);