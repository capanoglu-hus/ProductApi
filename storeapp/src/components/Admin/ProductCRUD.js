import axios from "axios";
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function ProductCRUD() {

  const [ProductId, setProductId] = useState("");
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState([]);
  const [Status, setStatus] = useState([]);
  const [IsApproved, setIsApproved] = useState([]);
  const [CategoryId, setCategoryId] = useState([]);
  const [products, setUsers] = useState([]);
  const [CreatedUserId, setCreatedUserId] = useState([]);
  const [UpdatedUserId, setUpdatedUserId] = useState([]);
  const [CreatedDate, setCreatedDate] = useState([]);
  const [UpdatedDate, setUpdatedDate] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);
  async function Load() {

    const result = await axios.get("https://localhost:7264/api/Product/GetProduct");
    setUsers(result.data);
    console.log(result.data);
  }
  async function save(event) {

    event.preventDefault();
    try {
      await axios.post("https://localhost:7264/api/Product/AddProduct", {

        Name: Name,
        Description: Description,
        Price: Price,
        Status: Status,
        IsApproved: IsApproved,
        CategoryId: CategoryId,
        CreatedUserId: CreatedUserId,
        UpdatedUserId: UpdatedUserId,
        CreatedDate: CreatedDate,
        UpdatedDate: UpdatedDate
      });
      alert("product Registation Successfully");
      setProductId("");
      setName("");
      setDescription("");
      setPrice("");
      setStatus("");
      setIsApproved("");
      setCategoryId("");
      setUpdatedUserId();
      setCreatedUserId();
      setCreatedDate();
      setUpdatedDate();


      Load();
    } catch (err) {
      alert(err);
    }
  }

  async function editProduct(products) {
    setProductId("products.ProductId");
    setName("products.Name");
    setDescription("products.Description");
    setPrice("products.Price");
    setStatus("products.Status");
    setIsApproved("products.IsApproved");
    setCategoryId("products.CategoryId");
    setUpdatedUserId("products.UpdatedUserId");
    setCreatedUserId("products.CreatedUserId");
    setCreatedDate("products.CreatedDate");
    setUpdatedDate("products.UpdatedDate");

  }

  async function DeleteProduct(id) {
    await axios.delete("https://localhost:7264/api/Product/DeleteProduct/" + id);
    alert("Employee deleted Successfully");
    setProductId();
    setName();
    setDescription();
    setPrice();
    setStatus();
    setIsApproved();
    setCategoryId();
    setUpdatedUserId();
    setCreatedUserId();
    setCreatedDate();
    setUpdatedDate();
    Load();
  }

  async function update(event) {
    event.preventDefault();
    try {

      await axios.patch("https://localhost:7264/api/Product/UpdateProduct/" + products.find((u) => u.ProductId === ProductId).ProductId || ProductId,
        {
          ProductId: ProductId,
          Name: Name,
          Description: Description,
          Price: Price,
          Status: Status,
          IsApproved: IsApproved,
          CategoryId: CategoryId,
          CreatedUserId: CreatedUserId,
          UpdatedUserId: UpdatedUserId,
          CreatedDate: CreatedDate,
          UpdatedDate: UpdatedDate
        }
      );
      alert("Registation Updateddddd");
      setProductId();
      setName();
      setDescription();
      setPrice();
      setStatus();
      setIsApproved();
      setCategoryId();
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
      <h1>Product Details</h1>
      <Form>
        <Row>
          <Form.Group as={Col} >
            <Form.Label>ProductId</Form.Label>
            <Form.Control placeholder="productId" id="id"

              value={ProductId}
              onChange={(event) => {
                setProductId(event.target.value);
              }} />
          </Form.Group>

          <Form.Group as={Col} >
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Name" id="id"
              value={Name}
              onChange={(event) => {
                setName(event.target.value);
              }} />
          </Form.Group>

        </Row>
        <Row>
          <Form.Group className="mb-3" >
            <Form.Label>Description</Form.Label>
            <Form.Control placeholder="Description" id="id"
              value={Description}
              onChange={(event) => {
                setDescription(event.target.value);
              }} />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} >
            <Form.Label>Price </Form.Label>
            <Form.Control placeholder="price"
              id="Price"
              value={Price}
              onChange={(event) => {
                setPrice(event.target.value);
              }} />
          </Form.Group>


          <Form.Group as={Col} >
            <Form.Label>Status</Form.Label>
            <Form.Control placeholder="status" id="Status"
              value={Status}
              onChange={(event) => {
                setStatus(event.target.value);
              }} />
          </Form.Group>
          <Form.Group as={Col} >
            <Form.Label>CategoryId</Form.Label>
            <Form.Control placeholder="status" id="CategoryId"
              value={CategoryId}
              onChange={(event) => {
                setCategoryId(event.target.value);
              }} />
          </Form.Group>

        </Row>
        <Row>
          <Form.Group as={Col} >
            <Form.Label>UpdatedDate </Form.Label>
            <Form.Control placeholder="UpdatedDate"
              id="UpdatedDate"
              value={UpdatedDate}
              onChange={(event) => {
                setUpdatedDate(event.target.value);
              }} />
          </Form.Group>


          <Form.Group as={Col} >
            <Form.Label>CreatedDate</Form.Label>
            <Form.Control placeholder="CreatedDate" id="CreatedDate"
              value={CreatedDate}
              onChange={(event) => {
                setCreatedDate(event.target.value);
              }} />
          </Form.Group>
          <Form.Group as={Col} >
            <Form.Label>UpdatedUserId</Form.Label>
            <Form.Control placeholder="UpdatedUserId" id="UpdatedUserId"
              value={UpdatedUserId}
              onChange={(event) => {
                setUpdatedUserId(event.target.value);
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
            <th scope="col">product Id</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">Price</th>
            <th scope="col">IsApproved</th>
            <th scope="col">CategoryId</th>
            <th scope="col">CreatedUserId</th>
            <th scope="col">UpdatedUserId</th>
            <th scope="col">UpdatedDate</th>
            <th scope="col">CreatedDate</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        {products.map(function fn(product) {
          return (
            <tbody>
              <tr>
                <th scope="row">{product.ProductId} </th>
                <td>{product.Name}</td>
                <td>{product.Description}</td>
                <td>{product.Status}</td>
                <td>{product.Price}</td>
                <td>{product.IsApproved}</td>
                <td>{product.CategoryId}</td>
                <td>{product.CreatedDate}</td>
                <td>{product.UpdatedDate}</td>
                <td>{product.CreatedUserId}</td>
                <td>{product.UpdatedUserId}</td>

                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteProduct(product.id)}
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

export default ProductCRUD;