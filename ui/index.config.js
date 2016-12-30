(function(){
    var app = angular.module("test-prep");

    app.config(["$stateProvider", "$urlRouterProvider",function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/login');

        $stateProvider.state("login",{
            url: "/login",
            templateUrl: "auth/auth.html",
            controller: "AuthController",
            controllerAs: "auth"
        }).
        state("main",{
           url: "/main",
           templateUrl:'main/main.html',
           controller: "MainController",
           controllerAs: "main"
        });
    }]);

    //On initialization, add the listener for restrict the access to main state directly from the url(localhost:5000/#/main)
    app.run(["$rootScope","AuthService","$state",function($rootScope,AuthService,$state){
        $rootScope.$on('$stateChangeStart',
                       function(event, toState, toParams, fromState, fromParams, options){
            if(toState.name == "main" && !AuthService.isUserLoggedIn())
            {
                event.preventDefault();
                $state.go("login");
            }
        });
    }])
})();
