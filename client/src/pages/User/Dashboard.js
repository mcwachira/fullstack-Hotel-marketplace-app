import React, { useState, useEffect } from 'react'
import DashboardNav from '../../components/DashboardNav'
import ConnectNav from '../../components/ConnectNav'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUserBookings } from '../../actions/hotel'
import BookingCard from '../../components/BookingCard'

const Dashboard = () => {

    const [booking, setBooking] = useState([])

    const { auth } = useSelector((state) => ({ ...state }))

    const loadBookings = async () => {

        const res = await getUserBookings(auth.token)
        console.log(res.data)
        setBooking(res.data)

    }

    useEffect(() => {
        loadBookings()
    }, [])
    return (
        <>
            <div className="container-fluid bg-secondary p-5">
                <ConnectNav />
            </div>
            <div className="container-fluid p-4">
                <DashboardNav />

            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <h2>
                            Your Bookings
                        </h2>
                    </div>
                    <div className="col-md-2">
                        <Link to='/' className='btn btn-primary'>
                            Browse Hotels
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row">
                {booking.map((bookingData) => (
                    <BookingCard key={bookingData._id} hotel={bookingData.hotel} session={bookingData.session} orderedBy={bookingData.orderedBy} />
                ))}
            </div>
        </>
    )
}

export default Dashboard