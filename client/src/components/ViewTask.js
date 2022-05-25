import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate,Link, useParams} from 'react-router-dom';
import Navbar from '../components/Navbar';

const ViewTask = (props) => {
    const [task,setTask] = useState({})
    const [employee,setEmployee] = useState({})
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(()=>{
        console.log(id)
        axios.get("http://localhost:8000/api/task/" + id)
            .then((res)=>{
                console.log(res.data)
                setTask(res.data)
                axios.get("http://localhost:8000/api/employee/" + res.data.createdBy)
                    .then((res)=>{
                        console.log(res.data)
                        setEmployee(res.data)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            })
            .catch((err)=>console.log(err))
    },[])
    const formatDate = (date) =>{
        return date.slice(0,10)
    }
    const completeHandler = (e) =>{
        e.preventDefault();
        axios.put('http://localhost:8000/api/task/'+ id,{
            completed: true
        },{
            withCredentials: true
        }
        )
        .then((res)=>{
            console.log(res)
            navigate('/completed_task')
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    const navigateHome = (e) =>{
        e.preventDefault();
        navigate('/home')
    }

    return(
        <div>
            <Navbar/>
            <h1>{task.name}</h1>
            <h2>{task.description}</h2>
            <p>Due Date: {task.dueDate ? formatDate(task.dueDate) : null}</p>
            <h3>Created By: {employee.firstName} {employee.lastName}</h3>
            <h4>Clocked in? {employee.clockedIn == '' ? 'False' : 'Currently Working'}</h4>
            <p>
                {employee.completed ? '' :<p><button onClick={completeHandler}>Complete</button> <button onClick={navigateHome}>Cancel</button></p>}
            </p>
            
        </div>
    )
}
export default ViewTask;