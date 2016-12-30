(function(){
    var app = angular.module("test-prep");

    app.service("AuthService",["$rootScope",function($rootScope){
        var self = this;
        self.user = {email: ""};

        return {
            setUser: function(user){
                self.user = user;
            },
            getUser: function(){
                return self.user;
            },
            reset: function(){
                self.user.email = "";
            },
            isUserLoggedIn: function(){
                return self.user.email != "";
            }
        }
    }]);
})();
