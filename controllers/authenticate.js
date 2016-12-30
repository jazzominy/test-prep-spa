var users = require("../data/users.json");
var fs = require("fs");
var RESPONSE = {success: false, msg: "", redirectTo: ""};

function authenticate(req, res){
    var user = req.body;

    if(!user)
        return res.status(401).send({success: false, msg: "Invalid user or password"});

    if(!users.hasOwnProperty(user.email))
        return res.status(404).send({success: false,msg: "User not found"});

    if(req.session && req.session.user && req.session.user.email == user.email)
    {
        return res.status(200).send({
            success:true,
            msg:"User already logged in",
            redirectTo:"main",
            user: req.session.user
        });
    }

    if(users[user.email] !== user.pwd)
        return res.status(403).send({success:false,msg:"Email or Password does not match"});

    if(!req.session.user)
    {
        delete user.pwd;
        req.session.user = user;
    }

    res.status(200).send({success:true,msg:"User authenticated",user:{email:user.email}});
}

function register(req,res){
    var user = req.body;

    if(!user)
        return res.status(401).send({success:false,msg:"No user information found for registration"});

    if(users.hasOwnProperty(user.email))
        return res.status(401).send({success:false,msg:"A user is already registered by this email id"});

    users[user.email] = user.pwd;

    fs.writeFile("./data/users.json", JSON.stringify(users),function(err){
        if(err)
            throw err;

        console.log("User info saved with email id -> " + user.email);
    });

    res.status(200).send({success:true,msg:"User account created",token:"Some token"});
}

function logout(req,res){
    if(req.session)
    {
        req.session.reset();
    }

    res.status(200).send({success:true,msg:"User logged out"});
}

module.exports = {
    authenticate: authenticate,
    register: register,
    logout: logout
}
