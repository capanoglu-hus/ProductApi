import axios from "axios";
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function StockCRUD() {

  const [StockId, setStockId] = useState("");
  const [Product_id, setProduct_id] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Status, setStatus] = useState([]);
  const [CreatedUserId, setCreatedUserId] = useState([]);
  const [UpdatedUserId, setUpdatedUserId] = useState([]);
  const [CreatedDate, setCreatedDate] = useState([]);
  const [UpdatedDate, setUpdatedDate] = useState([]);
  const [stocks, setUsers] = useState([]);
  useEffect(() => {
    (async () => await Load())();
  }, []);
  async function Load() {

    const result = await axios.get("https://localhost:7264/api/Stock/GetStock");
    setUsers(result.data);
    console.log(result.data);
  }
  async function save(event) {

    event.preventDefault();
    try {
      await axios.post("https://localhost:7264/api/Stock/AddStock", {

        StockId: StockId,
        Product_id: Product_id,
        Quantity: Quantity,
        Status: Status,
        CreatedUserId: CreatedUserId,
        UpdatedUserId: UpdatedUserId,
        CreatedDate: CreatedDate,
        UpdatedDate: UpdatedDate


      });
      alert("Stock Registation Successfully");
      setStockId("");
      setProduct_id("");
      setQuantity("");
      setStatus("");
      setUpdatedUserId("");
      setCreatedUserId("");
      setCreatedDate("");
      setUpdatedDate("");

      Load();
    } catch (err) {
      alert(err);
    }
  }

  async function editStock(stocks) {
    setStockId("stocks.CategoryId");
    setProduct_id("stocks.Product_id");
    setQuantity("stocks.Quantity");
    setStatus("stocks.Status");
    setUpdatedUserId("stocks.UpdatedUserId");
    setCreatedUserId("stocks.CreatedUserId");
    setCreatedDate("stocks.CreatedDate");
    setUpdatedDate("stocks.UpdatedDate");

  }

  async function DeleteStock(id) {
    await axios.delete("https://localhost:7264/api/Stock/DeleteStock/" + id);
    alert("Employee deleted Successfully");
    setStockId();
    setProduct_id();
    setQuantity();
    setStatus();
    setUpdatedUserId();
    setCreatedUserId();
    setCreatedDate();
    setUpdatedDate();

    Load();
  }

  async function update(event) {
    event.preventDefault();
    try {

      await axios.patch("https://localhost:7264/api/Stock/UpdateStock/" + stocks.find((u) => u.StockId === StockId).StockId || StockId,
        {
          StockId: StockId,
          Product_id: Product_id,
          Quantity: Quantity,
          Status: Status,
          CreatedUserId: CreatedUserId,
          UpdatedUserId: UpdatedUserId,
          CreatedDate: CreatedDate,
          UpdatedDate: UpdatedDate
        }
      );
      alert("Registation Updateddddd");
      setStockId();
      setProduct_id();
      setQuantity();
      setStatus();
      setUpdatedUserId();
      setCreatedUserId();
      setCreatedDate();
      setUpdatedDate();


      Load();
    } catch (err) {
      alert(err);
    }
  }

  return (
    <>
    <h1>Stock Details</h1>
    <Form>
      <Row>
        <Form.Group as={Col} >
          <Form.Label>StockId</Form.Label>
          <Form.Control placeholder="StockId" id="id"

            value={StockId}
            onChange={(event) => {
              setStockId(event.target.value);
            }} />
        </Form.Group>

        <Form.Group as={Col} >
          <Form.Label>Product_id</Form.Label>
          <Form.Control placeholder="Product_id" id="id"
            value={Product_id}
            onChange={(event) => {
              setProduct_id(event.target.value);
            }} />
        </Form.Group>

      </Row>
      <Row>
        <Form.Group className="mb-3" >
          <Form.Label>Quantity</Form.Label>
          <Form.Control placeholder="Quantity" id="id"
            value={Quantity}
            onChange={(event) => {
              setQuantity(event.target.value);
            }} />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} >
          <Form.Label> Status </Form.Label>
          <Form.Control placeholder="Status"
            id="Status"
            value={Status}
            onChange={(event) => {
              setStatus(event.target.value);
            }} />
        </Form.Group>


        <Form.Group as={Col} >
          <Form.Label>UpdatedUserId</Form.Label>
          <Form.Control placeholder="createdDate" id="createdDate"
            value={CreatedDate}
            onChange={(event) => {
              setCreatedDate(event.target.value);
            }} />
        </Form.Group>
        <Form.Group as={Col} >
          <Form.Label>CreatedUserId</Form.Label>
          <Form.Control placeholder="CreatedUserId" id="CreatedUserId"
            value={CreatedUserId}
            onChange={(event) => {
              setCreatedUserId(event.target.value);
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
          <th scope="col">StockId</th>
          <th scope="col">Product_id</th>
          <th scope="col">Quantity</th>
          <th scope="col">Status</th>
          <th scope="col">CreatedUserId</th>
          <th scope="col">createdUser</th>

          <th scope="col">Option</th>
        </tr>
      </thead>
      {stocks.map(function fn(stock) {
        return (
          <tbody>
            <tr>
              <th scope="row">{stock.StockId} </th>
              <td>{stock.Product_id}</td>
              <td>{stock.Quantity}</td>
              <td>{stock.Status}</td>
              <td>{stock.CreatedUserId}</td>
              <td>{stock.createdUser}</td>
           

              <td>
                <button
                  type="button"
                  class="btn btn-warning"
                  onClick={() => editStock(stock)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => DeleteStock(stock.id)}
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

export default StockCRUD;