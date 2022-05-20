import React from 'react';

const Login = (props) => {
    const {onSubmitHandler,employee,errors,onChangeHandler,buttonText} = props;
    return (
        <div>
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
            <div>
                <button type="submit">{buttonText}</button>
            </div>
        </form>
        </div>
    )
}
export default Login;