import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Context } from "../main";
import { server } from '../main';
import axios from "axios";
import toast from 'react-hot-toast';

export const Header = () => {

  const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);
  //console.log(isAuthenticated);

  const logoutHadler = async()=>{                            // for logout
    setLoading(true);                                       //load until message not come
    try {
      await axios.get(server+'/users/logout',
     {
       withCredentials: true,
     });
     
     toast.success("LogOut Successfully");
     setIsAuthenticated(false);       //false
     setLoading(false);
 
    } catch (error) {
     toast.error(error.response.data.message);
     setIsAuthenticated(true);        //true
     setLoading(false);
    }
   };


  return (
   <nav className='header'>
    <div>
        <h2>
          Todo App.      
        </h2>
    </div>
    <article>
       <Link to = {"/"}>Home</Link>
       <Link to = {"/profile"}>Profile</Link>
       {
        isAuthenticated ? (<button disabled={loading} onClick={logoutHadler} className='btn'>LogOut</button>) : (<Link to = {"/login"}>Login</Link>)
       }
    </article>
   </nav>
  )
};

export default Header;

