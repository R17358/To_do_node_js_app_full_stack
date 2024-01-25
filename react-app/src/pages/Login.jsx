import React from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { useState } from 'react';
import { Context } from '../main';
import { server } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {

  const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitHadler = async(e)=>{
    setLoading(true);
    try {
     e.preventDefault();  //on Browser's console
     const {data} = await axios.post(server+'/users/login',{
        email, password,
     }, {
       headers:{
         "Content-Type":"application/json",
       },
       withCredentials: true,
     });
     
     toast.success(data.message);
     setIsAuthenticated(true);
     setLoading(false);
 
    } catch (error) {
     toast.error(error.response.data.message);
     setIsAuthenticated(false);
     setLoading(false);
    }
   };

  if(isAuthenticated){
    return <Navigate to = {"/"}></Navigate>
  }

  return (
    <div className='login'>
    <section>
      <form  onSubmit={submitHadler}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' required />
        <button disabled={loading} type="submit" placeholder='Login'>LogIn</button>
        <h4>Or</h4>
        <Link to = "/register">Sign Up</Link>
      </form>
    </section>
    </div>
  )
}
export default Login;