const express = require('express');
const cookieParser = require('cookie-parser');
const cors =require('cors');

const userRoutes = require('./app/Routes/users.route');
const authRoutes = require('./app/Routes/auth.routes');

module.exports = ()=>{
    const app = express()
    
    app.use(cors());
    app.use(cookieParser());
    app.use(express.json())
    app.use(express.urlencoded());

    //app.use('/api/users',userRoutes);
    app.use('/api/auth',authRoutes);

    return app;
}