import React, { useEffect, useState } from 'react'
import { getHotelById, isAlreadyBooked } from '../../actions/hotel'
import { useParams, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { differenceInDays } from '../../utils/DifferenceInDays'
import { useSelector } from 'react-redux'
import { getSessionId } from '../../actions/stripe'
import { loadStripe } from '@stripe/stripe-js'
const ViewHotel = () => {

    const [hotel, setHotel] = useState({})
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)
    const [alreadyBooked, setAlreadyBooked] = useState(false)


    const { hotelId } = useParams()
    console.log(hotelId)
    const Navigate = useNavigate()

    const { auth } = useSelector((state) => ({ ...state }))
    const fetchHotelById = async () => {
        const response = await getHotelById(hotelId)
        //console.log(response.data)
        setHotel(response.data)
        setImage(`${process.env.REACT_APP_API}/hotels/image/${response.data._id}`)
    }



    const handleClick = async (e) => {
        e.preventDefault()
        if (!auth || !auth.token) {
            Navigate('/login')
            return

        };

        const response = await getSessionId(auth.token, hotelId)
        console.log(response.data)

        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
        stripe.redirectToCheckout({
            sessionId: response.data.sessionId,
        }).then((result) => console.log(result))
        setLoading(true)
    }
    useEffect(() => {

        fetchHotelById()
    }, [])


    //check if hotel is booked

    const isHotelBooked = async () => {
        const res = await isAlreadyBooked(auth.token, hotelId)

        if (res.data.ok) setAlreadyBooked(true)
        console.log(res.data)
    }
    useEffect(() => {

        if (auth && auth.token) {

            isHotelBooked()
        }
    }, [])
    return (
        <>

            <div className="container-fluid bg-secondary p-5 text-center">
                <h2>
                    {hotel.title}
                </h2>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <br />
                        <img src={image} alt={hotel.title} className='img img-fluid m-2' />
                    </div>

                    <div className="col-md-6">
                        <br />
                        <b>
                            {hotel.content}
                        </b>
                        <p className="alert alert-info mt-3">
                            ${hotel.price}
                        </p>
                        <p className="card-text">
                            <span className="float-right text-primary">
                                for {differenceInDays(hotel.from, hotel.to)} {" "}{differenceInDays(hotel.from, hotel.to) <= 1 ? 'day' : "days"}
                            </span>
                        </p>

                        <p>
                            Form <br /> {moment(new Date(hotel.from)).format('MMMM DD YYYY, h:mm:ss a')}
                        </p>

                        <p>
                            To <br /> {moment(new Date(hotel.to)).format('MMMM DD YYYY, h:mm:ss a')}
                        </p>

                        <i>
                            Posted By {hotel.postedBy && hotel.postedBy.name}
                        </i>
                        <br />

                        <button className="btn btn-block btn-lg btn-primary mt-3" onClick={handleClick} disabled={alreadyBooked || loading} >
                            {loading ? "Loading " : alreadyBooked ? 'Already Booked' : auth && auth.token ? 'Book Now' : 'login to Book'}

                        </button>
                    </div>
                </div>
            </div>



        </>
    )
}

export default ViewHotel