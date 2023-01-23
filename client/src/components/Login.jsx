import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { login } from '../actions/auth';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
    const [formData, setFormData] = useState({


        email: "",
        password: "",

    })

    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const handleChange = (e) => {

        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await login({

                email: formData.email,
                password: formData.password,

            })

            if (res) {
                //save to local storage
                window.localStorage.setItem('auth', JSON.stringify(res.data))
            }

            dispatch({
                type: 'LOGGED_IN_USER',
                payload: res.data
            })

            toast.success('Login successfully')
            Navigate('/')
        } catch (error) {
            if (error.response.status) {
                toast.error(error.response.data.message)
            }
        }



    }
    const { email, password } = formData
    return (

        <>

            <form onSubmit={handleSubmit} className='md-3'>

                <div className="form-group mb-3">
                    <label className='form-label'> Email</label>
                    <input type='email' name='email' className='form-control' placeholder='Enter email' value={email} onChange={handleChange} />
                </div>
                <div className="form-group mb-3">
                    <label className='form-label'> Password</label>
                    <input type='password' name='password' className='form-control' placeholder='Enter password' value={password} onChange={handleChange} />
                </div>

                <button disabled={!email || !password} className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default LoginForm