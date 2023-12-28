// Userdashboard.jsx
import React, { useState } from "react";
import {
    Header,
    Sidebar,
    MainGreetings,
    TransactionForm,
    TransactionTable,
} from "../components/Components.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/global.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function Transaction() {
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
                <MainGreetings />
                <div className="container-fluid ">
                    <Row>
                        <Col sm={8}>
                            <TransactionTable />
                        </Col>
                        <Col sm={4}>
                            <TransactionForm />
                        </Col>
                    </Row>
                </div>
            </div>
            <Sidebar isSidebarVisible={isSidebarVisible} />
        </div>
    );
}

export default Transaction;
