const jwt = require("jsonwebtoken");

const secret = "5der53k-n475-957u-5n2m-45c4c76fd2cd4c1b5b8e-2345-402a-3455-c9afd4bf986e";

const generateToken = (data, time) => {

    return jwt.sign(data, secret, { expiresIn: time });
};

module.exports = generateToken;
