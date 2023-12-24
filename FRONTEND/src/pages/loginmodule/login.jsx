import "../../assets/css/login.css";
import Header from "./header.jsx";
import Footer from "./footer.jsx";
import {  useState } from "react";
import { useNavigate, } from 'react-router-dom';
import axios from "axios";
import session from "../../components/session.jsx";
function Login() {
    const isAuthenticated = session();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    console.log('Is Authenticated:', isAuthenticated);
    async function login(event) {
        event.preventDefault();
        axios.defaults.withCredentials = true; 
        try {
          await axios.post("http://localhost:8001/login", {
            username: username,
            password: password,
             withCredentials: true,
            }).then((response) => 
            {
             console.log(response.data);
             if(response.data=='Login successfully'){
              localStorage.setItem("authToken", response.data);
                navigate('/userdashboard');
             }
             if(response.data=='Authentication failed: Bad credentials'){
                alert('Wrong password');
             }
             if(response.data=='Authentication failed: Error loading user by username'){
                alert('User does not exist');
             }
             else{
                console.log("OH nooooo may mali sakin, char");
             }
          
          }, fail => {
           console.error(fail); 
           alert("Wrong credentials");
        });

        }
         catch (err) {
          alert(err);
        }
      
      }

    return (
        <div>
            <Header></Header>
            <div className="login-main">
                <img src="../../assets/react.svg" alt="BITS LOGO" />
                <form action="/userDashboard" className="Login-Card" method="POST">
                    <div className="Title-Header">
                        <h3>Login</h3>
                        <hr />
                    </div>
                    <div className="loginUserInput">
                        <label htmlFor="stud_id">Student ID:</label>
                        <input type="text" id="username"  
                             value={username}
                             onChange={(event) => {
                             setUsername(event.target.value);
                            }} />
                    </div>
                    <div className="loginUserInput">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password"
                            value={password}
                            onChange={(event) => {
                            setPassword(event.target.value);
                            }} />
                    </div>
                    <div className="forgotWrapper">
                        <a href="#">Forgot Password?</a>
                    </div>
                    <div className="btnWrapper">
                        <div to="/userDashboard" className="Link">
                            <button  onClick={login}   name="login">
                                Login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Login;
