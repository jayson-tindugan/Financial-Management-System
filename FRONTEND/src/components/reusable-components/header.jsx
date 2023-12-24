import Toggle from "../../components/reusable-components/toggleButton.jsx";
import BITS_LOGO from "../../assets/img/BITS_LOGO.png";
import LogoutButton from "../logout.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header() {
    return (
        <header className="global-header">
            <div className="left-header-content">
                <div className="toggle-btn">
                    <Toggle />
                </div>
                <div className="vertical-divider"></div>
                <div className="logo">
                    <img
                        src={BITS_LOGO}
                        style={{ padding: "2px 0 2px 10px" }}
                        alt="LOGO"
                    />
                </div>
            </div>
            <div className="right-header-content">
                <LogoutButton />
            </div>
        </header>
    );
}

function LoginDetails() {
    const [accountDetails, setAccountDetails] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAccountDetails();
    }, []);

    const getAccountDetails = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.get(
                "http://localhost:8001/accountDetails"
            );

            console.log("Response:", response);

            if (response.status === 200) {
                setAccountDetails(response.data);
            } else {
                console.error("Unexpected response status:", response.status);
                navigate("/");
            }
        } catch (error) {
            console.error("Error fetching account details:", error.message);
            navigate("/");
        }
    };

    return accountDetails;
}

export default Header;
export { LoginDetails };
