import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;

      // Make a GET request to the logout endpoint
      await axios.get('http://localhost:8001/logoutUser');

      // Clear the authentication token or session information
      localStorage.removeItem('authToken');

      // Redirect or navigate to the login page
      navigate('/', { replace: true });
    } catch (error) {
      // Check if it's a network error
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else if (axios.isAxiosError(error)) {
        // Check if it's an Axios error (e.g., server responded with an error status)
        if (error.response) {
          console.error('Error during logout. Server responded with:', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Error during logout. No response received:', error.request);
        } else {
          // Something went wrong in setting up the request
          console.error('Error during logout. Request setup error:', error.message);
        }
      } else {
        // Something else happened, e.g., a non-Axios error
        console.error('Error during logout:', error.message);
      }
    }
  };

  return (
  
     <svg onClick={logout}
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    // class="bi bi-box-arrow-right"
                    viewBox="0 0 16 16"
                >
                    <path
                        // fill-rule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                    />
                    <path
                        // fill-rule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                    />
                </svg>
   
  );
};

export default LogoutButton;
