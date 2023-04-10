import axios from "axios";
import { useState, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';


function ProductCRUD() {

  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState([]);
  const [status, setStatus] = useState([]);
  const [isApproved, setIsApproved] = useState(true);
  const [category_Id, setCategory_Id] = useState([]);
  const [products, setProducts] = useState([]);
  const [createUserId, setCreateUserId] = useState([]);
  const [updateUserId, setUpdateUserId] = useState([]);
  const [createdDate, setCreatedDate] = useState([]);
  const [updatedDate, setUpdatedDate] = useState([]);

  let tokenjwt = sessionStorage.getItem('tokenjwt');

  
 
  const dataPost = {
 
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
  const dataUpdated = {
    productId:productId,
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

  useEffect(() => {
    (async () => await Load())();
  }, []);
  async function Load() {

    const result = await axios.get("https://localhost:7264/api/Product/GetProduct", {
      headers: {
        'Authorization': 'bearer ' + tokenjwt
      }

    });
    setProducts(result.data);

  }

  async function save(event) {
     event.preventDefault();
    try {
      await axios.post("https://localhost:7264/api/Product/AddProduct", dataPost , {
        headers: {
          'Authorization': 'bearer ' + tokenjwt
        }
      } );
      alert("product Registation Successfully");
      setName("");
      setDescription("");
      setPrice("");
      setStatus("");
      setIsApproved("");
      setCategory_Id("");
      setUpdateUserId("");
      setCreateUserId("");
      setCreatedDate("");
      setUpdatedDate("");



      Load();
    } catch (err) {
      alert(err);
    }
  }
  async function editProduct(products) {
    setProductId(products.productId);
    setName(products.name);
    setDescription(products.description);
    setPrice(products.price);
    setStatus(products.status);
    setIsApproved(products.isApproved);
    setCategory_Id(products.category_Id);
    setUpdateUserId(products.updateUserId);
    setCreateUserId(products.createUserId);
    setCreatedDate(products.createdDate);
    setUpdatedDate(products.updatedDate);
  }




  async function DeleteProduct(productId) {
    await axios.delete("https://localhost:7264/api/Product/DeleteProduct/" + productId, {
      headers: {
        'Authorization': 'bearer ' + tokenjwt
      }
    });
    alert("Product deleted Successfully");
    setProductId("");
    setName("");
    setDescription("");
    setPrice("");
    setStatus("");
    setIsApproved("");
    setCategory_Id("");
    setUpdateUserId("");
    setCreateUserId("");
    setCreatedDate("");
    setUpdatedDate("");
    Load();
  }

  async function update(event) {
   
    event.preventDefault();
    try {
       await axios.patch("https://localhost:7264/api/Product/UpdateProduct/" + products.find((u) => u.productId === productId).productId || productId , dataUpdated ,{
        headers: {
          'Authorization': 'bearer ' + tokenjwt
        }
        
      }

      );
      alert("product Updated");
      setProductId();
      setName();
      setDescription();
      setPrice();
      setStatus();

      setIsApproved();
      setCategory_Id();
      setUpdateUserId();
      setCreateUserId();
      setCreatedDate();
      setUpdatedDate();

      Load();
    } catch (err) {
      alert(err);
    }
  }








  return (
    <>
      <br></br>
      <h1>&nbsp; Product Transactions</h1>
      <br></br>
      <br></br>
      <Form>
        <Row> &nbsp;&nbsp;
          <Form.Group as={Col} >
            <Form.Label>ProductId</Form.Label>
            <Form.Control placeholder="productId" id="id"

              value={productId}
              onChange={(event) => {
                setProductId(event.target.value);
              }} />
          </Form.Group>

          <Form.Group as={Col} >
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Name" id="id"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }} />
          </Form.Group>


          <Form.Group as={Col} >
            <Form.Label>Description</Form.Label>
            <Form.Control placeholder="Description" id="id"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }} />
          </Form.Group>
        </Row>
        <Row> &nbsp;&nbsp;
          <Form.Group as={Col} >
            <Form.Label>Price </Form.Label>
            <Form.Control placeholder="price"
              id="Price"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }} />
          </Form.Group>


          <Form.Group as={Col} >
            <Form.Label>Status</Form.Label>
            <Form.Control placeholder="status" id="Status"

              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
              }} />
          </Form.Group>
          <Form.Group as={Col} >
            <Form.Label>IsApproved</Form.Label>
            <Form.Control placeholder="IsApproved" id="IsApproved"

              value={isApproved}
              onChange={(event) => {
                setIsApproved(event.target.value);
              }} />

          </Form.Group>
          <Form.Group as={Col} >
            <Form.Label>CategoryId</Form.Label>
            <Form.Control placeholder="status" id="CategoryId"
              value={category_Id}
              onChange={(event) => {
                setCategory_Id(event.target.value);
              }} />
          </Form.Group>

        </Row>
        <Row> &nbsp;&nbsp;
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
            <Form.Label>UpdateUserId</Form.Label>
            <Form.Control placeholder="UpdatedUserId" id="UpdatedUserId"
              value={updateUserId}
              onChange={(event) => {
                setUpdateUserId(event.target.value);
              }} />
          </Form.Group>
          <Form.Group as={Col} >
            <Form.Label>CreateUserId</Form.Label>
            <Form.Control placeholder="CreatedUserId" id="CreatedUserId"
              value={createUserId}
              onChange={(event) => {
                setCreateUserId(event.target.value);
              }} />
          </Form.Group>

        </Row>
        <div> &nbsp;
          <button className="btn btn-success mt-4" onClick={save}>
            SAVE
          </button> &nbsp;
          <button className="btn btn-primary mt-4" onClick={update}>
            UPDATE
          </button>
        </div>
      </Form>
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
              IsApproved
            </th>
            <th >
              CategoryId
            </th>
            <th >
              UpdatedDate
            </th>
            <th >
              CreatedDate
            </th>

            <th >
              CreatedUserId
            </th>
            <th >
              UpdatedUserId
            </th>

            <th >
              Option
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
                <td>{pro.isApproved}</td>
                <td>{pro.category_Id}</td>
                <td>{pro.updatedDate}</td>
                <td>{pro.createdDate}</td>
                <td>{pro.createUserId}</td>
                <td>{pro.updateUserId}</td>

                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editProduct(pro)}
                  >
                    Edit
                  </button> &nbsp;
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteProduct(pro.productId)}
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

export default ProductCRUD;