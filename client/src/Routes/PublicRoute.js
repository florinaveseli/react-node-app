import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {getToken} from "../Utils/SetToken";

const PublicRoute = () =>{
    return(

        !getToken() ? <Outlet  /> : <Navigate to={{ pathname: '/home'}} />

    )
}

export default PublicRoute;