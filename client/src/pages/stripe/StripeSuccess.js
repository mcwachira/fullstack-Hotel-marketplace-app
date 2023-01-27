import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { stripeSuccessRequest } from '../../actions/stripe'
import { LoadingOutlined } from '@ant-design/icons'

const StripeSuccess = () => {

    const { auth } = useSelector((state) => ({ ...state }))
    const { hotelId } = useParams()
    const Navigate = useNavigate()
    console.log(hotelId)


    const stripeSuccess = async () => {
        const res = await stripeSuccessRequest(auth.token, hotelId)

        if (res.data.success) {
            Navigate('/dashboard')
        } else {
            Navigate('/stripe/cancel')
        }
        console.log(res)

    }


    useEffect(() => {
        stripeSuccess()
    }, [hotelId])
    return (
        <div className="container">
            <div className="col text-center p-5">
                <LoadingOutlined className='display-1 text-danger' />
            </div>

        </div>
    )
}

export default StripeSuccess