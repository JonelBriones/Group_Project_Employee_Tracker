import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
const ViewEmployee = () => {
    const [employee,setEmployee] = useState({})
    const {id} = useParams();
    const [task,setTask] = useState([])
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
                    <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        task.map((oneTask,index)=>(
                            <tr key={oneTask._id} >
                                <th scope="row">{index}</th>
                                {
                                    oneTask.createdBy._id === id?
                                    <>
                                    <td>{oneTask.name}</td>
                                    <td>
                                        {/* {
                                            employee.
                                        } */}
                                    </td>
                                    <td>{oneTask.dueDate}</td>
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