var questions = require("../data/questions.json");

function getQuestions(res,res){
    res.status(200).json(questions);
}

module.exports = {
    getQuestions: getQuestions
}
