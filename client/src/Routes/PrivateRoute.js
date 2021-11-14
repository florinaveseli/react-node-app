import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {getToken} from "../Utils/SetToken";

const PrivateRoute = () =>{
    return(

            getToken() ? <Outlet  /> : <Navigate to={{ pathname: '/'}} />

    )
}

export default PrivateRoute;