(function(){
    "use strict";

    var app = angular.module("test-prep");

    app.controller("QFormController",["$scope","$document",function($scope,$document){
        var self = this;
        self.question = {};
        self.edit = false;

        self.toggleQuestionEdit = function(value){
            self.edit = value;

            if(value)
            {
                //Focus the question textarea once it is visible. Delay it so that textarea is visible first
                setTimeout(function(){
                    var question = $document[0].getElementById("question");
                    if(question)
                        question.focus();
                });
            }
        }
    }]);

    app.component("questionForm",{
        templateUrl: "components/question-form/question-form.html",
        controller: "QFormController",
        bindings: {
            question: "="
        }
    });
})();
