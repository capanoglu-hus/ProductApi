import axios from 'axios';
import React, { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';




function Register() {
    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [userName, setUserName] = useState("");
    const [gender, setgender] = useState("");
    const [role, setrole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [createdDate, setCreatedDate] = useState([]);
    const [updatedDate, setUpdatedDate] = useState([]);

    async function save(event) {


        event.preventDefault();
        try {

            await axios.post("https://localhost:7264/api/User/register", {
                UserId: userId,
                Name: name,
                Surname: surname,
                UserName: userName,
                gender: gender,
                role: role,
                Email: email,
                Password: password,
                CreatedDate: createdDate,
                UpdatedDate: updatedDate
            });
            alert("Category Registation Successfully");
            setUserId("");
            setName("");
            setSurname("");
            setUserName("");
            setgender("");
            setrole("");
            setEmail("");
            setPassword("");
        } catch (err) {
            alert(err);
        }
    }

    return (

        <>

            <Form align="center">

               
                    <Form.Group as={Col} >
                        <Form.Label> USERID</Form.Label><br></br>
                        <Form.Control 
                            
                            type="text"
                            id="form3Example1cg"
                            placeholder="USERID"
                            onChange={(e) => setUserId(e.target.value)}
                            value={userId} />
                    </Form.Group>
                    <br></br>
                    <Form.Group as={Col} >
                        <Form.Label>Name</Form.Label><br></br>
                        <Form.Control type="text"
                          
                            
                            placeholder="NAME"
                            onChange={(e) => setName(e.target.value)}
                            value={name} />
                    </Form.Group>

                    <br></br>
                    <Form.Group as={Col} >
                        <Form.Label>SURNAME</Form.Label><br></br>
                        <Form.Control type="text"
                            

                            placeholder="SURNAME"
                            onChange={(e) => setSurname(e.target.value)}
                            value={surname}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group as={Col} >
                        <Form.Label>userName </Form.Label><br></br>
                        <Form.Control type="text"
                           

                            placeholder="userName"
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName} />
                    </Form.Group>

                    <br></br>
                    <Form.Group as={Col} >
                        <Form.Label>EMAİL</Form.Label><br></br>
                        <Form.Control type="text"
                            

                            placeholder="EMAİL"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} />
                    </Form.Group>
                    <br></br>
                    <Form.Group as={Col} >
                        <Form.Label>PASSWORD</Form.Label><br></br>
                        <Form.Control type="text"
                           

                            placeholder="PASSWORD"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                     </Form.Group>
                
                     <br></br>
                    <Form.Group as={Col} >
                        <Form.Label>ROLE</Form.Label><br></br>
                        <Form.Control type="text"
                            

                            placeholder="role"
                            onChange={(e) => setrole(e.target.value)}
                            value={role} />
                    </Form.Group>
                    <br></br>
                    <Form.Group as={Col} >
                        <Form.Label>gender  </Form.Label><br></br>
                        <Form.Control type="text"
                           

                            placeholder="gender"
                            onChange={(e) => setgender(e.target.value)}
                            value={gender} />
                    </Form.Group>

                    <br></br>
                    <Form.Group as={Col} >
                        <Form.Label>updatedDate</Form.Label><br></br>
                        <Form.Control type="text"
                           

                            placeholder="updatedDate"
                            onChange={(e) => setUpdatedDate(e.target.value)}
                            value={updatedDate} />
                    </Form.Group>
                    <br></br>
                    <Form.Group align="center "  >
                        <Form.Label>createdDate</Form.Label><br></br>
                        <Form.Control
                            type="text"
                            
                            border="3px"
                            placeholder="createdDate"
                            onChange={(e) => setCreatedDate(e.target.value)}
                            value={createdDate} />
                    </Form.Group>


                
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
