const express = require('express');
const router = express.Router();

const {USER_ROUTE_ENUMS} = require('./enums');
const checkAuth = require("../middlewares/check-auth");

const {register,login,updateUserData,createTask} = require('../controllers/user-controller');
const {registerUserValidator} = require('../validators/user-validator');
const {validate} = require("../validators/validate");

router.post(USER_ROUTE_ENUMS.REGISTER,registerUserValidator(),validate,register);
router.post(USER_ROUTE_ENUMS.LOGIN,login)

router.use(checkAuth);

router.post(USER_ROUTE_ENUMS.UPDATE_USER_DATA,updateUserData);
router.post(USER_ROUTE_ENUMS.ADD_TASK,createTask);

module.exports =router;


