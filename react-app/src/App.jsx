
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/register";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { server } from "./main";
import { Context } from "./main";
import axios from "axios";

function App() {

  const {setUser, setIsAuthenticated, setLoading} = useContext(Context);

  useEffect(() => {

    setLoading(true);

    axios.get(server + "/users/me", {
      withCredentials: true,
    }).then(res=>{
      setUser(res.data.user);
      setIsAuthenticated(true);
      setLoading(false);
    }).catch((error)=>{
      setUser({});
      setIsAuthenticated(false);
      setLoading(false);
    })

  }, [])


  return  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route> 
    </Routes>
    <Toaster></Toaster>
  </Router>;
}

export default App;
