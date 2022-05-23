import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Registration from '../components/Registration';
import Login from '../components/Login';
const LogReg = () => {
    const navigate = useNavigate();
    const [confirmReg,setConfirmReg] = useState('')
    const [errors,setError] = useState({})
    const [employee,setEmployee] = useState({
        firstName:"",
        lastName:"",
        username:"",
        password:"",
        confirmPassword:""
    })

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/employee/register',employee)
            .then((res)=>{
                console.log(res.data)
                setEmployee({
                    firstName:"",
                    lastName:"",
                    username:"",
                    password:"",
                    confirmPassword:""
                })
                setConfirmReg("Thank you for Registering, you can now log in!")
                setError({})
            })
            .catch((err)=>{
                console.log(err.response.data.errors)
                setError(err.response.data.errors)
            })
    }
    
    const onChangeHandler = (e) => {
        const newEmployeeObject = {...employee};
        newEmployeeObject[e.target.name] = e.target.value;
        console.log(newEmployeeObject)
        setEmployee(newEmployeeObject)
    }

    // Login
    const [loginErrors,setLoginError] = useState("")
    const [employeeLogin,setEmployeeLogin] = useState({
        username: "",
        password: ""
    })

    const onSubmitHandlerLogin = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/employee/login',employeeLogin,{withCredentials:true})
            .then((res)=>{
                console.log(res.data)
                navigate('/home');
            })
            .catch((err)=>{
                console.log(err.response.data.message)
                setLoginError(err.response.data.message)
                setEmployeeLogin({
                    username:"",
                    password:""
                })
            })
    }

    const onChangeHandlerLogin = (e) => {
        const employeeObject = {...employeeLogin};
        employeeObject[e.target.name] = e.target.value;
        console.log(employeeObject)
        setEmployeeLogin(employeeObject)
    }
    return (
        <div>
            <Registration
            onSubmitHandler={onSubmitHandler}
            onChangeHandler={onChangeHandler}
            employee={employee}
            errors={errors}
            confirmReg={confirmReg}
            buttonText={'Create Account'}
            />
            <Login
                onSubmitHandler={onSubmitHandlerLogin}
                onChangeHandler={onChangeHandlerLogin}
                employee={employeeLogin}
                errors={loginErrors}
                buttonText={'Login'}
            />
        </div>
    )
}
export default LogReg;