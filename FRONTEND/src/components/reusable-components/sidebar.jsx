import React from "react";
import { NavLink } from "react-router-dom";
import LoginDetails from "../../components/loginDetails.jsx";
import * as Icon from "react-bootstrap-icons";
function Sidebar({ isActive }) {
    const accountDetails = LoginDetails();
    return (
        <nav
            className={`sidebar-container ${
                isActive ? "sidebar-container-active" : ""
            }`}
        >
            {/* ADMIN SIDEBAR */}
            {accountDetails.role === "ADMIN" && (
                <ul>
                    <li>
                        <NavLink to="/userDashboard">
                            <Icon.GraphUpArrow className="sidebar-icons" />
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="">
                            <Icon.PersonLinesFill className="sidebar-icons" />
                            Students
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="">
                            <Icon.PeopleFill className="sidebar-icons" />
                            Officers
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/userReport">
                            <Icon.Coin className="sidebar-icons" />
                            Expenses
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/userProfile">
                            <Icon.ClockHistory className="sidebar-icons" />
                            Transaction History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/userProfile">
                            <Icon.PersonFillGear className="sidebar-icons" />
                            Profile
                        </NavLink>
                    </li>
                    <hr />
                </ul>
            )}
            {/* TREASURER SIDEBAR */}
            {accountDetails.role === "TREASURER" && (
                <ul>
                    <li>
                        <NavLink to="/userDashboard">
                            <Icon.GraphUpArrow className="sidebar-icons" />
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/userOfficerRecords">
                            <Icon.CurrencyExchange className="sidebar-icons" />
                            Transaction
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/userReport">
                            <Icon.CashCoin className="sidebar-icons" />
                            Balance
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/userProfile">
                            <Icon.PersonFillGear className="sidebar-icons" />
                            Profile
                        </NavLink>
                    </li>
                    <hr />
                </ul>
            )}
            {/* AUDITOR SIDEBAR */}
            {accountDetails.role === "AUDITOR" && (
                <ul>
                    <li>
                        <NavLink to="/userDashboard">
                            <Icon.GraphUpArrow className="sidebar-icons" />
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/userReport">
                            <Icon.CashCoin className="sidebar-icons" />
                            Balance
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/userProfile">
                            <Icon.PersonFillGear className="sidebar-icons" />
                            Profile
                        </NavLink>
                    </li>
                    <hr />
                </ul>
            )}
            {/* OTHER_OFFICER SIDEBAR */}
            {accountDetails.role === "OTHER_OFFICER" && (
                <ul>
                    <li>
                        <NavLink to="/userDashboard">
                            <Icon.GraphUpArrow className="sidebar-icons" />
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/userOfficerRecords">
                            <Icon.PeopleFill className="sidebar-icons" />
                            Officer
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/userReport">
                            <Icon.Clipboard2DataFill className="sidebar-icons" />
                            Report
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/userProfile">
                            <Icon.PersonFillGear className="sidebar-icons" />
                            Profile
                        </NavLink>
                    </li>
                    <hr />
                </ul>
            )}
        </nav>
    );
}

export default Sidebar;
