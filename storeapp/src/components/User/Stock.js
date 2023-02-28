import axios from "axios";
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
function Stock() {

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

    const result = await axios.get("https://localhost:7264/api/Product/GetProduct");
    setUsers(result.data);
    console.log(result.data);
  }
  async function save(event) {

    event.preventDefault();
    try {
      await axios.post("https://localhost:7264/api/Product/AddProduct", {

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
    await axios.delete("https://localhost:7264/api/Product/DeleteProduct/" + id);
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

      await axios.patch("https://localhost:7264/api/Product/UpdateProduct/" + stocks.find((u) => u.StockId === StockId).StockId || StockId,
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
    <div>
      <br></br>
      <br></br>
      <h1>Stock Details</h1>
      <br></br>
      
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th scope="col">StockId</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">UpdatedDate</th>
            <th scope="col">CreatedDate</th>
            <th scope="col">CreatedUserId</th>
            <th scope="col">UpdatedUserId</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        {stocks.map(function fn(stock) {
          return (
            <tbody>
              <tr>
                <th scope="row">{stock.StockId} </th>
                <td>{stock.Name}</td>
                <td>{stock.Description}</td>
                <td>{stock.Status}</td>
                <td>{stock.UpdatedDate}</td>
                <td>{stock.CreatedDate}</td>
                <td>{stock.CreatedUserId}</td>
                <td>{stock.UpdatedUserId}</td>

                <td>
                  <Button variant="Warning">edit</Button>{() => editStock(stock.id)}
                  <Button variant="danger">DELETE</Button>{() => DeleteStock(stock.id)}

                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>

    </div>
  );
}


export default Stock;