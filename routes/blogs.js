const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const middleware   =  require("../middleware");

router.get("/", function(req, res){
    res.redirect("/blogs");
    });
    router.get("/blogs", function(req, res){
        Blog.find({}, function(err, blogs){
            if(err){
                console.log(err)
            }else{
                res.render("index", {blogs : blogs});
            }
        });
    });
     // New Routes
     router.get("/blogs/new",middleware.isLoggedIn, function(req, res){
         res.render("new");
     });
    // Create Routes
    router.post("/blogs",middleware.isLoggedIn, function(req,res){
        req.body.blog.body = req.sanitize(req.body.blog.body);
        Blog.create(req.body.blog, function(err, newBlog){
            if(err){
                res.render("new");
            }else{
                res.redirect("/blogs")
            }
        })
    })
    
// Show page
router.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show", {blog : foundBlog});
        }
    });
});

//Edit Routes
router.get("/blogs/:id/edit",middleware.checkBlogOwnership, function(req,res){
        Blog.findById(req.params.id, function(err, foundBlog){
                    res.render("edit", {blog : foundBlog});
});
});



// Update Routes
router.put("/blogs/:id",middleware.checkBlogOwnership, function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
if(err){
    res.redirect("/blogs");
}else{
    res.redirect("/blogs/" + req.params.id);
}
});
});


// Delete Route
router.delete("/blogs/:id",middleware.checkBlogOwnership, function(req, res){
Blog.findByIdAndRemove(req.params.id, function(err){
    if(err){
        res.redirect("/blogs");
    }else{
        res.redirect("/blogs");
    }
});
});
 module.exports = router;