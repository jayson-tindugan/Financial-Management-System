import Toggle from "../../components/reusable-components/toggleButton.jsx";
import BITS_LOGO from '../../assets/img/BITS_LOGO1.png';
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
                    <img src={BITS_LOGO} style={{padding: "2px 0 2px 10px" }} alt="LOGO" />
                </div>
            </div>
            <div className="right-header-content">
                <LogoutButton/>
            </div>
        </header>
    );
}

export default Header;

