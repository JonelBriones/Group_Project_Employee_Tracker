import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Home = (props) => {
    const [employee,setEmployee] = useState({})
    const navigate = useNavigate();
    const [allEmployees,setAllEmployees] = useState([])
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
    const redirect = (url) => {
        navigate(url);
    }
    var currentdate = new Date();
    // var dateTime = `Clocked In at: ${currentdate.getDate()}/${currentdate.getMonth()}/${currentdate.getFullYear()} at ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`

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
    return (
        <div>
            {
                employee._id===undefined?
            <button onClick={()=>redirect('/login&registration')}>Login Button</button>:
            <div>
                <h1>Hello {employee.firstName + " " + employee.lastName}</h1>
                {
                    employee.clockedIn===""?
                    <form onSubmit={clockIn}>
                        {/* <input type="hidden" name="clockedIn" value={employee.clockedIn}></input> */}
                    <button type="submit">Clock In</button>
                </form>:<form onSubmit={clockOut}>
                    <button type="submit">Clock Out</button>
                </form>
                }
                <p>{employee.clockedIn}</p>
                {
            allEmployees.map((oneEmployee)=>(
                <div key={oneEmployee._id}>
                    {
                        oneEmployee.clockedIn!="" && oneEmployee._id !== employee._id?
                        oneEmployee.firstName:null
                    }
                </div>
            ))
        }
            </div>
            }
        </div>
    )
}
export default Home;