// Userdashboard.jsx
import React, { useState } from "react";
import Header from "../../components/reusable-components/header.jsx";
import Sidebar from "../../components/reusable-components/sidebar.jsx";
import LoginDetails from "../../components/loginDetails.jsx";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import TotalCashflowChart from "../../components/totalCashflowChart.tsx";
import MonthlyCollectionChart from "../../components/monthlyCollectionChart.tsx";
import MonthlyDonationChart from "../../components/monthlyDonationChart.tsx";
import MonthlyIgpChart from "../../components/monthlyIgpChart.tsx";
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
                <div>
                    <TotalCashflowChart/>
                    <MonthlyCollectionChart/>
                    <MonthlyDonationChart/>
                    <MonthlyIgpChart/>
                    <Alert variant="success">
                        <b style={{ fontSize: "50px" }}>
                            New Dashboard Endpoint <br /> Fullname:{" "}
                            {accountDetails.firstName +
                                " " +
                                accountDetails.lastName}{" "}
                            <br />
                            Id Number: {accountDetails.idNumber} <br />
                            Role: {accountDetails.role}
                        </b>
                    </Alert>
                </div>
            </div>
            <Sidebar isSidebarVisible={isSidebarVisible} />
        </div>
    );
}

export default Userdashboard;
