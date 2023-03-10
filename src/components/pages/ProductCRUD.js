import axios from "axios";
import {  useState , useEffect} from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function ProductCRUD() {

  const [productId, setproductId] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState([]);
  const [status, setstatus] = useState([]);
  const [isApproved, setisApproved] = useState([]);
  const [category_Id, setcategory_Id] = useState([]);
  const [products, setProducts] = useState([]);
  const [createUserId, setcreateUserId] = useState([]);
  const [updateUserId, setupdateUserId] = useState([]);
  const [createdDate, setcreatedDate] = useState([]);
  const [updatedDate, setupdatedDate] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);
  async function Load() {

    const result = await axios.get("https://localhost:7264/api/Product/GetProduct");
    setProducts(result.data);
    console.log(result.data);
  }
  async function save(event) {
    
    console.log("sdfsdfs");
    event.preventDefault();
    try {
      console.log("sdfsdfs");
      await axios.post("https://localhost:7264/api/Product/AddProduct", {
        
        productId :productId,
        name: name,
        description: description,
        status: status,
        price: price,
        isApproved: isApproved,
        category_Id: category_Id,
        createUserId: createUserId,
        updateUserId: updateUserId,
        createdDate: createdDate,
        updatedDate: updatedDate
      });
      alert("product Registation Successfully");
      setproductId("");
      setname("");
      setdescription("");
      setprice("");
      setstatus("");
      setisApproved("");
      setcategory_Id("");
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
    await axios.delete("https://localhost:7264/api/Product/DeleteProduct/" + id);
    alert("Employee deleted Successfully");
    setproductId("");
      setname("");
      setdescription("");
      setprice("");
      setstatus("");
      setisApproved("");
      setcategory_Id("");
      setupdateUserId("");
      setcreateUserId("");
      setcreatedDate("");
      setupdatedDate("");
    Load();
  }

  async function update(event) {
    event.preventDefault();
    try {

      await axios.patch("https://localhost:7264/api/Product/UpdateProduct/" + products.find((u) => u.productId === productId).ProductId || productId,
        {
          productId :productId,
          name: name,
          description: description,
          price: price,
          status: status,
          isApproved: isApproved,
          category_Id: category_Id,
          createUserId: createUserId,
          updateUserId: updateUserId,
          createdDate: createdDate,
          updatedDate: updatedDate
        }
      );
      alert("Registation Updateddddd");
      setproductId();
      setname();
      setdescription();
      setprice();
      setstatus();
      setisApproved();
      setcategory_Id();
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
      <h1>Product Add</h1>
      <br></br>
      <br></br>
      <Form>
        <Row>
          <Form.Group as={Col} >
            <Form.Label>ProductId</Form.Label>
            <Form.Control placeholder="productId" id="id"

              value={productId}
              onChange={(event) => {
                setproductId(event.target.value);
              }} />
          </Form.Group>

          <Form.Group as={Col} >
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Name" id="id"
              value={name}
              onChange={(event) => {
                setname(event.target.value);
              }} />
          </Form.Group>

        </Row>
        <Row>
          <Form.Group className="mb-3" >
            <Form.Label>Description</Form.Label>
            <Form.Control placeholder="Description" id="id"
              value={description}
              onChange={(event) => {
                setdescription(event.target.value);
              }} />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} >
            <Form.Label>Price </Form.Label>
            <Form.Control placeholder="price"
              id="Price"
              value={price}
              onChange={(event) => {
                setprice(event.target.value);
              }} />
          </Form.Group>


          <Form.Group as={Col} >
            <Form.Label>Status</Form.Label>
            <Form.Control placeholder="status" id="Status"
              value={status}
              onChange={(event) => {
                setstatus(event.target.value);
              }} />
          </Form.Group>
          <Form.Group as={Col} >
            <Form.Label>CategoryId</Form.Label>
            <Form.Control placeholder="status" id="CategoryId"
              value={category_Id}
              onChange={(event) => {
                setcategory_Id(event.target.value);
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
            <button class="btn btn-secondary mt-4" onClick={update}>
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

export default ProductCRUD;