import React, {useState,useEffect} from 'react'
import axios from 'axios';
const UpdateInfo = () => {
 const [employee,setEmployee]  = useState({
    firstName:"",
    lastName:"",
    username:"",
    password:"",
    confirmPassword:"",
    clockedIn:""
 })
 useEffect(()=> {
     axios.get("http://localhost:8000/api/employee/" + employee._id)
     .then((res)=>{
         console.log(res.data)
         setEmployee(res.data)
     })
     .catch((err)=>{
         console.log(err)
     })
 },[])
}
export default UpdateInfo;