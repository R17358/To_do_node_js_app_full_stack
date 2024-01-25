import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import "./styles/app.scss";
import { useState } from 'react';

export const server = "https://nodejs-todoapp-5xv9.onrender.com/api/v1";

export const Context = createContext({ isAuthenticated: false });


const AppWrapper = ()=>{

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  return(
    <Context.Provider value = {{isAuthenticated, setIsAuthenticated, loading, setLoading, user, setUser }}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
)
/*
npm create vite@latest
React
javascript+SMC
cd react-app
npm i
npm i axios react-router-dom react-hot-toast
npm i sass
npm run dev


for run always: cd react-app
                npm run dev
*/