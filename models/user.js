var mongoose=require('mongoose');

var userSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    phone:String,
    role:String,
});

var user=mongoose.model("users",userSchema);
module.exports=user;