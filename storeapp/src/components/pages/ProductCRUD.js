import axios from "axios";
import { useState, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { useProductContract } from "../../hooks/useProductContract";
import {  ethers  } from "ethers";

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
  
   const contract = useProductContract();

 

    async function web3Product(event){
      event.preventDefault();
      try{
        const _productId =ethers.utils.formatUnits(productId , 0 ).toString();
        const txResProduct= await contract?.products(_productId);
        alert(txResProduct);
      }
      catch(err){
        alert(err);
      }
    }

   async function web3save(event) {
    event.preventDefault();
    try {
      const _price = ethers.utils.parseEther(price).toString();
      const _productId =ethers.utils.formatUnits(productId , 0 ).toString();
      const _name = name ;
      const _description = description;
      const _status = status;
      const _isApproved = isApproved;
      const _categoryId = category_Id;
      const txResponse = await contract?.addProduct(
        _productId, 
        _name ,
        _description ,
        _price,
        _isApproved , 
        _categoryId,
        _status  
        
      );
      const txReceipt = await txResponse.wait();
      console.log(txReceipt);
    }

   catch (err) {
    alert(err);
  }

  }

  
  async function web3delete(event) {
    event.preventDefault();
    try {
      const _productId =ethers.utils.formatUnits(productId , 0 ).toString();
      const txResponse = await contract.deleteProduct(
        _productId,
      );
      const txReceipt = await txResponse.wait();
      console.log(txReceipt);
    }

   catch (err) {
    alert(err);
  }

  }

  async function web3Update(event) {
    event.preventDefault();
    try {
      const _price = ethers.utils.parseEther(price).toString();
      const _productId =ethers.utils.formatUnits(productId , 0 ).toString();
      const _name = name ;
      const _description = description;
      const _status = status;
      const _isApproved = isApproved;
      
      const txResponse = await contract.setProduct(
        _productId,
        _name,
        _description,
        _price,
        _status,
        _isApproved
       );
      const txReceipt = await txResponse.wait();
      console.log(txReceipt);
    }

   catch (err) {
    alert(err);
  }

  }

  async function web3Buy(event) {
    event.preventDefault();
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const _productId = ethers.utils.formatUnits(productId, 0).toString();
      const _value = ethers.utils.parseEther(price);


      const txResponse = await contract.connect(signer).buyProduct(_productId, {
        value: _value
      });
      const txReceipt = await txResponse.wait();
      console.log(txReceipt);
    }

   catch (err) {
    alert(err);
  }

  }
 

  let tokenjwt = sessionStorage.getItem('tokenjwt');

 let user = sessionStorage.getItem('UserId');

  const dataPost = {

    name: name,
    description: description,
    price: price,
    status: status,
    isApproved: isApproved,
    category_Id: category_Id,
    createUserId: createUserId,
    updateUserId: updateUserId,

  }
  const dataUpdated = {
    productId: productId,
    name: name,
    description: description,
    price: price,
    status: status,
    isApproved: isApproved,
    category_Id: category_Id,
    createUserId: createUserId,
    updateUserId: updateUserId,

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
      await axios.post("https://localhost:7264/api/Product/AddProduct", dataPost, {
        headers: {
          'Authorization': 'bearer ' + tokenjwt
        }
      });
      alert("product Registation Successfully");
      setName("");
      setDescription("");
      setPrice("");
      setStatus("");
      setIsApproved("");
      setCategory_Id("");
      setUpdateUserId("");
      setCreateUserId("");




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

    Load();
  }

  async function update(event) {

    event.preventDefault();
    try {
      await axios.patch("https://localhost:7264/api/Product/UpdateProduct/" + products.find((u) => u.productId === productId).productId || productId, dataUpdated, {
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
            <Form.Label>UpdateUserId</Form.Label>
            <Form.Control placeholder="UpdatedUserId" id="UpdatedUserId"
              value={user}
              onChange={(event) => {
                setUpdateUserId(user);
              }} />
          </Form.Group>
          <Form.Group as={Col} >
            <Form.Label>CreateUserId</Form.Label>
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
          </button> &nbsp;
          <button className="btn btn-warning mt-4" onClick={web3save}>
            web3 SAVE
          </button> &nbsp;
          <button className="btn btn-warning mt-4" onClick={web3delete}>
            web3 delete
          </button> &nbsp;
          <button className="btn btn-warning mt-4" onClick={web3Update}>
            web3 Updated
          </button> &nbsp;
          <button className="btn btn-warning mt-4" onClick={web3Buy}>
            web3 Buy
          </button> &nbsp;
          <button className="btn btn-dark mt-4" onClick={web3Product}>
            web3Product
          </button>&nbsp;
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
