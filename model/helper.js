const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
var userSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    username:{
        type: String,
        require:true
    },
    phone:{
        type: String,
        require:true
    },
    state:{
        type: String,
        require:true
    },
    city:{
        type: String,
        require:true
    },    
    image:{
        type: [String],
        require:true
    },
    password:{
        type: String,
        require:true
    },
    foodAvailable:{
        type: Boolean,
        require:true
    },
    restname:{
        type: String,
        require:true
    },
    country:{
        type: String,
        require:true
    },
    location:{
        type: String,
        require:true
    },
}, {timestamps: true})
userSchema.plugin(passportLocalMongoose);
var Helper = mongoose.model("Helper", userSchema);

module.exports = Helper;