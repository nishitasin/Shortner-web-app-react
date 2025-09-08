import { useState, useEffect } from 'react';
import axios from 'axios';
import { setAuthToken } from '../api/client';
import { Log } from '../middleware/logger';

const AUTH_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`;
const REGISTER_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/register`;

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      try {
        setLoading(true);
        Log('frontend', 'info', 'auth', 'Attempting to register and authenticate.');

        // 1. Register to get clientID and clientSecret
        const registerResponse = await axios.post(REGISTER_URL, {
          // ⚠️ IMPORTANT: REPLACE WITH YOUR DETAILS
          name: "John Doe",
          email: "john.doe@example.com",
          rollNo: "123456" 
        });
        const { clientID, clientSecret } = registerResponse.data;
        Log('frontend', 'info', 'auth', 'Successfully registered with the server.');

        // 2. Authenticate to get the Bearer Token
        const authResponse = await axios.post(AUTH_URL, { clientID, clientSecret });
        const { token } = authResponse.data;
        Log('frontend', 'info', 'auth', 'Successfully authenticated and received token.');

        // 3. Set the token for all subsequent API calls
        setAuthToken(token);
        setIsAuthenticated(true);
      } catch (err) {
        Log('frontend', 'fatal', 'auth', `Authentication process failed: ${err.message}`);
        console.error('Authentication failed:', err);
      } finally {
        setLoading(false);
      }
    };

    authenticate();
  }, []);

  return { loading, isAuthenticated };
};
