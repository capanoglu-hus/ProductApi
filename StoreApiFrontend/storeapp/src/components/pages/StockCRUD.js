import axios from "axios";
import {  useState , useEffect} from "react";
import Table from 'react-bootstrap/Table';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function StockCRUD() {

  const [stockId, setStockId] = useState("");
  const [product_id, setProduct_id] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState([]);
  const [createUserId, setCreateUserId] = useState([]);
  const [updateUserId, setUpdateUserId] = useState([]);
  const [createdDate, setCreatedDate] = useState([]);
  const [updatedDate, setUpdatedDate] = useState([]);
  const [stocks,setStocks] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);
  async function Load() {

    const result = await axios.get("https://localhost:7264/api/Stock/GetStock");
    setStocks(result.data);

  }

 
  async function save(event) {
    
   
    event.preventDefault();
    try {
     
      await axios.post("https://localhost:7264/api/Stock/AddStock", {
        
        stockId: stockId,
        product_id :product_id,
        status: status,
        quantity : quantity,
        createUserId: createUserId,
        updateUserId: updateUserId,
        createdDate: createdDate,
        updatedDate: updatedDate
      });
      alert("Stock Registation Successfully");
      setStockId("");
      setProduct_id("");
      setQuantity("");
   
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
  async function editStock(stocks) {
    setStockId(stocks.stockId);
    setProduct_id(stocks.product_id);
    setQuantity(stocks.quantity);
    setStatus(stocks.status);
    setUpdateUserId(stocks.updateUserId);
    setCreateUserId(stocks.createUserId);
    setCreatedDate(stocks.createdDate);
    setUpdatedDate(stocks.updatedDate);

  }

  async function DeleteStock(stockId) {
    console.log("denmee");
    await axios.delete("https://localhost:7264/api/Stock/DeleteStock/" + stockId);
    alert("Stock deleted Successfully");
    console.log("denmee");
    setStockId("");
      setProduct_id("");
      setQuantity("");
   
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
      await axios.put("https://localhost:7264/api/Stock/UpdateStock" + stocks.find((u) => u.stockId === stockId).stockId || stockId,
        {
          stockId: stockId,
        product_id :product_id,
        status: status,
        quantity : quantity,
        createUserId: createUserId,
        updateUserId: updateUserId,
        createdDate: createdDate,
        updatedDate: updatedDate

        }
      );
      alert("Registation Updateddddd");
      setStockId("");
      setProduct_id("");
      setQuantity("");
   
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
      <h1>Stock Add</h1>
      <br></br>
      <br></br>
      <Form>
        <Row>
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
        <Row>
          <Form.Group className="mb-3" >
            <Form.Label>status</Form.Label>
            <Form.Control placeholder="status" id="id"
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
              }} />
          </Form.Group>
        </Row>
        <Row>
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
            <Form.Label>UpdatedUserId</Form.Label>
            <Form.Control placeholder="UpdatedUserId" id="UpdatedUserId"
              value={updateUserId}
              onChange={(event) => {
                setUpdateUserId(event.target.value);
              }} />
          </Form.Group>
          <Form.Group as={Col} >
            <Form.Label>CreatedUserId</Form.Label>
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
            <button  className="btn btn-secondary mt-4" onClick={update}>
              Update
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
                  </button>
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