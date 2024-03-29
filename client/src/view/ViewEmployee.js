import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate,useParams,Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
const ViewEmployee = () => {
    const [employee,setEmployee] = useState({})
    const {id} = useParams();
    const [task,setTask] = useState([])
    const navigate = useNavigate();
    useEffect(()=>{
        console.log(id)
        axios.get("http://localhost:8000/api/employee/" + id)
            .then((res)=>{
                console.log(res.data)
                setEmployee(res.data)
            })
            .catch((err)=>console.log(err))
    },[])
    useEffect(()=>{
        axios.get("http://localhost:8000/api/task")
            .then((res)=>{
                console.log(res.data)
                setTask(res.data)
            })
            .catch((err)=>console.log(err))
    },[])
    const redirect = (url) => {
        navigate(url)
    }
    const formatDate = (date) =>{
        return date.slice(0,10)
    }
    return (
        <>
            <Navbar/>
            <h1>{employee.firstName}</h1>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Completed?</th>
                    <th scope="col">Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        task.map((oneTask,index)=>(
                            <tr key={oneTask._id} >
                                {
                                    oneTask.createdBy._id === id?
                                    <>
                                    <th scope="row">{index+1}</th>
                                    <td onClick={()=>redirect(`/view/task/${oneTask._id}`)} className="table-link">{oneTask.name}</td>
                                    <td>
                                        {oneTask.completed ? "Completed" : "Incompleted"}
                                    </td>
                                    <td>{formatDate(oneTask.dueDate)}</td>
                                    </>:null
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}
export default ViewEmployee;