import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import * as ROUTES from "../constants/routes";
import "./login.css";

export default function UserLogin({setLoginUser}){
    const history = useNavigate();

    const [email, setUser] = useState('');
    const [password, setPassword] = useState('');

    const isInvalid = password === '' || email === '';
    const user = { email, password}

    const handleLogin = async(event) => {
        event.preventDefault();

        axios.post("http://localhost:3000/login",user)
        .then(res => { 
            // console.log(res.data.user.type)
            alert(res.data.message)
            // setLoginUser(res.data.user)
            if(res.data.user.type==="admin"){
                history(ROUTES.ADMINHOME);
            }else{
                history(ROUTES.USERHOME);
            }
        })
    }

    useEffect(() => {
        document.title = "Login"
    })

    return(
        <div className="container">
            <form onSubmit={handleLogin} className="form-container" method="POST">
                <h3>Login</h3>
                <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        value={email}
                        onChange={({target}) => setUser(target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Enter Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={password}
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button disabled={isInvalid} type="submit" className={`btn-sub ${isInvalid}-sub`}>LOGIN</button>
            </form>
        </div>
    )
}