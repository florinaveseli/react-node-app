const USER_ROUTE_ENUMS={
    BASE_URL:"/user",
    REGISTER:"/register",
    LOGIN:"/login",
    UPDATE_USER_DATA:"/update-user-data",
    ADD_TASK:"/add-task",
    UPDATE_TASK:"/update-task",
    COMPLETE_TASK:"/complete-task",
    DELETE_TASK:"/delete-task",
    CREATE_SUBTASK:"/create-subtask",
    CREATE_LIST :"/create-list",
    EDIT_LIST :"/edit-list",
    DELETE_LIST :"/delete-list",
    USERDATA:"/userdata",
    SUBTASKS:"/subtasks/:task_id",
    TASKS:"/tasks",
    LISTS:"/lists",
    TASK:"/task/:id",
    LIST:"/list/:id",
    DELETE_SUBTASK:"/delete-subtask",
    UPDATE_SUBTASK:"/update-subtask",
    SUBTASK:"/subtask/:id",
    COMPLETE_SUBTASK:"/complete-subtask"
}


module.exports = {
    USER_ROUTE_ENUMS
}