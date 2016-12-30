(function () {
    "use strict";

    var app = angular.module("test-prep");

    app.controller("QPanelController", ["$scope", function ($scope) {
        this.onClick = function(item){
            //var fn = this.onSelect;
            //fn()(item);
            this.onSelect(item);
        }
    }]);

    /*app.directive("questionPanel", function () {
        return {
            restrict: "E",
            templateUrl: "components/question-panel/question-panel.html",
            controller: "QPanelController"
        };
    });*/

    app.component("questionPanel",{
        templateUrl: "components/question-panel/question-panel.html",
        controller: "QPanelController",
        //controllerAs: "qctrl",
        bindings: {
            questions: '=',
            onSelect: "&onSelect"
        }
    });
})();
