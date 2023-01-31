import { Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import DeleteConfirmation from "../components/DeleteConfirmation";
 
function AllProduct() {
  const [products, setproducts] = useState([]);
  const navigate = useNavigate();
 
  const [showModal, setShowModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(0);
 
  useEffect(() => {
    axios.get("https://localhost:7234/api/Product").then((response) => {
      setproducts((data) => {
        return response.data;
      });
    });
  }, []);
 
  function confirmDeleteHandler() {
    axios
      .delete(`hhttps://localhost:7234/api/Product/${itemToDeleteId}`)
      .then((response) => {
        setShowModal(false);
        setproducts((existingData) => {
          return existingData.filter((_) => _.id !== itemToDeleteId);
        });
        setItemToDeleteId(0);
      });
  }
 
  function showConfirmDeleteHandler(id) {
    setShowModal(true);
    setItemToDeleteId(id);
  }
 
  function hideConfirmDeleteHandler() {
    setShowModal(false);
 
    setItemToDeleteId(0);
  }
 
  return (
    <>
      <DeleteConfirmation
        showModal={showModal}
        title="Delete Confirmation"
        body="Are you want delete this itme?"
        confirmDeleteHandler={confirmDeleteHandler}
        hideConfirmDeleteHandler={hideConfirmDeleteHandler}
      ></DeleteConfirmation>
      <Row className="mt-2">
        <Col md={{ span: 4, offset: 4 }}>
          <Button
            variant="primary"
            type="button"
            onClick={() => navigate("/product-create")}
          >
            Add A Product
          </Button>
        </Col>
      </Row>
      <Row md={3} className="g-4 mt-1">
        {products.map((sv) => {
          return (
            <Col key={sv.id}>
              <Card>
                <Card.Img variant="top" />
                <Card.Body>
                  <Card.Title>{sv.Name}</Card.Title>
                  <Card.Text>
                    <b>Attribute:</b> {sv.Attribute}
                  </Card.Text>
                  <Card.Text>
                    <b>Sales: </b>
                    {sv.Sales}
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/product-update/${sv.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => showConfirmDeleteHandler(sv.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
 
export default AllProduct;