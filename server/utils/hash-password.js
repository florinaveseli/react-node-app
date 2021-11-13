const bcrypt = require("bcryptjs");
const saltRounds = 12;

const hashPassword = async (plainPassword) =>{
    return bcrypt.hash(plainPassword,saltRounds);
};


module.exports = hashPassword;
