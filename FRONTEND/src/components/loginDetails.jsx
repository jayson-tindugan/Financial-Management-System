import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginDetails() {
  const [accountDetails, setAccountDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Call the function to fetch account details when the component mounts
    getAccountDetails();
  }, []); // The empty dependency array ensures this runs once when the component mounts

  const getAccountDetails = async () => {
    try {
      axios.defaults.withCredentials = true; 
      // Make a GET request to the accountDetails endpoint with the headers
      const response = await axios.get('http://localhost:8001/accountDetails');

      console.log('Response:', response);

      if (response.status === 200) {
        setAccountDetails(response.data);
      } else {
        console.error('Unexpected response status:', response.status);
        // Redirect to login page in case of unexpected response status
        navigate('/');
      }
    } catch (error) {
      // Handle errors as needed
      console.error('Error fetching account details:', error.message);
      // Redirect to login page if an error occurs
      navigate('/');
    }
  };

  // Return the accountDetails
  return accountDetails;
}

export default LoginDetails;
