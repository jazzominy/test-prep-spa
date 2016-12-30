/*(function(){
    var app = angular.module("test-prep");
    app.controller("NavController",["$scope","$http","$state","AuthService",function($scope,$http,$state,AuthService){

        $scope.user = AuthService.getUser();
        $scope.logout = function(){
            $http.post("/api/logout").then(function(res){
                if(res.data.success === true)
                {
                    $state.go("login");
                    AuthService.reset();
                }
            },function(res){
                if(res.data.success === false)
                {
                    console.log(res.data.msg);
                }
            })
        }
    }]);
})();*/

(function(){
    var app = angular.module("test-prep");

    app.controller("NavController",["$scope","$http","$state","AuthService",function($scope,$http,$state,AuthService){

        $scope.user = AuthService.getUser();
        $scope.logout = function(){
            $http.post("/api/logout").then(function(res){
                if(res.data.success === true)
                {
                    $state.go("login");
                    AuthService.reset();
                }
            },function(res){
                if(res.data.success === false)
                {
                    console.log(res.data.msg);
                }
            })
        }
    }])

    app.directive("navBar",function(){
        return {
            restrict: "E",
            templateUrl: "components/navbar/navbar.html",
            controller: "NavController"
        };
    });
})();
