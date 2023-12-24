// Userdashboard.jsx
import React, { userState } from "react";
import Header from "../../components/reusable-components/header.jsx";
import Sidebar from "../../components/reusable-components/sidebar.jsx";
import LoginDetails from "../../components/loginDetails.jsx";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Userdashboard() {
    const accountDetails = LoginDetails();
    const [isSidebarActive, setSidebarActive] = useState(true); // State to manage sidebar

    const toggleSidebar = () => {
        setSidebarActive(!isSidebarActive);
    };
    return (
        <div>
            <Header />
            <div className="main-content">
                <div style={{ marginLeft: "40%" }}>
                    <Alert variant="success">
                        <b style={{ fontSize: "50px" }}>
                            Fullname:{" "}
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
            <Sidebar isActive={isSidebarActive} />
            <ToggleButton toggleSidebar={toggleSidebar} />
        </div>
    );
}

export default Userdashboard;
