const   express         =   require("express");
const   Helper     =   require("../model/helper");
const   Contact    =   require("../model/contact");
const   methodOverride  =   require("method-override");
const multer = require("multer");
const   passport        =   require("passport"),
        LocalStrategy   =   require("passport-local"),
        passportLocalMongoose  = require("passport-local-mongoose");
const { isUser } = require("../middleware/isLoggedIn");


passport.use(new LocalStrategy(Helper.authenticate()));
passport.serializeUser(Helper.serializeUser());
passport.deserializeUser(Helper.deserializeUser());

exports.Register = async function(req,res){
    const {name, location,username,state, city,restname, password, phone,country} = req.body;
    if(!name ||!location ||!username ||!state ||!city ||!restname ||!password ||!phone ||! country){
        req.flash("error", "Please Fill All the Fields");
        return res.redirect("register");
    }
    const existingHelper = await Helper.findOne({username:username});
    if(existingHelper){
       req.flash("error", "Resturant Already Exist");
      return res.redirect("register");
    }   
        
        var image = req.file;
        console.log(image);
        await Helper.register(new Helper({name:name, location:location, phone:phone,username:username,state:state,city:city,  image: image.filename, restname:restname, foodAvailable:false, country:country}),  password).then(function(result){
        passport.authenticate("local")(req,res,function(result){
      
            req.flash("success", "Thank You for regitering Your Resturat with us");
            return  res.status(200).redirect("/");
            console.log(result)
        });
    }).catch(function(err){    
        console.log(err)
    });
}


exports.login = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: "/register"
});
exports.logout = async function(req,res){
    req.logout();
    req.flash("success", "You have Logged Out");
    res.redirect("/login")
}

exports.GetRegister = async function(req,res){
   
     res.render("register");
}
exports.GetLogin = async function(req,res){
     res.render("login");
}

exports.GetProfile = async function(req,res){
    var user = req.user._id;
    const existingHelper = await Helper.findById(user);
    res.render("profile", {helper:existingHelper});
}
exports.EditAvailable = async function(req,res){
    const {foodAvailable }= req.body;
    var user = req.user;
    if(user){
        const existinHelper = await Helper.findById(user._id);
          if(existinHelper !==null){
          existinHelper.foodAvailable=foodAvailable;           
         }
        var newHelper = await existinHelper.save();
        req.flash("success", "Your Profile Has Been Updated Thank You");
        return res.redirect("profile");
    }
}

exports.index = async function(req,res){
     res.render("index");
}

exports.contact = async function(req,res){
     res.render("contact");
}
exports.contactsuc = async function(req,res){
    res.render("contactsuc");
}
exports.success = async function(req,res){
    res.render("success");
}
exports.GetResturants = async function(req,res){
    const existingHelper = await Helper.find();
    res.render("resturant", {helper:existingHelper});
}
exports.Donate = async function(req,res){
      res.render("donate");
}
exports.LeftOvers = async function(req,res){
    const existingHelper = await Helper.find({foodAvailable:true});
     return res.render("leftovers", {helper:existingHelper});
}
exports.Faq = async function(req,res){
    res.render("faq");
}
exports.Errors = async function(req,res){
    res.render("error");
}
exports.Whatwedo = async function(req,res){
    res.render("whatwedo");
}
exports.Contactpost= async function(req,res){
    const {name,email,subject,message} =req.body;
    if(!name || !email || !subject ||!message){
        return res.render('contact');
    }
    const user = await new Contact({
        name:name,
        email:email,
        subject:subject,
        message:message
    });
    if(user){
        return res.render("contactsuc");
    }
    else{
        return res.render("error");
    }
      
    
}



