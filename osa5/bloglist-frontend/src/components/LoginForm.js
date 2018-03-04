import React from 'react'

const LoginForm = ({ handleSubmit, handleStateChange, username, password }) => {
    return (
        <div>
            <h2>Login</h2>
            <form className='loginForm' onSubmit={handleSubmit}>
                <div className='userName'>
                Username
                <input type="text" name="username" value={username} onChange={handleStateChange}/>
                </div>
                <div className='passWord'>
                Password
                <input type="password" name="password" value={password} onChange={handleStateChange}/>
                </div>
                <button className='loginButton' type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm