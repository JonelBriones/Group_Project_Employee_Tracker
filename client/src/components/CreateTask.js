import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './AddTask.css';

const CreateTask = () => {
    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
        clockedIn: ""
    })
    const addTask = "Create a Task"
    const add = "Add"
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [errors, setErrors] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:8000/api/employees/employee",
        {
            withCredentials: true
        })
            .then((res) => {
                console.log(res.data)
                setEmployee(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    const onSubmitHandler = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/task',{
            name,
            description,
            dueDate
        },{
            withCredentials: true
        }
        )
        .then((res)=>{
            console.log(res)
            if(res.data.errors) {
                console.log(res.data.errors)
                setErrors(res.data.errors);
            }
            else{
                navigate(`/home`)
            }
        })
        .catch((err)=>{
            console.log(err)
        }) 
    }
    function getDate(){
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();
        today = yyyy + '/' + mm + '/' + dd;
        console.log(today)
        return today
    }
return(
    <div className="task-box">
        <Navbar/>
        <h1>{addTask}</h1>
        <div className="task-container">
            <form onSubmit={onSubmitHandler}>
                <div className ="task">
                    {errors.name ? <p>{errors.name.message}</p> : null}
                    <label>Task:</label>
                    <input type='text' onChange={(e)=> setName(e.target.value)} value={name} className="box1"/>
                </div>
                <div className ="task">
                {errors.description ? <p>{errors.description.message}</p> : null}
                    <label>Description:</label>
                    <input input type='text' onChange={(e)=> setDescription(e.target.value)} value={description} className="box2"/>
                </div>
                <div className ="task">
                    {errors.dueDate ? <p>{errors.dueDate.message}</p> : null}
                    <label>Due Date:</label>
                    <input type='date' onChange={(e)=> setDueDate(e.target.value)} value={dueDate} className="box3"></input>
                </div>
                <button type='submit' className="btn btn-primary">{add}</button>
            </form>
        </div>
    </div>
)
}
export default CreateTask;
