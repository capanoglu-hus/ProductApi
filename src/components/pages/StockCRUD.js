import axios from "axios";
import {  useState , useEffect} from "react";


import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function StockCRUD() {

  const [stockId, setstockId] = useState("");
  const [product_Id, setproduct_Id] = useState("");
  const [quantity, setquantity] = useState("");
  const [status, setstatus] = useState([]);
  const [createUserId, setcreateUserId] = useState([]);
  const [updateUserId, setupdateUserId] = useState([]);
  const [createdDate, setcreatedDate] = useState([]);
  const [updatedDate, setupdatedDate] = useState([]);
  const [stocks,setStocks] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);
  async function Load() {

    const result = await axios.get("https://localhost:7264/api/Product/GetProduct");
    setStocks(result.data);
    console.log(result.data);
  }
  async function save(event) {
    
    console.log("sdfsdfs");
    event.preventDefault();
    try {
      console.log("sdfsdfs");
      await axios.post("https://localhost:7264/api/Stock/AddStock", {
        
        stockId: stockId,
        product_Id :product_Id,
        status: status,
        quantity : quantity,
        createUserId: createUserId,
        updateUserId: updateUserId,
        createdDate: createdDate,
        updatedDate: updatedDate
      });
      alert("product Registation Successfully");
      setstockId("");
      setproduct_Id("");
      setquantity("");
   
      setstatus("");
     
      setupdateUserId("");
      setcreateUserId("");
      setcreatedDate("");
      setupdatedDate("");

    
      Load();
    } catch (err) {
      alert(err);
    }
  }
  



  async function DeleteProduct(id) {
    await axios.delete("https://localhost:7264/api/Stock/DeleteStock/" + id);
    alert("Employee deleted Successfully");
    setstockId();
    setproduct_Id();
    setquantity();
   
    setstatus();
   
    setupdateUserId();
    setcreateUserId();
    setcreatedDate();
    setupdatedDate();
    Load();
  }

  async function update(event) {
    event.preventDefault();
    try {

      await axios.patch("https://localhost:7264/api/Product/UpdateProduct/" + stocks.find((u) => u.stockId === stockId).stockId || stockId,
        {
          stockId: stockId,
          product_Id :product_Id,
          status: status,
          quantity : quantity,
          createUserId: createUserId,
          updateUserId: updateUserId,
          createdDate: createdDate,
          updatedDate: updatedDate
        }
      );
      alert("Registation Updateddddd");
      setstockId();
      setproduct_Id();
      setquantity();
      setstatus();
     
      setupdateUserId();
      setcreateUserId();
      setcreatedDate();
      setupdatedDate();

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
                setstockId(event.target.value);
              }} />
          </Form.Group>

          <Form.Group as={Col} >
            <Form.Label>product_Id</Form.Label>
            <Form.Control placeholder="product_Id" id="id"
              value={product_Id}
              onChange={(event) => {
                setproduct_Id(event.target.value);
              }} />
          </Form.Group>

        </Row>
        <Row>
          <Form.Group className="mb-3" >
            <Form.Label>status</Form.Label>
            <Form.Control placeholder="status" id="id"
              value={status}
              onChange={(event) => {
                setstatus(event.target.value);
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
                setquantity(event.target.value);
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
                setupdatedDate(event.target.value);
              }} />
          </Form.Group>


          <Form.Group as={Col} >
            <Form.Label>CreatedDate</Form.Label>
            <Form.Control placeholder="CreatedDate" id="CreatedDate"
              value={createdDate}
              onChange={(event) => {
                setcreatedDate(event.target.value);
              }} />
          </Form.Group>
          <Form.Group as={Col} >
            <Form.Label>UpdatedUserId</Form.Label>
            <Form.Control placeholder="UpdatedUserId" id="UpdatedUserId"
              value={updateUserId}
              onChange={(event) => {
                setupdateUserId(event.target.value);
              }} />
          </Form.Group>
          <Form.Group as={Col} >
            <Form.Label>CreatedUserId</Form.Label>
            <Form.Control placeholder="CreatedUserId" id="CreatedUserId"
              value={createUserId}
              onChange={(event) => {
                setcreateUserId(event.target.value);
              }} />
          </Form.Group>

        </Row>
        <div>
            <button class="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
            <button  class="btn btn-secondary mt-4" onClick={update}>
              Update
            </button>
          </div>
      </Form>
      <br></br>
      <br></br>
      <br></br>
      
    </>

  );
}

export default StockCRUD;