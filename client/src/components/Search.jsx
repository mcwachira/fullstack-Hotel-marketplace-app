import React, { useState } from 'react'
import ReactGoogleAutocomplete from 'react-google-autocomplete'
import { DatePicker, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'


//destructure vales from atd

const { RangePicker } = DatePicker
const { Option } = Select


const config = {
    apiKey: process.env.REACT_APP_GOOGLE_PLACES_API_KEY
}


const Search = () => {

    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [bed, setBed] = useState("")

    const Navigate = useNavigate()

    const handleSubmit = () => {
        Navigate(`search-result?location=${location}&date=${date}&bed=${bed}`);
    }
    return (

        <div className="d-flex pb-4">
            <div className="w-100">

                <ReactGoogleAutocomplete
                    className='form-control ml-2 mr-2'
                    placeholder='Location'
                    defaultValue={location}
                    apiKey={config.apiKey}
                    onPlaceSelected={(place) => {
                        setLocation(place.formatted_address)
                    }
                    }
                    style={{ height: '50px' }} />
            </div>
            <RangePicker
                className='w-100'
                onChange={(value, dateString) => setDate(dateString)}

                //how does this work
                disabledDate={(current) => current && current.valueOf() < moment().subtract(1, 'days')} />


            <Select onChange={(value) => setBed(value)} className='w-100'
                size='large'
                placeholder='Number fo Beds'>

                <Option key={1}> {1}</Option>
                <Option key={2}> {2}</Option>
                <Option key={3}> {3}</Option>
                <Option key={4}> {4}</Option>
            </Select>

            <SearchOutlined onClick={handleSubmit} className='btn btn-primary p-3 btn-square' />

        </div >
    )
}

export default Search