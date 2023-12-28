// Userdashboard.jsx
import React, { useState } from "react";
import {
    Header,
    Sidebar,
    MainGreetings,
} from "../../components/reusable-components/ReusableComponents.js";
import "bootstrap/dist/css/bootstrap.min.css";
import TotalCashflowChart from "../../components/totalCashflowChart.tsx";
import MonthlyCollectionChart from "../../components/monthlyCollectionChart.tsx";
import MonthlyDonationChart from "../../components/monthlyDonationChart.tsx";
import MonthlyIgpChart from "../../components/monthlyIgpChart.tsx";
import * as Icon from "react-bootstrap-icons";
import "../../assets/css/global.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function Userdashboard() {
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
                <div>
                    <MainGreetings />
                    <div className="dashboard-card">
                        <div className="notice-card">
                            <h2 className="mb-4">Notice</h2>
                            <p>
                                Welcome to Builders Innovative Technologist
                                Society. Please take note that school records
                                are not directly connected to the website
                                records.
                            </p>
                            <p>
                                For questions, inquiries or bug reports
                                regarding the system please contact the BSIT 4D.
                            </p>
                        </div>
                        <div className="card-content">
                            <div className="card-details card1">
                                <h2 className="card-title">Officers</h2>
                                {/* Icon */}
                                <div className="card-counter">
                                    <div className="card-icon">
                                        <Icon.PeopleFill
                                            width={50}
                                            height={70}
                                        />
                                    </div>
                                    <div className="count">
                                        <h2>10</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="card-details card2">
                                <h2 className="card-title">Donation</h2>
                                {/* Icon */}
                                <div className="card-counter">
                                    <div className="card-icon">
                                        <Icon.EnvelopeFill
                                            width={50}
                                            height={70}
                                        />
                                    </div>
                                    <div className="count">
                                        <h2>&#x20B1;3000</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="card-details card3">
                                <h2 className="card-title">Collection</h2>
                                {/* Icon */}
                                <div className="card-counter">
                                    <div className="card-icon">
                                        <Icon.CurrencyExchange
                                            width={60}
                                            height={70}
                                        />
                                    </div>
                                    <div className="count">
                                        <h2>&#x20B1;6000</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="card-details card4">
                                <h2 className="card-title">IGP</h2>
                                {/* Icon */}
                                <div className="card-counter">
                                    <div className="card-icon">
                                        <Icon.ShopWindow
                                            width={50}
                                            height={70}
                                        />
                                    </div>
                                    <div className="count">
                                        <h2>&#x20B1;9000</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <Row>
                        <Col sm={4}>
                            <MonthlyCollectionChart />
                        </Col>
                        <Col sm={4}>
                            <MonthlyDonationChart />
                        </Col>
                        <Col sm={4}>
                            <MonthlyIgpChart />
                        </Col>
                    </Row>

                    <Col sm={6}>
                        <TotalCashflowChart />
                    </Col>
                </div>
                <Sidebar isSidebarVisible={isSidebarVisible} />
            </div>
        </div>
    );
}

export default Userdashboard;
