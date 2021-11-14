import React from "react";
import {useNavigate} from "react-router-dom";
import {removeUserSession} from "./Utils/SetToken";


const Home  =(props)=>{
    const navigate = useNavigate('');


    const handleLogout =()=>{
        removeUserSession();
        navigate('/');
    }

    return(
        <div>
            <input type="button" value="Logout" onClick={handleLogout}/>
        </div>
    )
}


export default Home;