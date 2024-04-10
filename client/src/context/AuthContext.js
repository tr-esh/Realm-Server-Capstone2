import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, selectedRole: action.payload.role || 'Guest' };
    case 'LOGOUT':
      return { user: null, selectedRole: null };
    case 'SET_ROLE':
      return { ...state, selectedRole: action.payload };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    selectedRole: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const selectedRole = JSON.parse(localStorage.getItem('selectedRole'));

    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
      dispatch({ type: 'SET_ROLE', payload: selectedRole });
    }
  }, []);

  useEffect(() => {
    // Save user and selectedRole to localStorage whenever they change
    localStorage.setItem('user', JSON.stringify(state.user));
    localStorage.setItem('selectedRole', JSON.stringify(state.selectedRole));

    // Check if the LOGOUT action was dispatched and delete user data from localStorage
    if (state.user === null && state.selectedRole === null) {
      localStorage.removeItem('user');
      localStorage.removeItem('selectedRole');
    }
  }, [state.user, state.selectedRole]);

  console.log('AuthContext state: ', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
