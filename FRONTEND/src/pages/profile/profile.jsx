// Userdashboard.jsx
import React, { useState } from "react";
import Header from "../../components/reusable-components/header.jsx";
import Sidebar from "../../components/reusable-components/sidebar.jsx";
import LoginDetails from "../../components/loginDetails.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Icon from "react-bootstrap-icons";
import "../../assets/css/global.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
                <div className="">
                    <div className="profile-content p-3">
                        <div className="profile-img">
                            <div className="user-pfp"></div>
                            <div className="profile-name">
                                <h3>User Name</h3>
                                <button>Edit Profile</button>
                            </div>
                        </div>
                        <div className="profile-details">
                            <div className="profile-details-header p-2">
                                <h4 className="p-0 m-0 text-white">
                                    PERSONAL INFORMATION
                                </h4>
                            </div>
                            <div className="profile-body d-flex justify-content-between">
                                <label htmlFor="stud_no">Student No.</label>
                                <div className="profile-info d-flex justify-content-between">
                                    <p className="m-0">
                                        {accountDetails.idNumber}
                                    </p>
                                    <Icon.PencilFill className="sidebar-icons" />
                                </div>
                            </div>
                            <div className="profile-body d-flex justify-content-between">
                                <label htmlFor="firstname">First Name:</label>
                                <div className="profile-info d-flex justify-content-between">
                                    <p className="m-0">
                                        {accountDetails.firstName}
                                    </p>
                                    <Icon.PencilFill className="sidebar-icons" />
                                </div>
                            </div>
                            <div className="profile-body d-flex justify-content-between">
                                <label htmlFor="middlename">
                                    Middle Initial
                                </label>
                                <div className="profile-info d-flex justify-content-between">
                                    <p className="m-0">
                                        {accountDetails.middleName}
                                    </p>
                                    <Icon.PencilFill className="sidebar-icons" />
                                </div>
                            </div>
                            <div className="profile-body d-flex justify-content-between">
                                <label htmlFor="lastname">Last Name</label>
                                <div className="profile-info d-flex justify-content-between">
                                    <p className="m-0">
                                        {accountDetails.lastName}
                                    </p>
                                    <Icon.PencilFill className="sidebar-icons" />
                                </div>
                            </div>
                            <div className="profile-body d-flex justify-content-between">
                                <label htmlFor="role">Role</label>
                                <div className="profile-info d-flex justify-content-between">
                                    <p className="m-0">{accountDetails.role}</p>
                                    <Icon.PencilFill className="sidebar-icons" />
                                </div>
                            </div>
                            <div className="profile-body d-flex justify-content-between">
                                <label htmlFor="status">Status</label>
                                <div className="profile-info d-flex justify-content-between">
                                    <p className="m-0">
                                        {accountDetails.status}
                                    </p>
                                    <Icon.PencilFill className="sidebar-icons" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*
                <div className="profile-page-container">
                    <div className="column1">
                        <div className="displayPfp">
                            <img
                                className="pfp"
                                src="https://i.pinimg.com/736x/b9/2e/31/b92e3135e9207093c372310827a06315.jpg"
                            ></img>
                            <h3 style={{ color: "#21401E" }}>NAME SURNAME</h3>
                            <p>Edit Profile</p>
                        </div>
                    </div>

                    <div className="column2">
                        <div className="per-info-header">
                            <h3 style={{ color: "#ffffff" }}>
                                PERSONAL INFORMATION
                            </h3>
                        </div>

                        <div className="per-info-table">
                            <div className="per-info-row">
                                <label>Student No. </label>
                                <div className="icon-edit">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="30"
                                        height="30"
                                        fill="#6B966B"
                                        class="bi bi-pencil-square"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    </svg>
                                </div>
                                <p>2020442023</p>
                            </div>

                            <div className="per-info-row">
                                <label>Personal Email </label>
                                <div className="icon-edit">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="30"
                                        height="30"
                                        fill="#6B966B"
                                        class="bi bi-pencil-square"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    </svg>
                                </div>
                                <p>sample@gmail.com</p>
                            </div>

                            <div className="per-info-row">
                                <label>Contact No.</label>
                                <div className="icon-edit">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="30"
                                        height="30"
                                        fill="#6B966B"
                                        class="bi bi-pencil-square"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    </svg>
                                </div>
                                <p>09123456789</p>
                            </div>

                            <div className="per-info-row">
                                <label>Location</label>
                                <div className="icon-edit">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="30"
                                        height="30"
                                        fill="#6B966B"
                                        class="bi bi-pencil-square"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    </svg>
                                </div>
                                <p>Imus, Cavite</p>
                            </div>
                        </div>
                    </div>
                </div>*/}
            </div>
            <Sidebar isSidebarVisible={isSidebarVisible} />
        </div>
    );
}

export default Userdashboard;
