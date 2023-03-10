import React, {useState} from 'react';


export const Register = (props) => {
    const[Name , setName] = useState("");
    const[Surname , setSurname] = useState("");
    const[UserName , setUserName] = useState("");
    const[Gender , setGender] = useState("");
    const[Role , setRole] = useState("");
    const[email , setemail] = useState("");
    const[password , setpassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email)
    }
    return (
        <div className="auth-form-container">
        <h2>REGISTER</h2>
        <form className="Register-form" onSubmit={handleSubmit}>
            <label htmlfor="Name" > Name</label>
            <input value ={Name} onChange={(e) => setName(e.target.value)} type="Name" placeholder='Name' id='Name' name="Name"/>
            <label htmlfor="Surname" > Surname</label>
            <input value ={Surname} onChange={(e) => setSurname(e.target.value)}type="Surname" placeholder='Surname' id='Surname' name="Surname"/>
            <label htmlfor="UserName" > UserName</label>
            <input value ={UserName} onChange={(e) => setUserName(e.target.value)} type="UserName" placeholder='UserName' id='UserName' name="UserName"/>
            <label htmlfor="Gender" > Gender</label>
            <input value ={Gender} onChange={(e) => setGender(e.target.value)}type="Gender" placeholder='Gender' id='Gender' name="Gender"/>
            <label htmlfor="Role" > Role</label>
            <input value ={Role} onChange={(e) => setRole(e.target.value)}type="Role" placeholder='Role' id='Role' name="Role"/>
            <label htmlfor="email" > Email</label>
            <input value ={email} onChange={(e) => setemail(e.target.value)} type="email" placeholder='you@email.com' id='email' name="email"/>
            <label htmlfor="password" > password</label>
            <input value ={password} onChange={(e) => setpassword(e.target.value)}type="password" placeholder='******' id='password' name="password"/>
            <button type="submit" >LOG IN </button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('Login')} >.LOGIN here..</button>

        </div>
    );
}


