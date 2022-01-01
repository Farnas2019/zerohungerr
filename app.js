const   express         =   require("express");
const   bodyParser      =   require("body-parser");
const   resturatRoute      =   require("./route/resturantroute");
const   Helper     =   require("./model/helper");
const   methodOverride  =   require("method-override");
const   flash       = require("connect-flash");
const   passport        =   require("passport"),
        LocalStrategy   =   require("passport-local"),
        passportLocalMongoose  = require("passport-local-mongoose");
const mongoose = require("mongoose");
const multer = require("multer");
const _ = require('lodash');
const path = require('path');
const request = require('request');
const payment = require("./controller/payment");
const { isLoggedin } = require("./middleware/isLoggedIn");
const { isUser} = require("./middleware/isLoggedIn");


const {dbURL} = require("./config/keys");


mongoose.connect(dbURL,{useCreateIndex: true, useUnifiedTopology:true, useNewUrlParser: true}).then(function(result){
    console.log("Connected to DB");
}).catch(function(err){
    console.log(err);
})


var app = express();
app.use(express.json());
app.use(require("express-session")({
    secret: "This is working Fine",
    resave:false,
    saveUninitialized: false
}));
app.set("view engine", 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use("/public", express.static("public"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/sound", express.static("sound"));
app.use(passport.initialize());
app.use(passport.session());
app.use(isUser);
app.use("/", resturatRoute);
app.use("/pay", payment);


var port = process.env.PORT || 4000;
var connected = app.listen(port);
if(connected){
    console.log("Now Listening to" + " " + port);
}