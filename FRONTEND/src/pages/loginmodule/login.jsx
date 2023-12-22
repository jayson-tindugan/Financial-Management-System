// import React from "react";
import "../../assets/css/login.css";
import { Link } from "react-router-dom";
import Header from "./header.jsx";
import Footer from "./footer.jsx";

function Login() {
    return (
        <div>
            <Header></Header>
            <div className="login-main">
                <img src="../../assets/react.svg" alt="BITS LOGO" />
                <form action="" className="Login-Card" method="POST">
                    <div className="Title-Header">
                        <h3>Login</h3>
                        <hr />
                    </div>
                    <div className="loginUserInput">
                        <label htmlFor="stud_id">Student ID:</label>
                        <input type="text" name="username" />
                    </div>
                    <div className="loginUserInput">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" />
                    </div>
                    <div className="forgotWrapper">
                        <a href="#">Forgot Password?</a>
                    </div>
                    <div className="btnWrapper">
                        <Link to="/userDashboard" className="Link">
                            <button type="submit" name="login">
                                Login
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Login;
