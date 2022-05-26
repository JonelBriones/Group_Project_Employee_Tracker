import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const VersionTwoUpdateTask= () => {
    const [task, setTask] = useState({});
    const{id} = useParams ();
    const navigate = useNavigate();
    const [errors,setError] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:8000/api/task/${id}`)
            .then((res) => {
                console.log(res.data)
                setTask(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    const SubmitHandler= (e) =>{
        e.preventDefault();
        const updateTask = {
            name: task.name,
            description: task.description,
            dueDate: task.dueDate
        };
        console.log("updateTask", updateTask);
        axios
            .put(`http://localhost:8000/api/task/${id}`, task)
            .then((res) => {
                navigate("/view/task/" + id)
            })
            .catch((err) => {
                console.log(err)
                console.log("Response Error:",err.response)
                console.log("Response Object Validation:",err.response.data.errors)
                setError(err.response.data.errors)
            });
    };
    const handleChange = (e) => {
        setTask({...task, [e.target.id]: e.target.value});
    };
    console.log("task",task );
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
            <h1> Add Task</h1>
            <form onSubmit={SubmitHandler}>
                <div>
                <label>
                    {
                    errors.name?
                    <span>{errors.name.message}</span>:
                    <span>Name</span>
                    }
                </label>
                    <input 
                        type='text' 
                        id='name'
                        onChange={ handleChange}
                        value={task.name}/>
                </div>
                <div>
                <label>
                    {
                    errors.description?
                    <span>{errors.description.message}</span>:
                    <span>Description</span>
                    }
                </label>
                    <input
                        type='text'
                        id='description'
                        onChange={handleChange}
                        value={task.description}
                        />
                </div>
                <div>
                <label>
                    {
                    errors.dueDate?
                    <span>{errors.dueDate.message}</span>:
                    <span>Due Date</span>
                    }
                </label>
                    <input 
                        type='date'
                        id='dueDate'
                        onChange={handleChange} 
                        value={task.dueDate}>
                    </input>
                </div>
                <input type='submit' />
            </form>
        </div>
    )
}

export default VersionTwoUpdateTask;