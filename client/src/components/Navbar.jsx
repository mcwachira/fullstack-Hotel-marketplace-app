import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'


const Navbar = () => {
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    const { auth } = useSelector((state) => (state))
    console.log(auth)

    const logout = () => {

        dispatch({
            type: 'LOGGED_IN_USER',
            payload: null
        })

        window.localStorage.removeItem('auth')
        toast.success('Logged out')
        Navigate('/login')
    }

    return (
        <>
            <div className="nav bg-light d-flex justify-content-center">
                <Link className="nav-link" to='/'>
                    Home
                </Link>

                {auth !== null && (
                    <>

                        <Link className="nav-link" to='/dashboard'>
                            Dashboard
                        </Link>
                        <a className="nav-link" onClick={logout}>
                            LogOut
                        </a>

                    </>
                )}
                {auth === null && (<>
                    <Link className="nav-link" to='/login'>
                        Login
                    </Link>
                    <Link className="nav-link" to='/register'>
                        Register
                    </Link>

                </>

                )
                }


            </div>

            <Outlet />
        </>

    )
}

export default Navbar