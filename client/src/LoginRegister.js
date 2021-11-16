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
            <div className="inner">
                <form>
                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" value={username} onChange={e=>setUsername(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} />
                </div>

                {error && <div className="error">{error}</div>}

                <button   className="btn btn-dark btn-lg btn-block " value={loading?"Loading...":"Login"} disabled={loading} onClick={handleLogin}>Login</button>
                <button className="btn btn-dark btn-lg btn-block space-btn"  onClick={()=>{setLogin(false)}}>Register</button>
                </form>
            </div>
            :
            <div  className="inner">
                <form>
                    <h3>Register</h3>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" value={email} onChange={e=>{setEmail(e.target.value)}}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" value={rPassword} onChange={e=>{setRPassword(e.target.value)}} />
                    </div>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" value={name} onChange={e=>{setName(e.target.value)}} />
                    </div>
                    <div className="form-group">
                        <label>Surname</label>
                        <input type="text" className="form-control" value={surname} onChange={e=>{setSurname(e.target.value)}} />
                    </div>

                    {error && <div className="error">{error}</div>}
                    <button className="btn btn-dark btn-lg btn-block"  value={loading?"Loading...":"Register"} disabled={loading} onClick={handleRegister}>Register</button>
                    <button   className="btn btn-dark btn-lg btn-block space-btn" onClick={handleChangeLog}>Login</button>
                </form>
            </div>


    )
}


export default LoginRegister;