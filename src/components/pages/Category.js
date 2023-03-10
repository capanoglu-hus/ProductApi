import axios from "axios";
import { useEffect, useState  } from "react";
import Table from 'react-bootstrap/Table';

import React from "react";



function Category() {
  const [categorys, setCategorys] = useState([]);
  
  useEffect(() => {
    axios.get("https://localhost:7264/api/Category/GetCategory").then((response) => {
      setCategorys((existingData) => {
        console.log(response.data)
        return response.data;
      });
  });
}, []);






  return (
    <>
      <br></br>
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
              <td>{cat.updatedUserId}</td>
              <td>{cat.createdUserId}</td>


            </tr>
          ))}
        </tbody>

      </Table>

    </>
  );
}


export default Category;