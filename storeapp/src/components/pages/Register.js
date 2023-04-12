import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';




function Register() {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const [error, setError] = useState(null);
 
  
  useEffect(() => {
    (async () => await save())();
  }, []);
  async function save(event) {


    event.preventDefault();
    try {

      await axios.post("https://localhost:7264/api/User/Register", {

        name: name,
        surname: surname,
        userName: userName,
        email: email,
        password: password,
       


      });
      alert(" Registation Successfully");

      setName("");
      setSurname("");
      setUserName("");

      setEmail("");
      setPassword("");
     
    } catch (err) {
      alert(err);
    }

    function isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
    }
  
    const setEmail = event => {
      if (!isValidEmail(event.target.value)) {
        setError('Email is invalid');
      } else {
        setError(null);
      }
  
      setEmail(event.target.value);
    };
  
      



  }

  return (
    <>
      <h1>Register</h1>
      <hr />
      <Form>

        <div class="form-row" >

          <Row> &nbsp;&nbsp;
            <div class="form-group col-md-4"  >
              <label for="inputSurname">Name</label>

              <Form.Control placeholder="Name" id="Name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }} />
            </div>
            &nbsp;&nbsp;
            <div class="form-group col-md-4" >
              <label for="inputSurname">Surname</label>

              <Form.Control placeholder="Surname" id="Surname"
                value={surname}
                onChange={(event) => {
                  setSurname(event.target.value);
                }} />
            </div>
          </Row>
          <Row> &nbsp;&nbsp;
            <div class=" form-group col-md-3" as={Col}>
              <label for="inputUserName">UserName </label>

              <Form.Control placeholder="UserName" id="UserName"
                value={userName}
                onChange={(event) => {
                  setUserName(event.target.value);
                }} />
            </div>
            &nbsp;&nbsp;
            <div class="form-group col-md-3" as={Col}>
              <label for="inputEmail">Email</label>

              <Form.Control placeholder="Email" id="Email"
                value={email}

                onChange={(event) => {
                  setEmail(event.target.value);

                }} />
                <div>
      

      {error && <h2 style={{color: 'red'}}>{error}</h2>}
    </div>
                 
            </div>
          </Row>
          <Row> &nbsp; &nbsp;
            <div class="form-group col-md-2" as={Col}>
              <label for="inputPassword">Password</label>

              <Form.Control placeholder="Password" id="Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }} />
            </div>
            &nbsp;&nbsp;
            
          </Row>
        </div>


        <div>
          &nbsp; <button className="btn btn-success mt-4" onClick={save}>
            Register
          </button>
          <br />
          <br />
          <h6> &nbsp;   Do you have an account ? Login  </h6>
          &nbsp; <button className="btn btn-primary mt-2">
            <Link className="nav-link active" to="/Login">Login</Link>

          </button>
        </div>
      </Form>



    </>
  );

}
export default Register;
