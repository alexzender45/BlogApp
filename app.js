const express               = require("express"),
      bodyParser            = require("body-parser"),
      app                   = express(),
      dotenv                = require('dotenv'),
      expressSanitizer      = require("express-sanitizer"),
      methodOverride        = require("method-override"),
      mongoose              = require("mongoose"),

      port                  = process.env.PORT || 8080
      dotenv.config();
      app.set("view engine", "ejs");
      app.use(express.static("public"));
      app.use(bodyParser.urlencoded({extended: true}));
      app.use(expressSanitizer());
      app.use(methodOverride("_method"))

      const url = process.env.DATABASEURL ||  "mongodb://localhost/Flower_site"
    mongoose.connect(url);
// mongoose/model config
const blogSchema = new mongoose.Schema({
    title : String,
    image : String,
    body : String,
    created : {type : Date, default : Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title : "Test Blog",
//     image : "https://static.boredpanda.com/blog/wp-content/uploads/2016/05/dog-photography-alicja-zmyslowska-2-11-574036e13f03c__880.jpg",
//     body : "Hello This is a Blog Post"

// });

// Restful Routes
app.get("/", function(req, res){
res.redirect("/blogs");
});
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err)
        }else{
            res.render("index", {blogs : blogs});
        }
    });
});
 // New Routes
 app.get("/blogs/new", function(req, res){
     res.render("new");
 });
// Create Routes
app.post("/blogs", function(req, res){
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
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show", {blog : foundBlog});
        }
    });
});

// Edit Routes
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
        }else{
            res.render("edit", {blog : foundBlog});
        }
    });
});


// Update Routes
app.put("/blogs/:id", function(req, res){
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
app.delete("/blogs/:id", function(req, res){
Blog.findByIdAndRemove(req.params.id, function(err){
    if(err){
        res.redirect("/blogs");
    }else{
        res.redirect("/blogs");
    }
});
});



app.listen(process.env.PORT || 5555, function(){
    console.log("server 5555 has started");
});
