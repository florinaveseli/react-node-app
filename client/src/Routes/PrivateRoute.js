import React from "react";
import {Redirect, Route} from "react-router-dom";
import {getToken} from "../Utils/SetToken";

const PublicRoute = ({component: Component,...data}) =>{
    return(
        <Route
            {...data}
            render={(props) => getToken() ? <Component {...data} /> : <Redirect to={{ pathname: '/', state :{ from: props.location}}} />}
        />
    )
}

export default PublicRoute;