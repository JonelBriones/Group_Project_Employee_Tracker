import { Link,useNavigate } from "react-router-dom";
import React, {useState,useEffect} from 'react';
import axios from "axios";
const Navbar = () => {
    const [employee,setEmployee] = useState({})
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:8000/api/employees/employee",{withCredentials:true})
            .then((res)=>{
                // console.log(res.data)
                setEmployee(res.data)
            })
            .catch((err)=>{
                console.log(err)
                navigate('/login&registration')
            })
    },[])
    return (
        <>
        <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to={"/home"}>Home</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/create_task">Add Task</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/completed_task">Completed Task</Link>
        </li>
        <li className="nav-item">
          <Link to={`/view/employee/${employee._id}`}className="nav-link">Logged in as {employee.firstName + " " + employee.lastName}</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </>

    )
}
export default Navbar;