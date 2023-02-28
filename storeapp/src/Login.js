import React, {useState} from 'react';


export const Login = (props) => {



    const[email , setemail] = useState("");
    const[password , setpassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email)
    }
    return (
        <div className="auth-form-container">
        <h2>LOGIN</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlfor="email" > Email</label>
            <input value ={email} onChange={(e) => setemail(e.target.value)} type="email" placeholder='you@email.com' id='email' name="email"/>
            <label htmlfor="password" > password</label>
            <input value ={password} onChange={(e) => setpassword(e.target.value)}type="password" placeholder='******' id='password' name="password"/>
            <button type="submit" >LOG IN </button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('Register')}>Dont have an account . Register here</button>

        </div>
    );
}



