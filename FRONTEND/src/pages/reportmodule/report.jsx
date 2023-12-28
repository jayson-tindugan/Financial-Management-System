import React, { useState } from "react";
import {
    Header,
    Sidebar,
    MainGreetings,
} from "../../components/reusable-components/ReusableComponents.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/global.css";

function Report() {
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
                <MainGreetings />
                <div className="container-fluid bg-success-subtle">
                    insert report
                </div>
            </div>
            <Sidebar isSidebarVisible={isSidebarVisible} />
        </div>
    );
}

export default Report;
