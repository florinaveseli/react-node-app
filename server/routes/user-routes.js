const express = require('express');
const router = express.Router();

const {USER_ROUTE_ENUMS} = require('./enums');
const checkAuth = require("../middlewares/check-auth");

const {register,login,updateUserData,createTask,editTask,completeTask,
       deleteTask,createSubTask,createList,editList,deleteList,
       getUserData,getSubtasks,getTasks,getLists,getTasksId,
       getListId,deleteSubTask,updateSubTask,subtaskId,completeSubtask}
    = require('../controllers/user-controller');

const {registerUserValidator} = require('../validators/user-validator');
const {validate} = require("../validators/validate");

router.post(USER_ROUTE_ENUMS.REGISTER,registerUserValidator(),validate,register);
router.post(USER_ROUTE_ENUMS.LOGIN,login)

router.use(checkAuth);

router.post(USER_ROUTE_ENUMS.UPDATE_USER_DATA,updateUserData);
router.post(USER_ROUTE_ENUMS.ADD_TASK,createTask);
router.post(USER_ROUTE_ENUMS.UPDATE_TASK,editTask);
router.post(USER_ROUTE_ENUMS.COMPLETE_TASK,completeTask);
router.post(USER_ROUTE_ENUMS.DELETE_TASK,deleteTask);
router.post(USER_ROUTE_ENUMS.CREATE_SUBTASK,createSubTask);
router.post(USER_ROUTE_ENUMS.CREATE_LIST,createList);
router.post(USER_ROUTE_ENUMS.EDIT_LIST,editList);
router.post(USER_ROUTE_ENUMS.DELETE_LIST,deleteList);
router.post(USER_ROUTE_ENUMS.DELETE_SUBTASK,deleteSubTask);
router.post(USER_ROUTE_ENUMS.UPDATE_SUBTASK,updateSubTask);
router.post(USER_ROUTE_ENUMS.COMPLETE_SUBTASK,completeSubtask);



router.get(USER_ROUTE_ENUMS.USERDATA,getUserData);
router.get(USER_ROUTE_ENUMS.SUBTASKS,getSubtasks);
router.get(USER_ROUTE_ENUMS.TASKS,getTasks);
router.get(USER_ROUTE_ENUMS.LISTS,getLists);
router.get(USER_ROUTE_ENUMS.TASK,getTasksId);
router.get(USER_ROUTE_ENUMS.LIST,getListId);
router.get(USER_ROUTE_ENUMS.SUBTASK,subtaskId);


module.exports =router;


