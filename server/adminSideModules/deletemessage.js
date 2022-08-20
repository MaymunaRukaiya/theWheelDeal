const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middelware/adminAuthentication");

const User = require('../models/userSchema');

module.exports = router.post('/deleteMessagefromdashboard', adminAuthentication, async (req, res)=>{
    const getId = req.body.messageIdFromDashBoard
    const idOfUser = getId

    try {
        const findUser = await User.findOne({"messages._id": idOfUser});
        let new_msg = findUser.messages.filter(message => message._id != idOfUser);
        if(new_msg.length==0){
            new_msg=[]
        }

        const findMessage = await User.updateOne({_id: findUser._id}, {$set: {messages: new_msg}})
        res.json({message: "Message deleted successfully"})
        
    } catch (error) {
        console.log(error);
        res.status(400).json({error: "Can not delete message"})
    }
    

})