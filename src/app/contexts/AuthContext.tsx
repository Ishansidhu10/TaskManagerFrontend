
import React, { createContext, useState, useContext } from 'react';

// Define your context type
export const AuthContext = createContext({
  isAuthenticated: false, // Example default value
  setAuthentication:() => {},
});

export default function AuthContextPage() {
  // You can use state or any logic here
  const [isAuthenticated,setAuthentication] = useState(false); // Example state or logic

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthentication }}>
      {/* Your components or other content */}
    </AuthContext.Provider>
  );
}

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
