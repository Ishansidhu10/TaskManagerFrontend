// C:\Users\Ishan's laptop\Documents\PROJECTS\Task-Manager\Task-Manager_IS\task-manager-frontend\pages\AuthPage.tsx

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createContext } from 'react';
import Div2 from './Div2';


enum AuthMode {
  Login = 'login',
  Register = 'register',
}

export const myContext = createContext("hi");

const AuthPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authMode, setAuthMode] = useState(AuthMode.Login);
    const {setAuthentication} = useAuth();

  const toggleAuthMode = (mode: AuthMode) => {
    setAuthMode(mode);
    // Clear fields when toggling modes (optional)
    setEmail('');
    setUsername('');
    setPassword('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const responseData = makePutRequest();

    // Reset fields after submission (optional)
    setEmail('');
    setUsername('');
    setPassword('');
  };

  async function makePutRequest() {

    const headers = {
        'Content-Type': 'application/json',
      };
      var jsonSent = {}
      var apiEndpoint ='';
      if(authMode == AuthMode.Login) {
        jsonSent = {
            'username': username,
            'password': password
        }
         apiEndpoint = "http://localhost:5000/login";
    } else if(authMode == AuthMode.Register) {
        jsonSent = {
            'username': username,
            'password': password,
            'email':email
        }
         apiEndpoint = "http://localhost:5000/register";
    }

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(jsonSent),
            });
            if(response.status === 200) {
                console.log("Login/Registration Successful")
                const responseData = await response.json();
                
                return response;
            }
        } catch (error) {
      console.error('An error occurred:', error);
    }
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <div className="flex mb-4">
          <button
            onClick={() => toggleAuthMode(AuthMode.Register)}
            className={`w-1/2 py-2 rounded-l-md focus:outline-none ${
              authMode === AuthMode.Register ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
            }`}
          >
            Register
          </button>
          <button
            onClick={() => toggleAuthMode(AuthMode.Login)}
            className={`w-1/2 py-2 rounded-r-md focus:outline-none ${
              authMode === AuthMode.Login ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
            }`}
          >
            Login
          </button>
        </div>
        <form onSubmit={handleSubmit}>
  {authMode === AuthMode.Register && (
    <input
      type="email"
      value={email}
      onChange={handleEmailChange}
      placeholder="Email"
      className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black" // Added text-black class
    />
  )}
  <input
    type="text"
    value={username}
    onChange={handleUsernameChange}
    placeholder="Username"
    className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black" // Added text-black class
  />
  <input
    type="password"
    value={password}
    onChange={handlePasswordChange}
    placeholder="Password"
    className="w-full px-3 py-2 mb-6 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black" // Added text-black class
  />
  <button
    type="submit"
    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
  >
    {authMode === AuthMode.Login ? 'Login' : 'Register'}
  </button>
</form>

      </div>
    </div>
  );
};

export default AuthPage;
