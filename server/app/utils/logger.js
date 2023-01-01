var winston = require('winston');

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ 
        filename: 'logfile.log',
        maxsize: 5242880, 
        handleExceptions:true
       
    })
    ]
  });

module.exports = logger;