import axios from 'axios';
import React, { useState ,useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';




function Register() {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createdDate, setCreatedDate] = useState([]);
  const [updatedDate, setUpdatedDate] = useState([]);
 

  useEffect(() => {
    (async () => await save())();
  }, []);
  async function save(event) {


    event.preventDefault();
    try {

      await axios.post("https://localhost:7264/api/User/Register", {
      
        Name: name,
        Surname: surname,
        UserName: userName,
        Email: email,
        Password: password,
        CreatedDate: createdDate,
        UpdatedDate: updatedDate
        
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

   


  }

  return (
    <>

      <Form>
        <Row>
          <div class="form-row">
           

            <div class="form-group col-md-6" as={Col}>
              <label for="inputPassword4">Name</label>

              <Form.Control placeholder="Name" id="Name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }} />
            </div>
          </div>
          <div class="form-group col-md-6" as={Col}>
            <label for="inputSurname">Surname</label>

            <Form.Control placeholder="Surname" id="Surname"
              value={surname}
              onChange={(event) => {
                setSurname(event.target.value);
              }} />
          </div>


          <div class=" form-group col-md-6" as={Col}>
            <label for="inputUserName">UserName </label>

            <Form.Control placeholder="UserName" id="UserName"
              value={userName}
              onChange={(event) => {
                setUserName(event.target.value);
              }} />
          </div>
          <div class="form-group col-md-6" as={Col}>
            <label for="inputEmail">Email</label>

            <Form.Control placeholder="Email" id="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }} />
          </div>
          <div class="form-group col-md-6" as={Col}>
            <label for="inputPassword">Password</label>

            <Form.Control placeholder="Password" id="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }} />
          </div>
          <div class="form-group col-md-2" as={Col}>
            <label for="inputCreatedDate">CreatedDate</label>

            <Form.Control placeholder="CreatedDate" id="CreatedDate"
              value={createdDate}
              onChange={(event) => {
                setCreatedDate(event.target.value);
              }} />
          </div>
          <div class="form-group col-md-2" as={Col}>
            <label for="inputUpdatedDate">UpdatedDate</label>

            <Form.Control placeholder="UpdatedDate" id="UpdatedDate"
              value={updatedDate}
              onChange={(event) => {
                setUpdatedDate(event.target.value);
              }} />
          </div>
        </Row>
       
        <div>
          <button className="btn btn-primary mt-4" onClick={save}>
            Register
          </button>

        </div>
      </Form>



    </>
  );
}

export default Register;
