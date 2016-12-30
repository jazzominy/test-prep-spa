(function(){
    var app = angular.module("test-prep");

    app.controller("MainController",["$rootScope","$scope","$http",function($rootScope,$scope,$http){
        var self = this;

        self.questions = [];

        $http.get("/api/questions").then(function(res){
            self.questions = res.data;
        },function(err){
            console.log("An error occurred when get questions");
        })

        self.onItemClick = function(item){
            self.selectedQuestion = item;
        }
    }]);
})();
