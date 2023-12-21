// import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import Header from "./header.jsx";
import Footer from "./footer.jsx";

function Login() {
    return (
        <div>
            <Header></Header>
            <main>
                <img src="assets/img/BITS_LOGO.png" alt="BITS LOGO" />
                <form action="" className="Login-Card" method="POST">
                    <div className="Title-Header">
                        <h3>Login</h3>
                        <hr />
                    </div>
                    <div className="userInput">
                        <label htmlFor="stud_id">Student ID:</label>
                        <input type="text" name="stud_id" />
                    </div>
                    <div className="userInput">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" />
                    </div>
                    <div className="forgotWrapper">
                        <a href="#">Forgot Password?</a>
                    </div>
                    <div className="btnWrapper">
                        <Link to="/dashboard" className="Link">
                            <button type="submit" name="login">
                                Login
                            </button>
                        </Link>
                    </div>
                </form>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default Login;
