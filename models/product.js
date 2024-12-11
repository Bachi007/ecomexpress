var mongoose = require('mongoose');

var productSchema=mongoose.Schema({
    productId:Number,
    productName:String,
    productDescription:String,
    productImage:String,
    productPrice:Number,
})

var product=mongoose.model("products",productSchema);
module.exports=product;