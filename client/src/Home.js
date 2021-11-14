import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getToken, removeUserSession} from "./Utils/SetToken";
import axios from "axios";


const Home  =()=>{
    const navigate = useNavigate('');
    const [name,setName]= useState('');
    const [surname,setSurname]= useState('');
    // const [email,setEmail]= useState('');

    const handleLogout =()=>{
        removeUserSession();
        navigate('/');
    }

    useEffect(() => {
        const config = {
            method: 'get',
            url: 'http://localhost:8000/api/user/userdata',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        };

        axios(config).then(res=>{
            console.log(res.data)
            setSurname(res.data.surname);
            setName(res.data.name);
            // setEmail(res.data.email);

        }).catch(e=>{
            console.log(e)
        })

    }, []);

    const updateData =(e)=>{
        e.preventDefault();
        const data ={
            "name": name,
            "surname": surname
        };


        console.log(data,"data")

        var config = {
            method: 'post',
            url: 'http://localhost:8000/api/user/update-user-data',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            },
            data
        };


        axios(config).then(data=>{
              window.location.reload(false);

        }).catch(e=>{
            console.log(e,"eee")
        })
    }




    return(
        <div>
            <div>
                <p>Name:</p>
                <input type="text" value={name}  onChange={e=>setName(e.target.value)}/>
            </div>
            <br/>
            <div>
                <p>Surname:</p>
                <input type="text"  value={surname}  onChange={e=>setSurname(e.target.value)} />
            </div>
            <br/>
            {/*<div>*/}
            {/*    <p>Email:</p>*/}
            {/*   <input type="text"  value=email />*/}
            {/*</div>*/}
            <br/>
            <div>
            <input type="button"  value="UpdateData" onClick={updateData}/>
            <input type="button" value="Logout" onClick={handleLogout}/>
            </div>
        </div>
    )
}


export default Home;