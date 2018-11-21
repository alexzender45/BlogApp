
const Blog = require("../models/blog");
const middlewareObj = {};

middlewareObj.checkBlogOwnership = function(req, res, next){
        if(req.isAuthenticated()){
            Blog.findById(req.params.id, function(err, foundBlog){
                if(err){
                    res.redirect("back");
                }else{
                    // Does user  own blog
                    if (foundBlog.author.id = (req.user._id)){
                        next();
                    }else{
                        res.redirect("back");
                    } 
                }
            });
        }  else{
            res.redirect("back");
        }
    }
// ISLOGGEDIN
  middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!!!");
    res.redirect("/login");
}
     

module.exports = middlewareObj;