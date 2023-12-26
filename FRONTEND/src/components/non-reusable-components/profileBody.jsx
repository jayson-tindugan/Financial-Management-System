import React from "react";
import * as Icon from "react-bootstrap-icons";

function ProfileBody({ label, value, showIcon, onClick }) {
    const handleIconClick = () => {
        if (onClick && typeof onClick === "function") {
            onClick(); // Trigger the onClick function passed as a prop
        }
    };
    return (
        <div className="profile-body">
            <label htmlFor={label}>{label}:</label>
            <div className="profile-info d-flex justify-content-between">
                <p className="m-0">{value}</p>
                {showIcon && (
                    <button onClick={handleIconClick}>
                        <Icon.PencilFill className="sidebar-icons" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default ProfileBody;
