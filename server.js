var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var sessions = require("client-sessions");

var authCtrl = require("./controllers/authenticate");
var queCtrl = require("./controllers/questions");
var cors = require("./services/cors");
//var authentication = require("./services/authentication");

app.use(bodyParser.json());

//Allows access to api from any server
app.use(cors);

app.use(sessions({
    cookieName: "session",
    secret: "qwertyuioplkjhgfdsa"//Really long string which cannot be guessed
}))

//app.use(authentication.checkAuthentication);

//Serve frontend content from ui
app.use(express.static("ui"));

app.post("/api/authenticate", authCtrl.authenticate);
app.post("/api/register", authCtrl.register);
app.post("/api/logout", authCtrl.logout);
app.get("/api/questions", queCtrl.getQuestions);

app.listen(5000, function(){
    console.log("Server running at port 5000");
});
