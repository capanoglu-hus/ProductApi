import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useRef, useParams, useNavigate } from 'react';
import axios from 'axios';


function UpdateProduct() {

    const Id = useRef("");
    const Name = useRef("");
    const Attribute = useRef("");
    const Sales = useRef("");

    const { id } = useParams();


    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://localhost:7234/api/Product')
            .then((response) => {

                Name.current.valueOf = response.data.Name;
                Attribute.current.valueOf = response.data.Attribute;
                Sales.current.valueOf = response.data.Sales;

            })
    }, []);



    function UpdateProductHandler() {
        var payload = {
            "id": id,
            "name": Name.current.valueOf,
            "attribute": Attribute.current.valueOf,
            "sales": Sales.current.valueOf,

        }
        axios
            .put("https://localhost:7234/api/Product", payload)
            .then((response) => {
                navigate("/");
            });

    }



    return ( 
        <>
        <legend> update A NEW Product

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

                <Button variant="primary" type="submit" onClik={UpdateProductHandler}>
                    Submit
                </Button>
            </Form>
        </legend>
        </>
    )
}

export default UpdateProduct; 