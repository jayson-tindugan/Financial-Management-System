import Toggle from "../../components/reusable-components/toggleButton.jsx";
import LogoutButton from "../logout.jsx";
function Header() {
    return (
        <header className="global-header">
            <div className="left-header-content">
                <div className="toggle-btn">
                    <Toggle />
                </div>
                <div className="vertical-divider"></div>
                <div className="logo">
                    <img src="./BITS_LOGO.png" alt="LOGO" />
                </div>
            </div>
            <div className="right-header-content">
                <LogoutButton/>
            </div>
        </header>
    );
}

export default Header;
