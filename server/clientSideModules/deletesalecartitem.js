const express = require('express');
const router = express.Router();
const authenticate = require("../middelware/authenticate");


const User = require('../models/userSchema');
const Cart = require('../models/cartSchema');


module.exports = router.post('/deleteitemfromcart', async (req, res)=>{
    const getId = req.body.cartitemid
    const findcart = await Cart.findOne({"cartItems._id": getId});

    let new_cart = findcart.cartItems.filter(item => item._id != getId);
    if(new_cart.length==0){
        new_cart=[]
    }
    const findMessage = await Cart.updateOne({_id: findcart._id}, {$set: {cartItems: new_cart}})
    if(findMessage.nModified){
    res.json({message: "item deleted"})
    }else{
        res.json({error: "item not deleted"})
    }
})
