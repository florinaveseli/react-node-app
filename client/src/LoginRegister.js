import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {setUserSession} from "./Utils/SetToken";



const LoginRegister  =()=>{
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(null);
    const [loading,setLoading] =useState(false);
    const navigate = useNavigate('');

    const handleLogin =()=>{
        setError(null);
        setLoading(true);
        axios.post("http://localhost:8000/api/user/login",{
            email:username,
            password:password
        }).then(res =>{
            setLoading(false);
            setUserSession(res.data.token);
            navigate('/home')
        }).catch(e=>{

            if(e.response.status === 422 || e.response.status === 400){
                setError(e.response.data.message);
            }
            else{
                setError("Something went wrong");
            }
            setLoading(false);


        })

    }
    return(

        <div>
            <div className="login">
             <h4>Login</h4>
             <div>
                 <p>Email</p>
                 <input type="text" value={username} onChange={e=>setUsername(e.target.value)}/>
             </div>
             <div>
                 <p>Password</p>
                 <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
             </div>
                <br/>
                {error && <div className="error">{error}</div>}
                <input type="button" value={loading?"Loading...":"Login"} disabled={loading} onClick={handleLogin}/>
                <br/>
                <br/>
                <input type="button" value="Register"/>
            </div>
            <div className="register">
                <h4>Register</h4>
                <div>
                    <p>Email</p>
                    <input type="text"/>
                </div>
                <div>
                    <p>Password</p>
                    <input type="password"/>
                </div>
                <div>
                    <p>Name</p>
                    <input type="text"/>
                </div>
                <div>
                    <p>Surname</p>
                    <input type="text"/>
                </div>
                <br/>
                <input type="button" value="Register"/>
                <br/>
                <br/>
                <input type="button" value="Login"/>
            </div>

        </div>
    )
}


export default LoginRegister;