import React, { useState, useRef } from "react";
import { Header, Sidebar, MainGreetings } from "../components/Components.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/global.css";
import { useReactToPrint } from "react-to-print"; //npm i react-to-print
import { useDownloadExcel } from "react-export-table-to-excel"; //npm i react-export-table-to-excel
import ReportTable from "../components/reportTable.jsx";

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
                <ReportTable/>
            </div>
            <Sidebar isSidebarVisible={isSidebarVisible} />
        </div>
    );
}

export default Report;
