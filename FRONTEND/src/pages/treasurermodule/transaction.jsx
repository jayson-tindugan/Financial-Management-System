// Userdashboard.jsx
import React, { useState } from "react";
import Header from "../../components/reusable-components/header.jsx";
import Sidebar from "../../components/reusable-components/sidebar.jsx";
import LoginDetails from "../../components/loginDetails.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Icon from "react-bootstrap-icons";
import "../../assets/css/global.css";
import TransactionForm from "../../components/transactionForm.jsx";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import TransactionTable from "../../components/transactionTable.jsx";

function Userdashboard() {
    const accountDetails = LoginDetails();

    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };
    return (
        <div>
            <Header toggleSidebar={toggleSidebar} />
            <div
                className={`main-content${
                    isSidebarVisible ? " sidebar-open" : ""
                }`}
            >
                <div className="greeting-section">
                    {/* Greetings */}
                    <div className="greetings">
                        <Icon.PersonFill width={40} height={40} />
                        <h4>
                            Hi{" "}
                            <b>
                                {accountDetails.firstName +
                                    " " +
                                    accountDetails.lastName +
                                    "!"}
                            </b>
                        </h4>
                    </div>
                    {/* Org.Name */}
                    <div className="org-name">
                        <h4>Builders of Innovative Technologist Society</h4>
                    </div>
                </div>
                <div className="container-fluid ">
                <Row>
                    <Col sm={8}>
                    <TransactionTable/>
                    </Col>
                    <Col sm={4}>
                    <TransactionForm/>
                    </Col>
                </Row>
                </div>
            </div>
            <Sidebar isSidebarVisible={isSidebarVisible} />
        </div>
    );
}

export default Userdashboard;