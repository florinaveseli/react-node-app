const {check}= require("express-validator");

const registerUserValidator = () =>{
    return [
      check("name")
          .trim()
          .not()
          .isEmpty()
          .withMessage('name is required'),
      check("surname")
          .trim()
          .not()
          .isEmpty()
          .withMessage('surname is required'),
      check("email")
          .trim()
          .not()
          .isEmpty()
          .withMessage('email is required')
          .bail()
          .isEmail()
          .normalizeEmail()
          .withMessage("Email is invalid"),
      check("password")
          .trim()
          .not()
          .isEmpty()
          .withMessage('password is required'),
    ];
}

module.exports = {
    registerUserValidator
}

