import axios from "axios";
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';

import React from "react";

function Stock() {
  const [stocks, setStocks] = useState([]);
  useEffect(() => {
    axios.get("https://localhost:7264/api/Stock/GetStock").then((response) => {
      setStocks((existingData) => {
        console.log(response.data)
        return response.data;
      });
  });
}, []);






  return (
    <>
      <br></br>
      <br></br>
      <h1>Stock Details</h1>
      <br></br>
      <br></br>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th >
              StockId
            </th>
            <th >
              ProductId
            </th>
            <th >
              ProductName
            </th>
            <th >
              Quantity
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
          stocks.map((stck) => (
            <tr key={stck.stockId}>
              <td >{stck.stockId}</td>
              <td>{stck.product_id}</td>
              <td>{stck.productName}</td>
              <td>{stck.quantity}</td>
              <td>{stck.status}</td>
              <td>{stck.updatedDate}</td>
              <td>{stck.createdDate}</td>
              <td>{stck.updateUserId}</td>
              <td>{stck.createUserId}</td>


            </tr>
          ))}
        </tbody>

      </Table>

    </>
  );
}


export default Stock;