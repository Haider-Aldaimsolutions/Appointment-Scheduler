const http = require('http');
const mongoose = require("mongoose");
const logger = require('./app/utils/logger');
const app = require('./app')

require("dotenv").config(); 

const server = http.createServer(app());
const PORT = process.env.PORT || 8081;

mongoose.connect(
    process.env.LOCAL_MONGODB_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(()=>{
    server.listen(PORT ,()=>{
        logger.info("Server is running on PORT " +PORT);
    });
}).catch((err)=> console.log(err));


