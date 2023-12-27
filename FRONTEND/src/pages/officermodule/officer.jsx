import React, { useState } from "react";
import Header from "../../components/reusable-components/header.jsx";
import Sidebar from "../../components/reusable-components/sidebar.jsx";
import LoginDetails from "../../components/loginDetails.jsx";
import { Button, Form, Table, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Icon from "react-bootstrap-icons";
import "../../assets/css/global.css";


function Officer() {
  const accountDetails = LoginDetails();

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
      <div className={`main-content${isSidebarVisible ? " sidebar-open" : ""}`}>
        <div className="greeting-section">
          {/* Greetings */}
          <div className="greetings">
            <Icon.PersonFill width={40} height={40} />
            <h4>
              Hi{" "}
              <b>
                {accountDetails.firstName + " " + accountDetails.lastName + "!"}
              </b>
            </h4>
          </div>
          {/* Org.Name */}
          <div className="org-name">
            <h4>Builders of Innovative Technologist Society</h4>
          </div>
        </div>
        <div className="container-fluid bg-success-subtle">
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
          <div style={{ padding:"10px" }}>
            <Button variant="primary" onClick={handleShow}>
              Add Officer
            </Button>

            <Modal 
            show={show} 
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>OFFICER APPLICATION FORM</Modal.Title>
              </Modal.Header>

              {/* Form Inside the MODAL */}
              <Form style={{ padding: "20px" }}>
                <Form.Group className="">
                  <Form.Label>Full Name:</Form.Label>
                  <Form.Control
                    type=""
                    placeholder="LastName, FirstName MiddleName"
                  />
                </Form.Group>
                <Form.Group className="">
                  <Form.Label>Student No.</Form.Label>
                  <Form.Control type="" placeholder="Student No." />
                </Form.Group>
                <Form.Group className="">
                  <Form.Label>Section:</Form.Label>
                  <Form.Control type="" placeholder="Section" />
                </Form.Group>
                <Form.Group className="">
                  <Form.Label>Contact:</Form.Label>
                  <Form.Control type="" placeholder="Contact No." />
                </Form.Group>
                <Form.Group className="">
                  <Form.Label>Status:</Form.Label>
                  <Form.Control type="" placeholder="Status." />
                </Form.Group>
              </Form>

              {/* Close and Save Button Inside Modal */}
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
      <Sidebar isSidebarVisible={isSidebarVisible} />
    </div>
  );
}

export default Officer;
