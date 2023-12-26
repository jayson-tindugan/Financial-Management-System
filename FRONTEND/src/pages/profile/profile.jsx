// Userdashboard.jsx
import React, { useState } from "react";
import Header from "../../components/reusable-components/header.jsx";
import Sidebar from "../../components/reusable-components/sidebar.jsx";
import ProfileBody from "../../components/non-reusable-components/profileBody.jsx";
import InputModal from "../../components/reusable-components/modal.jsx";
import LoginDetails from "../../components/loginDetails.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Icon from "react-bootstrap-icons";
import "../../assets/css/global.css";

function Profile() {
    const accountDetails = LoginDetails();

    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [showModals, setShowModals] = useState({});

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const handleClose = (key) => {
        setShowModals({ showModals, [key]: false });
    };

    const handleShow = (key) => {
        setShowModals({ showModals, [key]: true });
    };

    const handleSave = (key) => {
        // Logic to handle saving changes based on the key/modal

        // After saving changes, close the modal
        setShowModals({ showModals, [key]: false });
    };
    const generateInputModal = (key, label, placeholder) => {
        return (
            <InputModal
                key={key}
                show={showModals[key] || false}
                handleClose={() => handleClose(key)}
                handleSave={() => handleSave(key)}
                modalTitle={`Edit ${label}`}
            >
                <form>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id={key}
                            placeholder={placeholder}
                        />
                    </div>
                </form>
            </InputModal>
        );
    };

    const profileBodyFields = [
        {
            key: "idNumberModal",
            label: "Student Number",
            value: accountDetails.idNumber,
        },
        {
            key: "firstNameModal",
            label: "First Name",
            value: accountDetails.firstName,
        },
        {
            key: "middleInitialModal",
            label: "Middle Initial",
            value: accountDetails.middleName,
        },
        {
            key: "lastNameModal",
            label: "Last Name",
            value: accountDetails.lastName,
        },
        { key: "roleModal", label: "Role", value: accountDetails.role },
        { key: "statusModal", label: "Status", value: accountDetails.status },
    ];

    const inputModals = profileBodyFields.map(({ key, label, value }) =>
        generateInputModal(key, label, value)
    );
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
                    <div className="profile-content">
                        <div className="profile-details-header p-2">
                            <h4 className="p-0 m-0 text-white">
                                PERSONAL INFORMATION
                            </h4>
                        </div>
                        {profileBodyFields.map(({ key, label, value }) => (
                            <ProfileBody
                                key={key}
                                label={label.toUpperCase()}
                                value={value}
                                showIcon={accountDetails.role === "ADMIN"}
                                onClick={() => handleShow(key)}
                            />
                        ))}
                    </div>
                </div>
                {inputModals}
            </div>
            <Sidebar isSidebarVisible={isSidebarVisible} />
        </div>
    );
}

export default Profile;
