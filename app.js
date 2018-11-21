const express               = require("express"),
      bodyParser            = require("body-parser"),
      app                   = express(),
      LocalStrategy         = require("passport-local"),
      flash                 =  require("connect-flash"),
      passport              = require("passport"),
      passportLocalMongoose = require("passport-local-mongoose"),
      Blog               = require("./models/blog"),
      User                  = require("./models/user"),
      dotenv                = require('dotenv'),
      expressSanitizer      = require("express-sanitizer"),
      methodOverride        = require("method-override"),
      mongoose              = require("mongoose")
// config
      port                  = process.env.PORT || 5555
      dotenv.config();
      
      const blogRoutes     = require("./routes/blogs"),
      indexRoutes    = require("./routes/index")


      app.set("view engine", "ejs");
      app.use(express.static(__dirname + "/public"));
      app.use(bodyParser.urlencoded({extended: true}));
      app.use(expressSanitizer());
      app.use(methodOverride("_method"))

      
      // passport configuration
      app.use(require("express-session")({
        secret : "Why talking dumpmy",
        resave : false,
        saveUninitialized : false
    }));
    passport.use(new LocalStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error  = req.flash("error");
    res.locals.success  = req.flash("success");
    next();
});
    
// Database configuration
      const url = process.env.DATABASEURL ||  "mongodb://localhost/Flower_site"
    mongoose.connect(url);

    app.use("/", indexRoutes);
    app.use("/",blogRoutes);



app.listen(process.env.PORT || 5555, function(){
    console.log("server 5555 has started");
});
