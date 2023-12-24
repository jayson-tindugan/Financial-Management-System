// Userdashboard.jsx
import React from 'react';
import Header, { LoginDetails } from "../../components/reusable-components/header.jsx";
import Sidebar from "../../components/reusable-components/sidebar.jsx";
// import LoginDetails from "../../components/loginDetails.jsx";
import LogoutButton from "../../components/logout.jsx";
import { Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Userdashboard() {
  const accountDetails = LoginDetails();
  return (
    <div>
      <Header />
      <div className="main-content">
        <div style={{ marginLeft: '40%' }}>
          <Alert variant="success">
            <b style={{ fontSize: '50px' }}>
             Fullname:  {accountDetails.firstName+' '+accountDetails.lastName} <br />
             Id Number:   {accountDetails.idNumber} <br/>
             Role:  {accountDetails.role}
            </b>
          </Alert>
          <LogoutButton />
        </div>
      </div>
      <Sidebar />
    </div>
  );
}

export default Userdashboard;
