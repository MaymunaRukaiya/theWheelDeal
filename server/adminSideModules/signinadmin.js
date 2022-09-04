const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Admin = require('../models/adminSchema');

// Admin Signin
module.exports =  router.post('/signinAdmin', async(req, res)=>{
    
    try {
        let token;
        const { adminName , adminPassword } = req.body;
        
        if(!adminName || !adminPassword){
            return res.status(400).json({error: "Invalid Credentials"})
        }
        
        const adminSignin = await Admin.findOne({ adminName: adminName });
        console.log(adminName, adminPassword,adminSignin);
        if (adminSignin){
                const isSame = await bcrypt.compare(adminPassword, adminSignin.adminPassword); 

                token = await adminSignin.generateAuthToken();

                res.cookie("jwtAdmin", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly:true
                })
                
                if(!isSame){
                    res.status(400).json({error: "Invalid Credentials"})    
                }else{
                    res.json({message: "User sign in successful"})
                }
                
        }else{
            res.status(400).json({error: "Invalid Credentials"})
        }
       
        
    } catch (error) {
        console.log(error);
    }
});