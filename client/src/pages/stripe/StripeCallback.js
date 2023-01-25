import { LoadingOutlined } from '@ant-design/icons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAccountStatus } from '../../actions/stripe'
import { updateUserInLocalStorage } from '../../actions/auth'
import { useNavigate } from 'react-router-dom'
const StripeCallback = () => {
    const dispatch = useDispatch()
    const Navigate = useNavigate()

    const { auth } = useSelector((state) => ({ ...state }))
    console.log(auth.token)



    const accountStatus = async () => {
        try {
            const res = await getAccountStatus(auth.token)
            updateUserInLocalStorage(res.data, () => {
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: res.data,
                });
                //redirecting to users dashboard
                window.location.href = '/dashboard/seller'

            });


        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        if (auth && auth.token) {
            accountStatus()

        }

    }, [auth])
    return (
        <div className="d-flex justify-content-center p-5">
            <LoadingOutlined className='display-1 p-5 text-danger' />
        </div>
    )
}

export default StripeCallback