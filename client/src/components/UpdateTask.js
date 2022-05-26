import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const UpdateTask= () => {
    const [task, setTask] = useState({
        name: "",
        description: "",
        dueDate: ""
    });
    const [errors,setError] = useState({})
    const{id} = useParams ();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/task/${id}`)
            .then((res) => {
                console.log("task object",res.data)
                setTask(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    const updateHandler = (e) => {
        e.preventDefault();
        axios.put("http://localhost:8000/api/task/" + id,task,
        {withCredentials:true})
            .then((res)=>{
                console.log(res.data)
                navigate("/view/task/" + id)
            })
            .catch((err)=>{
                console.log(err)
                console.log("Response Error:",err.response)
                console.log("Response Object Validation:",err.response.data.errors)
                setError(err.response.data.errors)
            })
    }
    const handleChange = (e) => {
        const editTask = {...task}
        editTask[e.target.name] = e.target.value
        console.log(editTask)
        setTask(editTask)
    };
    function getDate(){
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();
        today = yyyy + '/' + mm + '/' + dd;
        console.log(today)
        return today
    }
    return (
        <div>
            <Navbar/>
            <h1> Update Task</h1>
            <form onSubmit={updateHandler}>
            <div>
                <label>
                    {
                    errors.name?
                    <span>{errors.name.message}</span>:
                    <span>Name</span>
                    }
                </label>
                <input type='text' name="name" value={task.name} onChange={handleChange}/>
            </div>
            <div>
            <label>
                    {
                    errors.description?
                    <span>{errors.description.message}</span>:
                    <span>Description</span>
                    }
                </label>
                <input type='text' name="description" value={task.description} onChange={handleChange} />
            </div>
            <div>
            <label>
                    {
                    errors.dueDate?
                    <span>{errors.dueDate.message}</span>:
                    <span>Due Date</span>
                    }
                </label>
                <input type='date' name="dueDate" value={task.dueDate} onChange={handleChange}></input>
            </div>
            <input type='submit' />
        </form>
        </div>
    )
}

export default UpdateTask;