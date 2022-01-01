const express = require("express");
const { Register, login, GetProfile, EditAvailable, index, GetRegister, contact, success, GetLogin, Donate, contactsuc, LeftOvers, GetResturants, Faq, logout, Contactpost, Errors, Whatwedo } = require("../controller/resturatsController");
const { isLoggedin } = require("../middleware/isLoggedIn");
const { isUser} = require("../middleware/isLoggedIn");
const multer = require("multer");

var router = express.Router();

const imageStorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, "uploads/");
    },
    filename: function(req,file, cb){
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const image = multer({storage:imageStorage}).single("image");


router.post("/register",image,Register);
router.post("/login",login);
router.get("/profile",isLoggedin, GetProfile);
router.patch("/profile",isLoggedin, EditAvailable);
router.get("/register",GetRegister);
router.get("/contact", contact);
router.post("/contact", Contactpost);
router.get("/login",GetLogin);
router.get("/success",success);
router.get("/donate",Donate);
router.get("/contactsuc", contactsuc);
router.get("/", index);
router.get("/leftover",LeftOvers);
router.get("/resturant", GetResturants);
router.get("/faq", Faq);
router.get("/logout", logout);
router.get("/error", Errors);
router.get("/what", Whatwedo);


module.exports = router;