import React from 'react'
import { Link, Outlet } from 'react-router-dom'



const Navbar = () => {
    return (
        <>
            <div className="nav bg-light d-flex justify-content-center">
                <Link className="nav-link" to='/'>
                    Home
                </Link>
                <Link className="nav-link" to='/login'>
                    Login
                </Link>
                <Link className="nav-link" to='/register'>
                    Register
                </Link>

            </div>

            <Outlet />
        </>

    )
}

export default Navbar