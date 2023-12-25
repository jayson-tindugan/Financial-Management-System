import { Link } from "react-router-dom";
import "../../assets/css/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/reusable-components/header.jsx";
import Sidebar from "../../components/reusable-components/sidebar.jsx";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Button } from "react-bootstrap";

function moduleadmin() {
    return (
        <div>
            <Header />
            <div className="main-content">
                <div className="col1">
                    {/* Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="currentColor"
                        class="bi bi-person-circle"
                        viewBox="0 0 16 16"
                    >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path
                            fill-rule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                        />
                    </svg>

                    {/* Greeting */}
                    <h3>
                        Hi <b>Admin</b>
                    </h3>

                    {/* Org.Name */}
                    <div className="orgname">
                        <h3>Builders of Innovative Technologist Society</h3>
                    </div>
                    {/* Page Buttons */}
                    <ButtonGroup style={{ gap: "5px" }}>
                        <Link to="/students">
                            <Button
                                variant="secondary"
                                style={{ background: "#526051" }}
                            >
                                Total Students Page
                            </Button>
                        </Link>
                        <Link to="/officers">
                            <Button
                                variant="secondary"
                                style={{ background: "#3E433E" }}
                            >
                                Officers Page
                            </Button>
                        </Link>
                        <Link to="/expenses">
                            <Button
                                variant="secondary"
                                style={{ background: "#21401E" }}
                            >
                                Expenses Page
                            </Button>
                        </Link>
                    </ButtonGroup>
                </div>

                <div className="col2">
                    <div className="row1">
                        <h1>Notice</h1>
                        <p>
                            Welcome to Builders Innovative Technologist Society.
                            Please take note that school records are not
                            directly connected to the website records.
                        </p>
                        <p>
                            For questions, inquiries or bug reports regarding
                            the system please contact the BSIT 4D.
                        </p>
                    </div>
                    <div className="row2">
                        <h1 style={{ color: "#ffffff" }}>Total Students</h1>
                        {/* Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
                            style={{ color: "#ffffff" }}
                            fill="currentColor"
                            class="bi bi-person-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                    </div>
                    <div className="row3">
                        <h1 style={{ color: "#ffffff" }}>Expenses</h1>
                        {/* Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
                            style={{ color: "#ffffff" }}
                            fill="currentColor"
                            class="bi bi-people-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                        </svg>
                    </div>
                    <div className="row4">
                        <h1 style={{ color: "#ffffff" }}>Officers</h1>
                        {/* Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
                            style={{ color: "#ffffff" }}
                            fill="currentColor"
                            class="bi bi-people-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                        </svg>
                    </div>
                    <div className="row5">
                        <div className="row5sub">
                            <h1>BALANCE</h1>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50"
                                height="50"
                                fill="currentColor"
                                class="bi bi-eye-slash-fill"
                                viewBox="0 0 16 16"
                            >
                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588M5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                            </svg>
                        </div>
                        <h2
                            style={{
                                backgroundColor: "#E5E4E2",
                                borderRadius: "12px",
                                borderStyle: "solid",
                                padding: "1rem",
                            }}
                        >
                            ₱ 100,00
                        </h2>
                    </div>
                </div>
            </div>
            <Sidebar />
        </div>
    );
}

export default moduleadmin;
