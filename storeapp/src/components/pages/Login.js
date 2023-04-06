import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link , useHistory } from 'react-router-dom';

import Row from 'react-bootstrap/Row';



function Login() {

  const [userName, setUserName] = useState("");

  const [password, setPassword] = useState("");
  const history = useHistory();
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    (async () => await login())();
  }, []);
  async function login(event) {
    event.preventDefault();
    try {

      await axios.post("https://localhost:7264/api/User/login", {

        UserName: userName,

        Password: password
     
      });
    
      
        localStorage.setItem("userName", JSON.stringify(userName));
       
        console.log(userName);
        history.push("/UserHeader");
      

     
      alert("Successfully");


      setUserName("");
      setPassword("");
      setSuccess(true);

    } catch (err) {
      alert(err);
    }


  }

  return (

    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <h6>ANASAYFAYA GİT</h6>
          
            <button className="btn btn-dark mt-2">
            <Link className="nav-link active" to="/UserHeader">Anasayfa</Link>
             
           </button>
           
       
        </section>
      ) : (
        <section>

          <h1>LOGIN </h1>
          <hr/>

          <form >
            <Row> &nbsp;&nbsp;
            <label htmlFor="username">Username:</label>
            <input
            class="form-group col-md-2"
              type="text"
              id="username"

              autoComplete="off"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              required
            />

            <label  htmlFor="password">Password:</label>
            <input
            class="form-group col-md-2"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            </Row>
            <button className="btn btn-success mt-4" onClick={login}>
              Login
            </button>
          </form>
          <br/>
          
          <h6>Dont have an account . Register here</h6>
          
            <button className="btn btn-primary mt-2">
            <Link className="nav-link active" to="/Register">Register</Link>
             
           </button>
          
        </section>
      )}
    </>
  );
}

export default Login;


