import React, { useState, useEffect } from 'react'
import DashboardNav from '../../components/DashboardNav'
import ConnectNav from '../../components/ConnectNav'
import { Link } from 'react-router-dom'
//import { useSyncExternalStore } from 'react'
import { useSelector } from 'react-redux'
import { createConnectAccount } from '../../actions/stripe'
import {
    HomeOutlined, TaobaoOutlined,

} from '@ant-design/icons';
import { toast } from 'react-toastify'
import { deleteHotel, getSellerHotels } from '../../actions/hotel'
import HotelCards from '../../components/HotelCards'

const DashboardSeller = () => {

    const { auth } = useSelector((state) => ({ ...state }))


    const [hotels, setHotels] = useState([])
    const [loading, setLoading] = useState(false)
    //    console.log(auth)

    const handleClick = async () => {
        setLoading(true)
        try {
            const res = await createConnectAccount(auth.token)
            console.log(res)
            window.location.href = res.data
        } catch (error) {
            console.log(error)
            toast.error('Stripe connection failed try again')

        }

    }


    const showSelersHotels = async (authToken) => {

        const res = await getSellerHotels(authToken)

        setHotels(res.data)

    }

    //not necesary to recieve token from child component
    const handleDelete = async (id, token) => {
        if (!window.confirm('Are you suure?')) return
        console.log(auth.token)
        const response = await deleteHotel(id, auth.token)
        if (response) {
            toast.success('deleted hotel succesfully')
            showSelersHotels()
        } else {
            toast.error('error deleting hotel')
        }
    }

    useEffect(() => {

        showSelersHotels(auth.token)
    }, [])
    const connected = () => (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <h2>
                        Your Hotels
                    </h2>
                </div>
                <div className="col-md-2">
                    <Link to='/new' className='btn btn-primary'>
                        + Add New
                    </Link>

                    {/* <Link to='/' className='btn btn-primary'>
                        Browse Hotels
                    </Link> */}
                </div>
            </div>

            <div className="row">
                {hotels.map((hotel) => <HotelCards key={hotel._id} hotel={hotel} showViewMoreBUtton={false} owner={true} handleDelete={handleDelete} />)}
            </div>
        </div>
    )

    const notConnected = () => (
        <div className="container-fluid">
            <div className="row">

                <div className="col-md-6 offset-md-3 text-center">
                    <div className="p-5 pointer">
                        <HomeOutlined className='h1' />
                        <h4>
                            Set Up payments to post hotel rooms
                        </h4>

                        <p className="lead">
                            Mern Patners with stripe to transfer earnings to your bank account
                        </p>
                        <button className="btn btn-primary mb-3" onClick={handleClick} disabled={loading}>
                            {loading ? "processing payments ..." : " Setup Payouts"}

                        </button>

                        <div className="text-muted">
                            <small>
                                You will be directed to stripe to complete the on boarding
                            </small>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
    return (
        <>
            <div className="container-fluid bg-secondary p-5">
                <ConnectNav />
            </div>
            <div className="container-fluid p-4">
                <DashboardNav />

            </div>

            {auth &&
                auth.user &&
                auth.user.stripe_seller &&
                auth.user.stripe_seller.charges_enabled
                ? connected()
                : notConnected()}



        </>
    )
}



export default DashboardSeller