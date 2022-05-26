import React from 'react';

import './Login.css'
const Registration = (props) => {
    const {onSubmitHandler,employee,errors,onChangeHandler,buttonText,confirmReg} = props;
    return (
        <div className='sign-up-container'>
            <h2>Sign Up</h2>
            <form onSubmit={onSubmitHandler}>
                <div>
                    {
                        confirmReg?
                    <h1>{confirmReg}</h1>:null
                    }
                </div>
                <div>
                    <label>
                        {
                        errors.firstName?
                        <span>{errors.firstName.message}</span>:
                        <span>First Name</span>
                        }
                    </label>
                    <input type="text" name="firstName" value={employee.firstName} onChange={(e)=>onChangeHandler(e)}></input>
                </div>
                <div>
                <label>
                        {
                        errors.lastName?
                        <span>{errors.lastName.message}</span>:
                        <span>Last Name</span>
                        }
                    </label>
                    <input type="text" name="lastName" value={employee.lastName} onChange={(e)=>onChangeHandler(e)}></input>
                </div>
                <div>
                <label>
                        {
                        errors.username?
                        <span>{errors.username.message}</span>:
                        <span>Username</span>
                        }
                    </label>
                    <input type="text" name="username" value={employee.username} onChange={(e)=>onChangeHandler(e)}></input>
                </div>
                <div>
                <label>
                        {
                        errors.password?
                        <span>{errors.password.message}</span>:
                        <span>Password</span>
                        }
                    </label>
                    <input type="text" name="password" value={employee.password} onChange={(e)=>onChangeHandler(e)}></input>
                </div>
                <div>
                <label>
                        {
                        errors.confirmPassword?
                        <span>{errors.confirmPassword.message}</span>:
                        <span>Confirm Password</span>
                        }
                    </label>
                    <input type="text" name="confirmPassword" value={employee.confirmPassword} onChange={(e)=>onChangeHandler(e)}></input>
                </div>
                <div>
                    <button type="submit" class="btn1 btn-primary">{buttonText}</button>
                </div>
            </form>
        </div>
    )
}
export default Registration;
