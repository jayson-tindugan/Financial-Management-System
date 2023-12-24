import "../../assets/css/login.css";
import Header from "./header.jsx";
import Footer from "./footer.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import session from "../../components/session.jsx";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import BITS_LOGO from "../../assets/img/BITS_LOGO.png";

function Login() {
    const isAuthenticated = session();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    console.log("Is Authenticated:", isAuthenticated);
    async function login(event) {
        event.preventDefault();
        axios.defaults.withCredentials = true;
        try {
            await axios
                .post("http://localhost:8001/login", {
                    username: username,
                    password: password,
                    withCredentials: true,
                })
                .then(
                    (response) => {
                        console.log(response.data);
                        if (response.data == "Login successfull") {
                            localStorage.setItem("authToken", response.data);
                            navigate("/userdashboard");
                        }
                        if (
                            response.data ==
                            "Authentication failed: Bad credentials"
                        ) {
                            setErrorMessage("Wrong password");
                        }
                        if (
                            response.data ==
                            "Authentication failed: Error loading user by username"
                        ) {
                            setErrorMessage("User does not exist");
                        } else {
                            console.log(
                                "Unexpected error encountered! Contact technical support for further assistance."
                            );
                        }
                    },
                    (fail) => {
                        console.error(fail);
                        setErrorMessage(
                            "Unexpected error encountered! Contact technical support for further assistance."
                        );
                    }
                );
        } catch (err) {
            alert(err);
        }
    }
    const handleInputChange = (event) => {
        // Update the input values and clear the error message
        if (event.target.id === "username") {
            setUsername(event.target.value);
        } else if (event.target.id === "password") {
            setPassword(event.target.value);
        }
        setErrorMessage("");
    };

    return (
        <div>
            <Header></Header>
            <div className="login-main">
                <img
                    src={BITS_LOGO}
                    style={{ width: "350px;", height: "350px" }}
                    alt="BITS LOGO"
                />
                <div className="Login-Card">
                    <form action="/userDashboard" method="POST">
                        <div className="Title-Header">
                            <h3>Login</h3>
                            <hr />
                        </div>
                        {errorMessage && (
                            <Alert variant="danger">{errorMessage}</Alert>
                        )}
                        <div className="loginUserInput">
                            <label htmlFor="stud_id">Student ID:</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="loginUserInput">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="forgotWrapper">
                            <a href="#">Forgot Password?</a>
                        </div>
                        <div className="btnWrapper">
                            <div to="/userDashboard" className="Link">
                                <button onClick={login} name="login">
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Login;
