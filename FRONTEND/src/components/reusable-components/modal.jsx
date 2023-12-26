import React from "react";
import { Modal, Button } from "react-bootstrap";

function InputModal({ show, handleClose, handleSave, children, modalTitle }) {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton={false}>
                {" "}
                {/* Set closeButton prop to false */}
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default InputModal;
