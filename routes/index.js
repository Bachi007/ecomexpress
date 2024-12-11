var express = require('express');
 var product = require('../models/product');
var router = express.Router();


router.get("/products",(req,res)=>{
  product.find({})
  .then((docs)=>res.send(docs))
  .catch((err)=>console.log(err))
})


//get products greater than given price

router.get("/getproducts",(req,res)=>{
  
  const {minprice,maxprice}=req.query;
  
  product.find({productPrice:{$gt:minprice,$lt:maxprice}})
  .then((docs)=>res.send(docs))
  .catch((err)=>console.log(err));
  
})

router.get("/pagination",(req,res)=>{
  const {page,limitnum}=req.query;

    const skipnum=(page-1)*limitnum;
    product.find({}).skip(skipnum).limit(limitnum)
    .then((docs)=>res.send(docs))
    .catch((err)=>console.log(err))
})


router.get("/search",(req,res)=>{
 
    const {name} = req.query;

    product.find({productName:new RegExp(name,'i')})
    .then((docs)=>res.send(docs))
    .catch((err)=>console.log(err));



})








router.post("/add",(req,res)=>{
  var newproduct=new product(req.body);
  newproduct.save()
            .then(()=>{res.send({status:"success",response:newproduct})})
            .catch((err)=>console.log(err))
})

router.post("/addmany",(req,res)=>{
  product.insertMany(req.body)
  .then((result)=>res.send({status:"added",response:result}))
  .catch((err)=>console.log(err))
})



router.get("/product/:id",(req,res)=>{
    product.findOne({productId:req.params.id})
      .then((docs)=>res.send(docs))
      .catch((err)=>console.log(err))
})

router.delete("/product/:id",(req,res)=>{
    product.findByIdAndDelete(req.params.id)
    .then((result)=>res.send({status:"result",response:result}))
    .catch((err)=>console.log(err))
})


module.exports = router;
