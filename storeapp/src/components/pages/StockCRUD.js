import axios from "axios";
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function StockCRUD() {

  const [stockId, setStockId] = useState("");
  const [product_id, setProduct_id] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState(true);
  const [createUserId, setCreateUserId] = useState([]);
  const [updateUserId, setUpdateUserId] = useState([]);

  const [stocks, setStocks] = useState([]);

  let tokenjwt = sessionStorage.getItem('tokenjwt');

let user = sessionStorage.getItem('UserId');

  const dataPost = {

    product_id: product_id,
    status: status,
    quantity: quantity,
    createUserId: createUserId,
    updateUserId: updateUserId,
  }
  const dataUpdated = {
    stockId: stockId,
    product_id: product_id,
    status: status,
    quantity: quantity,
    createUserId: createUserId,
    updateUserId: updateUserId,

  }

  useEffect(() => {
    (async () => await Load())();
  }, []);
  async function Load() {

    const result = await axios.get("https://localhost:7264/api/Stock/GetStock", {
      headers: {
        'Authorization': 'bearer ' + tokenjwt
      }

    });
    setStocks(result.data);

  }


  async function save(event) {


    event.preventDefault();
    try {

      await axios.post("https://localhost:7264/api/Stock/AddStock", dataPost, {
        headers: {
          'Authorization': 'bearer ' + tokenjwt
        }
      }

      );
      alert("Stock Registation Successfully");

      setProduct_id("");
      setQuantity("");

      setStatus("");

      setUpdateUserId("");
      setCreateUserId("");



      Load();
    } catch (err) {
      alert(err);
    }
  }
  async function editStock(stocks) {
    setStockId(stocks.stockId);
    setProduct_id(stocks.product_id);
    setQuantity(stocks.quantity);
    setStatus(stocks.status);
    setUpdateUserId(stocks.updateUserId);
    setCreateUserId(stocks.createUserId);


  }

  async function DeleteStock(stockId) {
    console.log("denmee");
    await axios.delete("https://localhost:7264/api/Stock/DeleteStock/" + stockId, {
      headers: {
        'Authorization': 'bearer ' + tokenjwt
      }
    });
    alert("Stock deleted Successfully");
   
    setStockId("");
    setProduct_id("");
    setQuantity("");

    setStatus("");

    setUpdateUserId("");
    setCreateUserId("");

    Load();
  }

  async function update(event) {

    event.preventDefault();
    try {
      await axios.patch("https://localhost:7264/api/Stock/UpdateStock/" + stocks.find((u) => u.stockId === stockId).stockId || stockId, dataUpdated, {
        headers: {
          'Authorization': 'bearer ' + tokenjwt
        }

      }

      );
      alert("product Updated");
      setStockId();
      setProduct_id();
      setQuantity();
  
      setStatus();
  
      setUpdateUserId();
      setCreateUserId();
  

      Load();
    } catch (err) {
      alert(err);
    }
  }




  return (
    <>
      <br></br>
      <h1> &nbsp; Stock Transactions</h1>
      <br></br>
      <br></br>
      <Form>
        <Row> &nbsp;&nbsp;
          <Form.Group as={Col} >
            <Form.Label>stockId</Form.Label>
            <Form.Control placeholder="stockId" id="id"

              value={stockId}
              onChange={(event) => {
                setStockId(event.target.value);
              }} />
          </Form.Group>

          <Form.Group as={Col} >
            <Form.Label>product_Id</Form.Label>
            <Form.Control placeholder="product_Id" id="id"
              value={product_id}
              onChange={(event) => {
                setProduct_id(event.target.value);
              }} />
          </Form.Group>

        </Row>
        <Row> &nbsp;&nbsp;
          <Form.Group as={Col} >
            <Form.Label>status</Form.Label>
            <Form.Control placeholder="status" id="id"
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
              }} />
          </Form.Group>

          <Form.Group as={Col} >
            <Form.Label>quantity </Form.Label>
            <Form.Control placeholder="quantity"
              id="quantity"
              value={quantity}
              onChange={(event) => {
                setQuantity(event.target.value);
              }} />
          </Form.Group>



        </Row>
        <Row> &nbsp;&nbsp;

          <Form.Group as={Col} >
            <Form.Label>UpdatedUserId</Form.Label>
            <Form.Control placeholder="UpdatedUserId" id="UpdatedUserId"
              value={user}
              onChange={(event) => {
                setUpdateUserId(user);
              }} />
          </Form.Group>
          <Form.Group as={Col} >
            <Form.Label>CreatedUserId</Form.Label>
            <Form.Control placeholder="CreatedUserId" id="CreatedUserId"
              value={user}
              onChange={(event) => {
                setCreateUserId(user);
              }} />
          </Form.Group>

        </Row>
        <div> &nbsp;
          <button className="btn btn-success mt-4" onClick={save}>
            SAVE
          </button>&nbsp;
          <button className="btn btn-primary mt-4" onClick={update}>
            UPDATE
          </button>
        </div>
      </Form>
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
            <th >
              Option
            </th>

          </tr>
        </thead>

        <tbody >
          {
            stocks.map((stck) => (
              <tr key={stck.stockId}>
                <td >{stck.stockId}</td>
                <td>{stck.product_id}</td>
                <td>{stck.quantity}</td>
                <td>{stck.status}</td>
                <td>{stck.updatedDate}</td>
                <td>{stck.createdDate}</td>
                <td>{stck.updateUserId}</td>
                <td>{stck.createUserId}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editStock(stck)}
                  >
                    Edit
                  </button> &nbsp;
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteStock(stck.stockId)}
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

export default StockCRUD;
