import axios from "axios";
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function CategoryCRUD() {
 
const [CategoryId, setCategoryId] = useState("");
const [Name, setName] = useState("");
const [Description, setDescription] = useState("");
const [Status, setStatus] = useState([]);
const [CreatedUser, setCreatedUser] = useState([]);
const [UpdatedUser, setUpdatedUser] = useState([]);
const [categorys, setUsers] = useState([]);
  useEffect(() => {
    (async () => await Load())();
  }, []);
  async function Load() {
    
    const result = await axios.get("https://localhost:7264/api/Category/GetCategory");
    setUsers(result.data);
    console.log(result.data);
  }
  async function save(event) {
  
    event.preventDefault();
    try {
      await axios.post("https://localhost:7264/api/Category/AddCategory", {
        
        Name: Name,
        Description : Description,
        Status : Status,
        CreatedUser  : CreatedUser,
        UpdatedUser  : UpdatedUser,

      
      });
      alert("Category Registation Successfully");
          setCategoryId("");
          setName("");
          setDescription("");
          setStatus("");
          setUpdatedUser("");
          setCreatedUser("");
      
    
      Load();
    } catch (err) {
      alert(err);
    }
  }
 
  async function editCategory(categorys) {
    setCategoryId("categorys.CategoryId");
    setName("categorys.Name");
    setDescription("categorys.Description");
    setStatus("categorys.Status");
    setUpdatedUser("categorys.UpdatedUser");
    setCreatedUser("categorys.CreatedUser");
  
  }
 
  async function DeleteCategory(id) {
  await axios.delete("https://localhost:7264/api/Category/DeleteCategory/" + id);
   alert("Employee deleted Successfully");
   setCategoryId();
   setName();
   setDescription();
   setStatus();
   setUpdatedUser();
   setCreatedUser();
   Load();
  }
 
  async function update(event) {
    event.preventDefault();
    try {
 
  await axios.patch("https://localhost:7264/api/Category/UpdateCategory/"+ categorys.find((u) => u.CategoryId === CategoryId).CategoryId || CategoryId,
        {
            CategoryId: CategoryId,
            Name: Name,
            Description : Description,
            Status : Status,
            UpdatedUser  : UpdatedUser,
            CreatedUser  : CreatedUser
        }
      );
      alert("Registation Updateddddd");
      setCategoryId();
      setName();
      setDescription();
      setStatus();
      setUpdatedUser();
      setCreatedUser();
    
      Load();
    } catch (err) {
      alert(err);
    }
  }
 
    return (
      <>
      <h1>Category Details</h1>
      <Form>
        <Row>
          <Form.Group as={Col} >
            <Form.Label>CategoryId</Form.Label>
            <Form.Control placeholder="CategoryId" id="id"

              value={CategoryId}
              onChange={(event) => {
                setCategoryId(event.target.value);
              }} />
          </Form.Group>

          <Form.Group as={Col} >
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Name" id="id"
              value={Name}
              onChange={(event) => {
                setName(event.target.value);
              }} />
          </Form.Group>

        </Row>
        <Row>
          <Form.Group className="mb-3" >
            <Form.Label>Description</Form.Label>
            <Form.Control placeholder="Description" id="id"
              value={Description}
              onChange={(event) => {
                setDescription(event.target.value);
              }} />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} >
            <Form.Label> Status </Form.Label>
            <Form.Control placeholder="status"
              id="Status"
              value={Status}
              onChange={(event) => {
                setStatus(event.target.value);
              }} />
          </Form.Group>


          <Form.Group as={Col} >
            <Form.Label>UpdatedUser</Form.Label>
            <Form.Control placeholder="UpdatedUser" id="UpdatedUser"
              value={UpdatedUser}
              onChange={(event) => {
                setUpdatedUser(event.target.value);
              }} />
          </Form.Group>
          <Form.Group as={Col} >
            <Form.Label>CreatedUser</Form.Label>
            <Form.Control placeholder="CreatedUser" id="CreatedUser"
              value={CreatedUser}
              onChange={(event) => {
                setCreatedUser(event.target.value);
              }} />
          </Form.Group>

        </Row>
        <div>
            <button class="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
            <button class="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
      </Form>
      <br></br>
      <br></br>
      <br></br>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th scope="col">CategoryId</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">UpdatedUser</th>
            <th scope="col">CreatedUser</th>
            

            <th scope="col">Option</th>
          </tr>
        </thead>
        {categorys.map(function fn(category) {
          return (
            <tbody>
              <tr>
                <th scope="row">{category.CategoryId} </th>
                <td>{category.Name}</td>
                <td>{category.Description}</td>
                <td>{category.Status}</td>
                <td>{category.UpdatedUser}</td>
                <td>{category.CreatedUser}</td>
                
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editCategory(category)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteCategory(category.CategoryId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </>
  );
}


  
export default CategoryCRUD;