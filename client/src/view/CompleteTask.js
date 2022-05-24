import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CompleteTask = (props) => {
    const [employee,setEmployee] = useState({})
    const navigate = useNavigate();
    const [allEmployees,setAllEmployees] = useState([])
    const [uncompletedTasks, setUncompletedTasks] = useState([])
    useEffect(()=> {
        axios.get("http://localhost:8000/api/employees")
            .then((res)=>{
                console.log(res.data)
                setAllEmployees(res.data)
            })
            .catch((err)=>console.log(err))
    },[])
    useEffect(() => {
        axios.get("http://localhost:8000/api/employees/employee",{withCredentials:true})
            .then((res)=>{
                console.log(res.data)
                setEmployee(res.data)
            })
            .catch((err)=>{
                console.log(err)
                navigate('/login&registration')
            })
    },[])
    useEffect(()=>{
        axios.get("http://localhost:8000/api/task")
            .then((res)=>{
                console.log(res.data)
                setUncompletedTasks(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    },[])
    const redirect = (url) => {
        navigate(url);
    }
    const formatDate = (date) =>{
        return date.slice(0,10)
    }

    return(
        <div>
            <Navbar/>
            <h1>Completed Tasks</h1>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Date Submited</th>
                        <th scope="col">Task Name</th>
                        <th scope="col">Completed?</th>
                        <th scope="col">Date</th>
                        </tr>
                    </thead>
                {
                    uncompletedTasks.map((oneTask, index) =>(
                        <tbody>
                        {
                            oneTask.completed ? 
                            <tr key={index}>
                                <td>{formatDate(oneTask.createdAt)}</td>
                                <td>{oneTask.name}</td>
                                <td>Completed</td>
                                <td>{formatDate(oneTask.dueDate)}</td>
                            </tr> 
                            : ""
                        }
                        </tbody>

                    ))
                }
                </table>
            </div>
    )
}
export default CompleteTask;