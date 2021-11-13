const express = require('express');
const router = express.Router();

const {USER_ROUTE_ENUMS} = require('./enums')

const userRoutes = require("./user-routes");

router.use(USER_ROUTE_ENUMS.BASE_URL,userRoutes);

module.exports = router;
