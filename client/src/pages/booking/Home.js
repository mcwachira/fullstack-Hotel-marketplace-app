import React, { useEffect, useState } from 'react'
import { fetchHotels } from '../../actions/hotel'
import HotelCards from '../../components/HotelCards'

const Home = () => {

    const [hotels, setHotels] = useState([])
    const fetchAllHotels = async () => {
        const res = await fetchHotels()
        console.log(res.data)
        setHotels(res.data)
    }


    useEffect(() => {
        fetchAllHotels()
    }, [])
    return (

        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                <h1>
                    All Hotels

                </h1> </div>

            <div>
                {hotels.map((hotel, index) => <HotelCards key={index} hotel={hotel} />)}
            </div>
        </>

    )
}

export default Home