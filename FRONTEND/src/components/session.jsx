import { useEffect, useState } from 'react';

const session = () => {
  // Destructure the array returned by useState
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
   
      // localStorage is available, you can use it here
      const storedData = localStorage.getItem('authToken');
      console.log('Stored Data:', storedData);
      if (storedData !== null) {
      // Use the setIsAuthenticated function to update the state
      setIsAuthenticated(true);
    } else {
      // localStorage is not available
      console.log('localStorage is not supported');
      
      // Use the setIsAuthenticated function to update the state
      setIsAuthenticated(false);
    }
  }, []); // Empty dependency array to run the effect only once

  return isAuthenticated;
};

export default session;
