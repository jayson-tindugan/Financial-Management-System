import "../../assets/css/global.css";
import Header from "../../components/reusable-components/header.jsx";
import Sidebar from "../../components/reusable-components/sidebar.jsx";
import TransactionForm from "../../components/transactionForm.jsx";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import TransactionTable from "../../components/transactionTable.jsx";
import LoginDetails from "../../components/loginDetails.jsx";
import * as Icon from "react-bootstrap-icons";
function Userdashboard() {
    const accountDetails = LoginDetails();
    return (
        <div>
            <Header />
           
            <div className="main-content">
            <div className="greeting-section py-2">
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
                <Row>
                    <Col sm={8}>
                    <TransactionTable/>
                    </Col>
                    <Col sm={4}>
                    <TransactionForm/>
                    </Col>
                </Row>
            </div>
            <Sidebar />
        </div>
    );
}

export default Userdashboard;
