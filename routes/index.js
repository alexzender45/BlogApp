const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");


// Auth Route
router.get("/register", function(req, res){
    res.render("register");
});

// Handle signup logic
router.post("/register", function(req, res){
    req.body.username
    req.body.password
    User.register(new User ({username : req.body.username}), req.body.password, function(err, user){
        if(err){
        req.flash("error", err.message);
            return res.render("register");
        }
         passport.authenticate("local")(req, res, function(){
        req.flash("success", "Welcome To Flower Site" );
             res.redirect("/");
         });
    });
    });

    // Login Route
    router.get("/login", function(req, res,err){
        if(err){
            req.flash("error", err.message);
                return res.render("login");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", user.username + "Hi Welcome Back" );
                 res.redirect("/");
             });
    });

    // Handling login logic
    router.post("/login", passport.authenticate("local",
    {
        successRedirect : "/",
        failureRedirect : "/login"
    }), function(req, res){
    });
// Logout Route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged You Out!");
    res.redirect("/");
});

    // Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = router;