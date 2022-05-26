import React from 'react';

const Login = (props) => {
    const {onSubmitHandler,employee,errors,onChangeHandler,buttonText} = props;
    return (
        <div className="sign-un-container">
            <form onSubmit={onSubmitHandler}>
            <div>
            <label>
                    {
                    errors?
                    <span>{errors}</span>:
                    <span>Username</span>
                    }
                </label>
                <input type="text" name="username" value={employee.username} onChange={(e)=>onChangeHandler(e)}></input>
            </div>
            <div>
            <label>
                    {
                    errors?
                    <span>{errors}</span>:
                    <span>Password</span>
                    }
                </label>
                <input type="text" name="password" value={employee.password} onChange={(e)=>onChangeHandler(e)}></input>
            </div>
            <div className="btn2">
                <button type="submit" class="btn1 btn-primary">{buttonText}</button>
            </div>
        </form>
        </div>
    )
}
export default Login;
