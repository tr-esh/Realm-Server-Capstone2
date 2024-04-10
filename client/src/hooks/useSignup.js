import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate(); // Use useNavigate here

  const signup = async (role, firstname, middlename, lastname, email, phone, username, accesskey, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/realm/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({role, firstname, middlename, lastname, email, phone, username, accesskey, password})
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json));
      dispatch({type: 'LOGIN', payload: json});
      setIsLoading(false);

      // Navigate to the sign up page
      navigate('/login');
    }
  };

  return { signup, isLoading, error, navigate }; // Include navigate in the returned object
};
