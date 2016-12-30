var users = require("../data/users.json");

function checkAuthentication(req, res, next){

    if(req.url == "/" && req.session && req.session.user && users.hasOwnProperty(req.session.user.email))
    {
        return res.status(200).send({
            success:true,
            msg:"User already logged in",
            redirectTo:"main",
            user: req.session.user
        });
    }
    else
    {
        next();
    }
}

module.exports = {
    checkAuthentication: checkAuthentication
}
