import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function DeleteConfirmation(props) {



    return (

        <>
        <Modal show={props.showModal} onHide={() => { props.closeConfirmPopuHandler() }}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => { props.closeConfirmPopuHandler() }}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => { props.DeleteConfirmation() }}>
                    confirm delete
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default DeleteConfirmation; 