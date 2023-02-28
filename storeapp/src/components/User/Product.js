import axios from "axios";
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';

function Product() {
  const [ProductId, setProductId] = useState("");
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState([]);
  const [Status, setStatus] = useState([]);
  const [IsApproved, setIsApproved] = useState([]);
  const [CreatedUserId, setCreatedUserId] = useState([]);
  const [UpdatedUserId, setUpdatedUserId] = useState([]);
  const [CreatedDate, setCreatedDate] = useState([]);
  const [UpdatedDate, setUpdatedDate] = useState([]);
  const [CategoryId, setCategoryId] = useState([]);
  const [products, setUsers] = useState([]);

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
        CreatedDate: CreatedDate,
        CreatedUserId: CreatedUserId,
        UpdatedDate: UpdatedDate,
        UpdatedUserId: UpdatedUserId

      });
      alert("product Registation Successfully");
      setProductId("");
      setName("");
      setDescription("");
      setPrice("");
      setStatus("");
      setIsApproved("");
      setCategoryId("");
      setUpdatedDate("");
      setCreatedDate("");
      setCreatedUserId("");
      setUpdatedUserId("");

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
    setUpdatedDate("products.UpdatedDate");
    setCreatedDate("products.CreatedDate");
    setCreatedUserId("products.CreatedUserId");
    setUpdatedUserId("products.UpdatedUserId");
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
    setUpdatedDate("");
    setCreatedDate("");
    setCreatedUserId("");
    setUpdatedUserId("");
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
          CreatedDate: CreatedDate,
          CreatedUserId: CreatedUserId,
          UpdatedDate: UpdatedDate,
          UpdatedUserId: UpdatedUserId
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
      setUpdatedDate("");
      setCreatedDate("");
      setCreatedUserId("");
      setUpdatedUserId("");
      Load();
    } catch (err) {
      alert(err);
    }
  }

  return (
    <>
      <br></br>
      <br></br>
      <h1>Product Details</h1>
      <br></br>


      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th scope="col">ProductId</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">Price</th>
            <th scope="col">IsApproved</th>
            <th scope="col">CategoryId</th>
            <th scope="col">CreatedUserId</th>
            <th scope="col">UpdatedUserId</th>
            <th scope="col">CreatedDate</th>
            <th scope="col">UpdatedDate</th>
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
                <td>{product.UpdatedUserId}</td>
                <td>{product.CreatedUserId}</td>
                <td>{product.UpdatedDate}</td>
                <td>{product.CreatedDate}</td>


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

export default Product;