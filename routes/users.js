var express = require('express');
var User=require('../models/user');
var bcrypt = require('bcryptjs');
var router = express.Router();
var jwt=require('jsonwebtoken')
var mailer=require('nodemailer')
require('dotenv').config();
  
router.post("/registration", (req,res)=>{

 User.findOne({username:req.body.username})
 .then(async (dbuser)=>{
  if(dbuser!=null){
    res.send({status:"user already existed"});
  }
  else{ 
    console.log(dbuser);
    var newuser = new User({
      username:req.body.username,
      password:await bcrypt.hash(req.body.password,10),
      email:req.body.email,
      phone:req.body.phone,
      role:req.body.role
    });

    newuser.save()
    .then((result)=>{
      

      var transporter = mailer.createTransport({
       host:"smtp.gmail.com",
        auth:{
          user:"chitturi.bhaskarasai@gmail.com",
          pass:"xtek mbov zdtw urxt"
        }
      })

      var mailoptions={
        from:"chitturi.bhaskarasai@gmail.com",
        to:req.body.email,
        subject:"Registration successful in our website",
        text:"Hello "+req.body.username+" You have successfully registered in our website"
      }
    transporter.sendMail(mailoptions,(err,info)=>{
      console.log("mailoptions",mailoptions)
      if(err){
        console.log(err)
      }
      else{
        console.log("Email sent: "+info.response)
      }
    })
    
    
      res.send({status:"user registered successfully",response:result})
    
    
    
    })
    .catch((err)=>console.log(err));
  }
 })
 .catch((err)=>console.log(err));
  
})

router.post("/login",(req,res)=>{
    User.findOne({username:req.body.username})
    .then(async (dbuser)=>{
      if(dbuser!=null){
          if(await bcrypt.compare(req.body.password,dbuser.password))
          {
            const token=jwt.sign({username:dbuser.username},process.env.JWT_Secret,{expiresIn:'1h'})
            res.send({status:"Login successful",jwttoken:token,response:dbuser})
          }
          else{
            res.send({status:"invalid username/passsword"})
          }
      }
      else{
        res.send({status:"user not found"})
      }
    })
    .catch((err)=>console.log(err));
})











module.exports = router;
