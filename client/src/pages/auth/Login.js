import React from 'react'
import LoginForm from '../../components/Login'

const Login = () => {
    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                <h1>
                    Login
                </h1>


            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </>

    )
}

export default Login