var app = angular.module("myApp", []);

app.controller("myController", ['$scope', '$http', function($scope, $http){
    $scope.hello = 'hello world';

    $scope.login = function(username, password){
        console.log('in the login function!');
        var data = {
            username: username,
            password: password
        };

        $http.post('/', data).then(function(response){
            console.log(response);

            $scope.showHtml = true;
            $scope.loggedin = response.data;
        });
    }

}]);