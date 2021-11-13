const bcrypt = require("bcryptjs");

const matchPassword = async (plainPassword, dbPassword) => {
    return bcrypt.compare(plainPassword, dbPassword);
};

module.exports = matchPassword;
