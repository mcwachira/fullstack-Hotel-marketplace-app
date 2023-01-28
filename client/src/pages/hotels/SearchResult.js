import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import ReactGoogleAutocomplete from 'react-google-autocomplete'
import { DatePicker, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { searchListing } from '../../actions/stripe'
import HotelCards from '../../components/HotelCards'


const SearchResult = () => {
    const [searchLocation, setSearchLocation] = useState("")
    const [searchDate, setSearchDate] = useState("")
    const [searchBed, setSearchBed] = useState("")
    const [hotels, setHotels] = useState([])



    //search for hotel function

    // const SearchHotel = async (location, date, bed) => {
    //     const res = await searchListing({ location, date, bed })
    //     console.log(res)
    //     setHotels(res.data)

    // }

    useEffect(() => {
        const { location, date, bed } = queryString.parse(window.location.search);
        // console.table({ location, date, bed });
        searchListing({ location, date, bed }).then((res) => {
            console.log("SEARCH RESULTS ===>", res);
            setHotels(res.data);
        });
    }, [window.location.search]);
    return (
        <div className="container">
            <div className="row">


                {hotels.map((hotel) => <HotelCards hotel={hotel} />)}
            </div>
        </div>
    )
}

export default SearchResult