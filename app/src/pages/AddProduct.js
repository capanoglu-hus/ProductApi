import axios from 'axios';
import { useRef, useNavigate } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function AddProduct() {

    const Id = useRef("");
    const Name = useRef("");
    const Attribute = useRef("");
    const Sales = useRef("");

    const navigate = useNavigate();

    function addProductHandler() {

        var payload = {
            "id": Id.current.valueOf,
            "name": Name.valueOf,
            "attribute": Attribute.valueOf,
            "sales": Sales.valueOf
        }
        axios
            .post("https://localhost:7234/api/Product", payload)
            .then((response) => {
                navigate("/");
            });
    }



    return (
        <>
        <legend> ADD A NEW Product

            <Form>
                <Form.Group className="mb-3" controlId="formProduct">
                    <Form.Label>Product ID </Form.Label>
                    <Form.Control type="text" ref={Id} placeholder="" />

                </Form.Group>


                <Form.Group className="mb-3" controlId="formProduct">
                    <Form.Label>Product Name </Form.Label>
                    <Form.Control type="text" ref={Name} placeholder="" />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formProduct">
                    <Form.Label>Product Attribute </Form.Label>
                    <Form.Control type="textarea" rows={4} ref={Attribute} placeholder="" />

                </Form.Group>
                <Form.Group className="mb-3" controlId="formProduct">
                    <Form.Label>Product Sales </Form.Label>
                    <Form.Control type="text" ref={Sales} placeholder="" />

                </Form.Group>

                <Button variant="primary" type="submit" onClik={addProductHandler}>
                    Submit
                </Button>
            </Form>
        </legend>
        </>
    );
}

export default AddProduct;