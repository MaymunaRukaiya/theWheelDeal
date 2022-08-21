const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');

dotenv.config({ path: './config.env' });

require('./database/conn'); 
// const User = require('./models/userSchema');

app.use(express.json());
app.use(cookieParser());

app.use(require('./router/auth'));
app.use("/uploads",express.static('uploads'));



const PORT = process.env.PORT;







app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
})