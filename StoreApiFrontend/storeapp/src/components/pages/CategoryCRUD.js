import axios from "axios";
import { useState, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

function CategoryCRUD() {


  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [status, setStatus] = useState([]);

  const [categorys, setCategorys] = useState([]);
  const [createUserId, setCreateUserId] = useState([]);
  const [updateUserId, setUpdateUserId] = useState([]);
  const [createdDate, setCreatedDate] = useState([]);
  const [updatedDate, setUpdatedDate] = useState([]);


  useEffect(() => {
    (async () => await Load())();
  }, []);
  async function Load() {

    const result = await axios.get("https://localhost:7264/api/Category/GetCategory");
    setCategorys(result.data);

  }

  async function save(event) {


    event.preventDefault();
    try {

      await axios.post("https://localhost:7264/api/Category/AddCategory", {

      
        name: name,
        description: description,
        status: status,
        createUserId: createUserId,
        updateUserId: updateUserId,
        createdDate: createdDate,
        updatedDate: updatedDate
      });
      alert("Category Registation Successfully");
    
      setName("");
      setDescription("");

      setStatus("");

      setUpdateUserId("");
      setCreateUserId("");
      setCreatedDate("");
      setUpdatedDate("");


      Load();
    } catch (err) {
      alert(err);
    }
  }

  async function editCategory(categorys) {
    setCategoryId(categorys.categoryId);
      setName(categorys.name);
      setDescription(categorys.description);

      setStatus(categorys.status);

      setUpdateUserId(categorys.updateUserId);
      setCreateUserId(categorys.createUserId);
      setCreatedDate(categorys.createdDate);
      setUpdatedDate(categorys.updatedDate);

  }

  async function DeleteCategory(categoryId) {
    console.log("denmee");
    await axios.delete("https://localhost:7264/api/Category/DeleteCategory/" + categoryId);
    alert("Category deleted Successfully");
    console.log("denmee");
    setCategoryId("");
    setName("");
    setDescription("");
    setStatus("");
    setUpdateUserId("");
    setCreateUserId("");
    setCreatedDate("");
    setUpdatedDate("");
    Load();
  }

  async function update(event) {
    console.log("denmee");
    event.preventDefault();
    try {
      console.log("denmee");
      await axios.put("https://localhost:7264/api/Category/UpdateCategory" + categorys.find((u) => u.categoryId === categoryId).categoryId || categoryId,
        {
          categoryId: categoryId,
          name: name,
          description: description,
          status: status,
          createUserId: createUserId,
          updateUserId: updateUserId,
          createdDate: createdDate,
          updatedDate: updatedDate

        }
      );
      alert("Registation Updateddddd");
      setCategoryId("");
      setName("");
      setDescription("");
      console.log("denmee");
      setStatus("");

      setUpdateUserId("");
      setCreateUserId("");
      setCreatedDate("");
      setUpdatedDate("");

      Load();
    } catch (err) {
      alert(err);
    }
  }





  return (
    <>
      <br></br>
      <h1>Category Add</h1>
      <br></br>
      <br></br>
      <Form>
        <Row>
        
          <Form.Group as={Col} >
            <Form.Label>CategoryId</Form.Label>
            <Form.Control placeholder="categoryId" id="id"

              value={categoryId}
              onChange={(event) => {
                setCategoryId(event.target.value);
              }} />
          </Form.Group>

          <Form.Group as={Col} >
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Name" id="id"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }} />
          </Form.Group>

        </Row>
        <Row>
          <Form.Group className="mb-3" >
            <Form.Label>Description</Form.Label>
            <Form.Control placeholder="Description" id="id"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }} />
          </Form.Group>
        </Row>
        <Row>


          <Form.Group as={Col} >
            <Form.Label>Status</Form.Label>
            
            <Form.Control placeholder="status"   
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
              }} />
          </Form.Group>


        </Row>
        <Row>
          <Form.Group as={Col} >
            <Form.Label>UpdatedDate </Form.Label>
            <Form.Control placeholder="UpdatedDate"
              id="UpdatedDate"
              value={updatedDate}
              onChange={(event) => {
                setUpdatedDate(event.target.value);
              }} />
          </Form.Group>


          <Form.Group as={Col} >
            <Form.Label>CreatedDate</Form.Label>
            <Form.Control placeholder="CreatedDate" id="CreatedDate"
              value={createdDate}
              onChange={(event) => {
                setCreatedDate(event.target.value);
              }} />
          </Form.Group>
          <Form.Group as={Col} >
            <Form.Label>UpdateUserId</Form.Label>
            <Form.Control placeholder="UpdatedUserId" id="UpdatedUserId"
              value={updateUserId}
              onChange={(event) => {
                setUpdateUserId(event.target.value);
              }} />
          </Form.Group>
          <Form.Group as={Col} >
            <Form.Label>CreateUserId</Form.Label>
            <Form.Control placeholder="CreatedUserId" id="CreatedUserId"
              value={createUserId}
              onChange={(event) => {
                setCreateUserId(event.target.value);
              }} />
          </Form.Group>
             
        </Row>
        <div>
          <button className="btn btn-primary mt-4" onClick={save}>
            Register
          </button>
          <button className="btn btn-secondary mt-4" onClick={update}>
            Update
          </button>
        </div>
      
      </Form>
      <br></br>
      <h1>Category Details</h1>
      <br></br>

      <br></br>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th >
              CategoryId
            </th>
            <th >
              Name
            </th>
            <th >
              Description
            </th>
            <th >
              Status
            </th>
            <th >
              UpdatedDate
            </th>
            <th >
              CreatedDate
            </th>
            <th >
              UpdatedUserId
            </th>
            <th >
              CreatedUserId
            </th>
            <th >
              Option
            </th>

          </tr>
        </thead>

        <tbody >
          {
            categorys.map((cat) => (
              <tr key={cat.CategoryId}>
                <td >{cat.categoryId}</td>
                <td>{cat.name}</td>
                <td>{cat.description}</td>
                <td>{cat.status}</td>
                <td>{cat.updatedDate}</td>
                <td>{cat.createdDate}</td>
                <td>{cat.updateUserId}</td>
                <td>{cat.createUserId}</td>
                <td>
                <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editCategory(cat)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteCategory(cat.categoryId)}
                  >
                    Delete
                  </button>
                </td>


              </tr>
            ))}
        </tbody>

      </Table>


    </>

  );
}


export default CategoryCRUD;
