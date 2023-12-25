import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LoginDetails from "../../components/loginDetails.jsx";
import * as Icon from "react-bootstrap-icons";

function Sidebar({ isSidebarVisible }) {
    const accountDetails = LoginDetails();
    const [showOfficersSubMenu, setShowOfficersSubMenu] = useState(false);
    const [showTransactionSubMenu, setShowTransactionSubMenu] = useState(false);
    const [officerCaretRotation, setOfficerCaretRotation] = useState(false);
    const [transactionCaretRotation, setTransactionCaretRotation] =
        useState(false);
    const location = useLocation();

    const toggleOfficersSubMenu = () => {
        setShowOfficersSubMenu(!showOfficersSubMenu);
        setOfficerCaretRotation(!officerCaretRotation);
    };
    const toggleTransactionSubMenu = () => {
        setShowTransactionSubMenu(!showTransactionSubMenu);
        setTransactionCaretRotation(!transactionCaretRotation);
    };
    return (
        <nav
            className={`sidebar-container${
                isSidebarVisible ? " sidebar-container-active" : ""
            }`}
        >
            {/* ADMIN SIDEBAR */}
            {accountDetails.role === "ADMIN" && (
                <ul>
                    <h4 className="role">{accountDetails.role}</h4>
                    <li>
                        <NavLink
                            exact
                            to="/Dashboard"
                            className={
                                location.pathname === "/Dashboard"
                                    ? "active-page"
                                    : ""
                            }
                        >
                            <Icon.GraphUpArrow className="sidebar-icons" />
                            Dashboard
                        </NavLink>
                    </li>
                    <li onClick={toggleOfficersSubMenu}>
                        <NavLink>
                            <Icon.Clipboard2DataFill className="sidebar-icons" />
                            Records
                            <Icon.CaretRightFill
                                className={`caret sub-menu-toggle ${
                                    officerCaretRotation ? "rotate" : ""
                                }`}
                            />
                        </NavLink>
                        {showOfficersSubMenu && (
                            <ul className="sub-menu">
                                <hr />
                                <li>
                                    <NavLink
                                        exact
                                        to="/StudentRecords"
                                        className={
                                            location.pathname ===
                                            "/StudentRecords"
                                                ? "active-page"
                                                : ""
                                        }
                                    >
                                        <Icon.PersonLinesFill className="sub-menu-link-icon" />
                                        Students
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        exact
                                        to="/OfficerRecords"
                                        className={
                                            location.pathname ===
                                            "/OfficerRecords"
                                                ? "active-page"
                                                : ""
                                        }
                                    >
                                        <Icon.PeopleFill className="sub-menu-link-icon" />
                                        Officers
                                    </NavLink>
                                </li>
                                <hr />
                            </ul>
                        )}
                    </li>
                    <li>
                        <NavLink
                            exact
                            to="/Expenses"
                            className={
                                location.pathname === "/Expenses"
                                    ? "active-page"
                                    : ""
                            }
                        >
                            <Icon.Coin className="sidebar-icons" />
                            Expenses
                        </NavLink>
                    </li>
                    <li onClick={toggleTransactionSubMenu}>
                        <NavLink>
                            <Icon.Clipboard2DataFill className="sidebar-icons" />
                            Transaction
                            <Icon.CaretRightFill
                                className={`caret sub-menu-toggle ${
                                    transactionCaretRotation ? "rotate" : ""
                                }`}
                            />
                        </NavLink>
                        {showTransactionSubMenu && (
                            <ul className="sub-menu">
                                <hr />
                                <li>
                                    <NavLink
                                        exact
                                        to="/StudentRecords"
                                        className={
                                            location.pathname ===
                                            "/StudentRecords"
                                                ? "active-page"
                                                : ""
                                        }
                                    >
                                        <Icon.PersonLinesFill className="sub-menu-link-icon" />
                                        Transaction
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        exact
                                        to="/OfficerRecords"
                                        className={
                                            location.pathname ===
                                            "/OfficerRecords"
                                                ? "active-page"
                                                : ""
                                        }
                                    >
                                        <Icon.PeopleFill className="sub-menu-link-icon" />
                                        Transaction History
                                    </NavLink>
                                </li>
                                <hr />
                            </ul>
                        )}
                    </li>
                    <li>
                        <NavLink
                            exact
                            to="/Profile"
                            className={
                                location.pathname === "/Profile"
                                    ? "active-page"
                                    : ""
                            }
                        >
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
                    <h4 className="role">{accountDetails.role}</h4>
                    <li>
                        <NavLink exact to="/userDashboard">
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
                    <h4 className="role">{accountDetails.role}</h4>
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
                    <h4 className="role">{accountDetails.role}</h4>
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
