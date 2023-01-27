import React, { useState } from 'react'
import { currencyFormatter } from '../utils/CurrencyFormatter'
import { differenceInDays } from '../utils/DifferenceInDays'
import { useNavigate, Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

const HotelCards = ({ hotel, owner = false, showViewMoreBUtton = true, handleDelete }) => {
    const Navigate = useNavigate()
    const { auth } = useSelector((state) => ({ ...state }))


    return (
        <div className="card mb-3">
            <div className="row no-gutters">'

                <div className="col md-4">
                    {hotel.image && hotel.image.contentType ? (
                        <img src={`${process.env.REACT_APP_API}/hotels/image/${hotel._id}`}
                            alt={hotel.title}
                            className='card-image img img-fluid' />
                    ) : (
                        <img src="https://via.placeholder.com/900x500.png?text=Mern+Booking"
                            alt="default hotel image"
                            className='card-image img img-fluid' />
                    )}

                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h3 className="card-title">{hotel.title}
                            {"   "}
                            <span className="float-right text-primary">
                                {currencyFormatter({ amount: hotel.price * 100, currency: 'usd' })}
                            </span></h3>

                        <p className="alert alert-info">
                            {hotel.location}
                        </p>
                        <p className="card-text">
                            {`${hotel.content.substring(1, 200)}...`}
                        </p>
                        <p className="card-text">
                            <span className="float-right text-primary">
                                for {differenceInDays(hotel.from, hotel.to)} {" "}{differenceInDays(hotel.from, hotel.to) <= 1 ? 'day' : "days"}
                            </span>
                        </p>
                        <p className="card-text">
                            {hotel.bed} {hotel.bed <= 1 ? "bed" : "beds"}
                        </p>
                        <p className="card-text">
                            Available from {new Date(hotel.from).toLocaleDateString()}
                        </p>




                        <div className="d-flex justify-content-between h4">
                            {showViewMoreBUtton && <button className="btn btn-primary" onClick={() => Navigate(`/hotel/view/${hotel._id}`)}>
                                Show More
                            </button>}


                            {owner && <>
                                <Link to={`/hotel/edit/${hotel._id}`}>
                                    <EditOutlined className='text-warning' />
                                </Link>

                                <DeleteOutlined onClick={() => handleDelete(hotel._id)} className='text-danger' />
                            </>}


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotelCards