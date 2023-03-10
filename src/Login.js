import React from 'react';
import { useEffect, useState ,useNavigate } from "react";

import  toast  from "react-toastify";

export const Login = (props) => {

    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');


    const usenavigate=useNavigate();

    useEffect(()=>{
sessionStorage.clear();
    },[]);

    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            
            fetch("https://localhost:7264/api/User/login" + username).then((res) => {
                return res.json();
            }).then((resp) => {
               
                if (Object.keys(resp).length === 0) {
                    toast.error('Please Enter valid username');
                } else {
                    if (resp.password === password) {
                        toast.success('Success');
                        sessionStorage.setItem('username',username);
                        sessionStorage.setItem('userrole',resp.role);
                        usenavigate('/')
                    }else{
                        toast.error('Please Enter valid credentials');
                    }
                }
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    }


    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }
    return (
        <div className="auth-form-container">
        <h2>LOGIN</h2>
        <form  onSubmit={ProceedLogin}  className="login-form" >
            <label htmlfor="email" > Email</label>
            <input value ={email} onChange={(e) => setUserName(e.target.value)} type="username" placeholder='you@email.com' id='email' name="email"/>
            <label htmlfor="password" > password</label>
            <input value ={password} onChange={(e) => setPassword(e.target.value)}type="password" placeholder='******' id='password' name="password"/>
            <button type="submit" >LOG IN </button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('Register')}>Dont have an account . Register here</button>

        </div>
    );
}



