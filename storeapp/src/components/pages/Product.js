import axios from "axios";
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';

import React from "react";

function Product() {
  const [products, setProducts] = useState([]);
  let tokenjwt = sessionStorage.getItem('tokenjwt');

  useEffect(() => {
    axios.get("https://localhost:7264/api/Product/GetProduct",{
      headers:{
        'Authorization' : 'bearer ' + tokenjwt
      }}).then((response) => {
      
      setProducts((existingData) => {
        
        console.log(response.data)
        return response.data;
      });
      
      
    });
  }, []);

  


  return (
    <>
      <br></br>
      <br></br>
      <h1>Product Details</h1>
      <br></br>
      <br></br>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th >
              ProductId
            </th>
            <th >
              Name
            </th>
            <th >
              Description
            </th>
            <th >
              Price
            </th>
            <th >
              Status
            </th>
            
            <th >
              CategoryId
            </th>
            <th >
              CategoryName
            </th>
         
            <th >
              IsApproved
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
            products.map((pro) => (
              <tr key={pro.productId}>
                <td >{pro.productId}</td>
                <td>{pro.name}</td>
                <td>{pro.description}</td>
                <td>{pro.price}</td>
                <td>{pro.status}</td>
                <td>{pro.category_Id}</td>
                <td>{pro.categoryName}</td>
                <td>{pro.isApproved}</td>
                <td>{pro.updatedDate}</td>
                <td>{pro.createdDate}</td>
                <td>{pro.createUserId}</td>
                <td>{pro.updateUserId}</td>
                
              </tr>
            ))}
          </tbody>
         
      </Table>

    </>
  );
}


export default Product;