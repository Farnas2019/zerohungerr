exports.isLoggedin= function isLoggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/login')
    }
}

exports.isUser = function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
     next();
 };