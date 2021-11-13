const jwt = require("jsonwebtoken");


const secret = process.env.APP_SECRET;

const generateToken = (data,time) =>{
    return jwt.sign(data,secret,{expressIn: time});
};

module.exports = generateToken;