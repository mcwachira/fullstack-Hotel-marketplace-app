import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../actions/auth';

const RegisterForm = () => {
    const [formData, setFormData] = useState({

        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

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
            const res = await register({
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
            })

            toast.success('Registered successfully please login')
            Navigate('/login')
        } catch (error) {
            if (error.response.status) {
                toast.error(error.response.data.message)
            }
        }



    }
    const { fullName, email, password, confirmPassword } = formData
    return (

        <>

            <form onSubmit={handleSubmit} className='md-3'>
                <div className="form-group mb-3">
                    <label> Full Name</label>
                    <input type='text' name='fullName' className='form-control' placeholder='Enter fullName' value={fullName} onChange={handleChange} />
                </div>
                <div className="form-group mb-3">
                    <label className='form-label'> Email</label>
                    <input type='email' name='email' className='form-control' placeholder='Enter email' value={email} onChange={handleChange} />
                </div>
                <div className="form-group mb-3">
                    <label className='form-label'> Password</label>
                    <input type='password' name='password' className='form-control' placeholder='Enter password' value={password} onChange={handleChange} />
                </div>
                <div className="form-group mb-3">
                    <label className='form-label'> Confirm Password</label>
                    <input type='password' name='confirmPassword' className='form-control' placeholder='Repeat password' value={confirmPassword} onChange={handleChange} />
                </div>
                <button disabled={!fullName || !email || !password || !confirmPassword} className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default RegisterForm