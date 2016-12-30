(function(){
    var app = angular.module("test-prep");
    app.controller("AuthController",["$scope","$http","$state","AuthService",function($scope,$http,$state,AuthService){
        $scope.message = "";
        $scope.isRegisterView = false;
        $scope.registerMessage = "";

        $scope.auth = {
                        loginUser: {email:"",pwd:""},
                        regUser: {email:"",pwd:""}
                    };

        $scope.toggleRegisterView = function(){
            if($scope.isRegisterView)
            {
                $scope.auth.regUser = {email:"",pwd:""};$scope.pwdConfirm = "";
                $scope.registerForm.$setPristine();
            }
            else
                $scope.auth.loginUser = {email:"",pwd:""};

            $scope.emailErrMessage = "";
            $scope.message = "";
            $scope.registerMessage = "";

            $scope.isRegisterView = !$scope.isRegisterView;
        };

        $scope.signin = function(){
            var self = this;
            $scope.message = "";

            if($scope.login.$invalid)
            {
                $scope.message = "Please check your email";
                return;
            }

            $http.post("/api/authenticate",$scope.auth.loginUser).then(function(res){

                if(res.data.user)
                {
                    //Set the user to AuthService as "main" state change depends on that
                    AuthService.setUser(res.data.user);
                }

                if(res.data.success === true)
                {
                    $scope.message = res.data.msg;
                    $state.go("main");
                }

                if(res.data.redirectTo)
                {
                    $state.go("main");
                }

            },function(err){

               if(err.data && err.data.success === false)
                    $scope.message = err.data.msg;
                else
                    $scope.message = "An error occured while authentication. Please try after sometime"
            });
        };

        $scope.register = function(){
            var self = this;
            $scope.emailErrMessage = "";
            $scope.registerMessage = "";

            $http.post("/api/register",$scope.auth.regUser).then(function(res){
                $scope.registerMessage = "User created successfully";
                $scope.auth.regUser = {email:"",pwd:""};$scope.pwdConfirm = "";
                $scope.registerForm.$setPristine();
            },function(err){
                if(err.data.success === false)
                    $scope.emailErrMessage = err.data.msg;
            });
        };
    }]);

    app.directive("compareTo",["$parse",function($parse){
       function link(scope,elem,attrs,ngModel){
           var mainModel = $parse(attrs.compareTo);
           var secondModel = $parse(attrs.ngModel);

           scope.$watch(attrs.ngModel,function(newValue){
               ngModel.$setValidity(attrs.name, newValue === mainModel(scope));
           });

           scope.$watch(attrs.compareTo,function(newValue){
               ngModel.$setValidity(attrs.name, newValue === secondModel(scope));
           })
       }

        return {
            require: "ngModel",
            link: link
        }
    }]);
})();
