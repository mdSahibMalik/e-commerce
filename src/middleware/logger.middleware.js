const fs = require('fs');
const winston = require('winston');

const logerWinston = winston.createLogger({
    level:'info',
    format:winston.format.simple(),
    defaultMeta: { service: 'request-logging' },
    transports:[
       new winston.transports.File({ filename: 'logs.log'})
    ]
})

const fsPromisses = fs.promises;
const loger = async(logData) =>{
    try {
        logData = `\n ${new Date().toString()} - ${logData}`;
        await fsPromisses.appendFile("loger.txt", logData);
    } catch (error) {
        console.log(error);
    }
}

const logerMiddlware = async (req, res, next)=>{

    if(!req.url.includes('signin')){
        const data  = `The url : '${req.url}' Data is ${JSON.stringify(req.body == null ? 'Nothing in body' :req.body)}`;
        // await loger(data);
        await logerWinston.info(data)
    }
    next();
}

module.exports = logerMiddlware;