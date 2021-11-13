const express = require('express');
const router = express.Router();

const {USER_ROUTE_ENUMS} = require('./enums');
const {register} = require('../controllers/user-controller');
const {registerUserValidator} = require('../validators/user-validator');
const {validate} = require("../validators/validate");

router.post(USER_ROUTE_ENUMS.REGISTER,registerUserValidator(),validate,register);


module.exports =router;


