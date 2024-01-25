import React from 'react'
import { useContext } from 'react';
import { Context } from '../main';
import Loader from '../components/loader';

export const Profile = () => {

  const {isAuthenticated, user, loading } = useContext(Context);
 // console.log(user);

  return (
    loading ? <Loader /> : (
      <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
    )
   
  )
}

export default Profile;
