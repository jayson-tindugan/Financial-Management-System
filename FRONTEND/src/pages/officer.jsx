import React, { useState } from "react";
import {
    Header,
    Sidebar,
    MainGreetings,
} from "../components/reusable-components/ReusableComponents.js";
import { Button, Form, Table, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/global.css";

function Officer() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };
    // Function of Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Header toggleSidebar={toggleSidebar} />
            <div
                className={`main-content${
                    isSidebarVisible ? " sidebar-open" : ""
                }`}
            >
                <MainGreetings />
                <div
                    className="d-flex justify-content-end"
                    style={{ padding: "10px" }}
                >
                    <Button variant="success" onClick={handleShow}>
                        Add Officer
                    </Button>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        centered
                    >
                        <Modal.Header closeButton={false}>
                            <Modal.Title>Add Officer</Modal.Title>
                        </Modal.Header>

                        {/* Form Inside the MODAL */}
                        <Form style={{ padding: "20px" }}>
                            <Form.Group className="">
                                <Form.Label>Student Number:</Form.Label>
                                <Form.Control
                                    type=""
                                    placeholder="Student Number"
                                />
                            </Form.Group>
                            <Form.Group className="">
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control
                                    type=""
                                    placeholder="First Name"
                                />
                            </Form.Group>
                            <Form.Group className="">
                                <Form.Label>Middle Name:</Form.Label>
                                <Form.Control
                                    type=""
                                    placeholder="Middle Name"
                                />
                            </Form.Group>
                            <Form.Group className="">
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control type="" placeholder="Last Name" />
                            </Form.Group>
                            <Form.Group className="">
                                <Form.Label>Role:</Form.Label>
                                <Form.Control type="" placeholder="Role" />
                            </Form.Group>
                            <Form.Group className="">
                                <Form.Label>Status:</Form.Label>
                                <Form.Control type="" placeholder="Status." />
                            </Form.Group>
                        </Form>

                        {/* Close and Save Button Inside Modal */}
                        <Modal.Footer>
                            <Button variant="light" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="success" onClick={handleClose}>
                                Add
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <Table striped bordered hover size="md" responsive="sm">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Student No.</th>
                            <th>Section</th>
                            <th>Contact</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Mark Gacer</td>
                            <td>202010392</td>
                            <td>BSIT-4D</td>
                            <td>09123456789</td>
                            <td>Paid</td>
                        </tr>
                        <tr>
                            <td>NULL</td>
                            <td>NULL</td>
                            <td>NULL</td>
                            <td>NULL</td>
                            <td>NULL</td>
                        </tr>
                        <tr>
                            <td>NULL</td>
                            <td>NULL</td>
                            <td>NULL</td>
                            <td>NULL</td>
                            <td>NULL</td>
                        </tr>
                        <tr>
                            <td>NULL</td>
                            <td>NULL</td>
                            <td>NULL</td>
                            <td>NULL</td>
                            <td>NULL</td>
                        </tr>
                        <tr>
                            <td>NULL</td>
                            <td>NULL</td>
                            <td>NULL</td>
                            <td>NULL</td>
                            <td>NULL</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <Sidebar isSidebarVisible={isSidebarVisible} />
        </div>
    );
}

export default Officer;
