import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {setUserSession} from "./Utils/SetToken";



const LoginRegister  =()=>{
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(null);
    const [loading,setLoading] =useState(false);
    const [login,setLogin]= useState(true);
    const [email,setEmail]= useState('');
    const [rPassword,setRPassword]= useState('');
    const [name,setName]= useState('');
    const [surname,setSurname]= useState('');


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

    const handleRegister = () =>{
        setError(null);
        setLoading(true);
        axios.post("http://localhost:8000/api/user/register",{
            name:name,
            surname: surname,
            email: email,
            password: rPassword

        }).then(res =>{
            setLoading(false);
            setLogin(true);
            window.location.reload(false);

        }).catch(e=>{
            setLoading(false);
            if(e.response.status === 422 ){
                const data = e.response.data.errors;

               if( e.response.data.errors !== undefined){

                   for (const property in data) {

                       setError(data[property]);
                   }
               }
               else{
                   setError(e.response.data.message);
               }

            }

            else{
                setError("Something went wrong");
            }
            console.log(e)
        })
    }

    const handleChangeLog = () =>{
        setLogin(true);
        window.location.reload(false);
    }
    return(
        login ?
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
                <input type="button" value="Register" onClick={()=>{setLogin(false)}}/>
            </div>
            :
            <div className="register">
                <h4>Register</h4>
                <div>
                    <p>Email</p>
                    <input type="text" value={email} onChange={e=>{setEmail(e.target.value)}}/>
                </div>
                <div>
                    <p>Password</p>
                    <input type="password" value={rPassword} onChange={e=>{setRPassword(e.target.value)}}/>
                </div>
                <div>
                    <p>Name</p>
                    <input type="text" value={name} onChange={e=>{setName(e.target.value)}}/>
                </div>
                <div>
                    <p>Surname</p>
                    <input type="text" value={surname} onChange={e=>{setSurname(e.target.value)}}/>
                </div>
                <br/>
                {error && <div className="error">{error}</div>}
                <input type="button" value={loading?"Loading...":"Register"} disabled={loading} onClick={handleRegister} />
                <br/>
                <br/>
                <input type="button" value="Login" onClick={handleChangeLog}/>
            </div>


    )
}


export default LoginRegister;