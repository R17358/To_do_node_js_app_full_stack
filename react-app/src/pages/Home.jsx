import axios from 'axios';
import React, { useEffect } from 'react'           //type rafc  but first download extension react es7
import { useState } from 'react';
import { server } from '../main';
import toast from 'react-hot-toast';
import TodoItem from '../components/TodoItem';
import { Context } from '../main';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';


export const Home = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const {isAuthenticated } = useContext(Context);

  const updateHandler= async(id)=>{

    try {
    const {data} =  await axios.put(server+"/tasks/"+id,{},{withCredentials: true})
    toast.success(data.message);
    setRefresh(prev=>!prev)
    } catch (error) {
      toast.error(error.response.data.message);
    }
    
  }
  const deleteHandler=async(id)=>{
    try {
      const {data} =  await axios.delete(server+"/tasks/"+id,{withCredentials: true})
      toast.success(data.message);
      setRefresh(prev=>!prev)
      } catch (error) {
        toast.error(error.response.data.message);
      }
  }



  const submitHadler = async(e) =>{
    e.preventDefault();
    setLoading(true);
    try {
      const {data}  = await axios.post(server+"/tasks/new",
      {
        title,
        description,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
      );
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh(prev=>!prev)

    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    axios.post(server + "/tasks/myTasks",{},{
      withCredentials: true,
    }).then(res=> {
      setTasks(res.data.tasks);
    }).catch((e)=>{
      toast.error(e.response.data.message);
    });
  },[refresh]);

  
  if(!isAuthenticated){
    return <Navigate to = {"/login"}></Navigate>
  }

  return <div className="container">
    <div className="login">
    <section className="todosContainer">
     <form  onSubmit={submitHadler}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Title' required />
        <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder='Description' required />
        <button disabled={loading} type="submit" placeholder='Login'>Add Task</button>  
    </form>
  </section>
    </div>

    <section className='todoContainer'>
      {
        tasks.map(i=>(
         <TodoItem title={i.title} description={i.description} isCompleted={i.isCompleted} updateHandler = {updateHandler} deleteHandler={deleteHandler} id={i._id} key={i._id} />
        ))
      }
    </section>
  </div>
}

export default Home;
