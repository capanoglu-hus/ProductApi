import axios from "axios";
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';

import React from "react";

function Category() {

  const [CategoryId, setCategoryId] = useState("");
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Status, setStatus] = useState([]);
  const [CreatedUserId, setCreatedUserId] = useState([]);
  const [UpdatedUserId, setUpdatedUserId] = useState([]);
  const [UpdatedDate, setUpdatedDate] = useState([]);
  const [CreatedDate, setCreatedDate] = useState([]);
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
      await axios.post("https://localhost:7264/api/Product/AddProduct", {
        
        Name: Name,
        Description : Description,
        Status : Status,
        CreatedUserId: CreatedUserId,
          UpdatedUserId: UpdatedUserId,
          CreatedDate: CreatedDate,
          UpdatedDate: UpdatedDate

      
      });
      alert("Category Registation Successfully");
          setCategoryId("");
          setName("");
          setDescription("");
          setStatus("");
          setUpdatedUserId();
    setCreatedUserId();
    setCreatedDate();
    setUpdatedDate();
      
    
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
    setUpdatedUserId("categorys.UpdatedUser");
    setCreatedUserId("categorys.CreatedUser");
    setUpdatedDate("categorys.UpdatedDate");
    setCreatedDate("categorys.CreatedDate");

  }

  async function DeleteCategory(id) {
    await axios.delete("https://localhost:7264/api/Category/DeleteCategory/" + id);
    alert("Employee deleted Successfully");
    setCategoryId();
    setName();
    setDescription();
    setStatus();
    setUpdatedUserId();
    setCreatedUserId();
    setCreatedDate();
    setUpdatedDate();

    Load();
  }

  

  return (
    <>
      <br></br>
      <br></br>
      <h1>Category Details</h1>
      <br></br>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th scope="col">CategoryId</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">UpdatedDate</th>
            <th scope="col">CreatedDate</th>
            <th scope="col">UpdatedUserId</th>
            <th scope="col">CreatedUserId</th>

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
                <td>{category.UpdatedDate}</td>
                <td>{category.CreatedDate}</td>
                <td>{category.UpdatedUserId}</td>
                <td>{category.CreatedUserId}</td>

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
                    onClick={() => DeleteCategory(category.id)}
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

export default Category;