import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = (props) => {
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
    var currentdate = new Date();

    Date.prototype.today = function () { 
        return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
    }
    
    // For the time now
    Date.prototype.timeNow = function () {
         return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
    }
    var dateTime = "Clocked In at: " + currentdate.today() + " @ " + currentdate.timeNow();

    const clockIn = (e) => {
    e.preventDefault();
    employee.clockedIn = dateTime;
    axios.put('http://localhost:8000/api/employee/edit/' + employee._id,employee,{withCredentials:true})
        .then((res)=>{
            console.log(res.data)
            navigate("/home")
        })
        .catch((err)=>{
            console.log(err.response.data.errors)
        })
    }
    const clockOut = (e) => {
        e.preventDefault();
        employee.clockedIn = "";
        axios.put('http://localhost:8000/api/employee/edit/' + employee._id,employee,{withCredentials:true})
            .then((res)=>{
                console.log(res.data)
                navigate("/login&registration")

            })
            .catch((err)=>{
                console.log(err.response.data.errors)
            })
        }
    const formatDate = (date) =>{
        return date.slice(0,10)
    }
    const deleteTask = (taskId) =>{
        axios.delete(`http://localhost:8000/api/task/${taskId}`)
            .then((res)=>{
                console.log(res.data)
                setUncompletedTasks(uncompletedTasks.filter((task, index) => task._id !== taskId))
                navigate(`/home`)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    return (
        <div>
            <Navbar/>
            {
                employee._id===undefined?
            <button onClick={()=>redirect('/login&registration')} className="btn btn-primary">Login Button</button>:
            <div>
                {/* <h1>Logged in as {employee.firstName + " " + employee.lastName}</h1> */}
                {
                    employee.clockedIn==="" || employee.clockedIn===undefined?
                    <form onSubmit={clockIn}>
                        {/* <input type="hidden" name="clockedIn" value={employee.clockedIn}></input> */}
                    <button type="submit">Clock In</button>
                </form>:<form onSubmit={clockOut}>
                    <button type="submit">Clock Out</button>
                </form>
                }
                <p>{employee.clockedIn}</p>
                <h1>Online</h1>
                {
                    allEmployees.map((oneEmployee)=>(
                        <div key={oneEmployee._id}>
                            {
                                oneEmployee.clockedIn!=="" && oneEmployee._id !== employee._id?
                                <Link to={"/view/employee/" + oneEmployee._id}>
                                {oneEmployee.firstName + " " + oneEmployee.lastName}
                                </Link>
                                :null
                            }
                        </div>
                    ))
                }
                <h1>Uncompleted Tasks</h1>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Completed?</th>
                        <th scope="col">Date</th>
                        <th scope="col">Created By</th>
                        <th scope='col'>Actions</th>
                        </tr>
                    </thead>
                {
                    uncompletedTasks.map((oneTask, index) =>(
                        <tbody>
                        {
                            oneTask.completed ? "" :
                            <tr key={index}>
                                <td>{index}</td>
                                <td onClick={()=>redirect(`/view/task/${oneTask._id}`)} className="table-link">{oneTask.name}</td>
                                <td>False</td>
                                <td>{formatDate(oneTask.dueDate)}</td>
                                <td onClick={()=>redirect(`/view/employee/${oneTask.createdBy._id}`)} className="table-link">{oneTask.createdBy.username}</td>
                                <td>
                                {oneTask.createdBy._id === employee._id ? 
                                <p><button onClick={(e)=>{deleteTask(oneTask._id)}}> Delete</button></p>
                                : <button onClick={()=>redirect(`/view/task/${oneTask._id}`)} className="table-link">View</button>}
                                </td>
                                
                            </tr>
                        }
                        </tbody>

                    ))
                }
                </table>
            </div>
            }
        </div>
    )
}
export default Home;