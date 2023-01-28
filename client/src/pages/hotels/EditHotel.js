import React, { useState, useEffect } from 'react'
import ReactGoogleAutocomplete from 'react-google-autocomplete'
import { DatePicker, Select } from 'antd'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getHotelById, updateHotel } from '../../actions/hotel'



const config = {
    apiKey: process.env.REACT_APP_GOOGLE_PLACES_API_KEY
}


const { Option } = Select
const EditHotel = () => {
    const [hotel, setHotel] = useState({})

    const Navigate = useNavigate()

    const { auth } = useSelector((state) => ({ ...state }))
    // console.log(auth)
    const [image, setImage] = useState('')
    // const [location, setLocation] = useState("")
    const [values, setValues] = useState({
        title: "",
        content: "",
        price: "",
        from: "",
        to: "",
        bed: "",
        location: ""
    })

    const { title,
        content,
        price,
        from,
        to,
        bed,
        location } = values

    const { hotelId } = useParams()

    console.log(hotelId)

    const loadHotelById = async () => {
        let res = await getHotelById(hotelId)
        console.log(res.data)

        setValues(res.data)
        // setLocation(res.data.location)
        setImage(`${process.env.REACT_APP_API}/hotels/image/${res.data._id}`)
    }
    useEffect(() => {

        loadHotelById()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        let hotelData = new FormData();
        hotelData.append("title", title);
        hotelData.append("content", content);
        hotelData.append("location", location);
        hotelData.append("price", price);
        image && hotelData.append("image", image);
        hotelData.append("from", from);
        hotelData.append("to", to);
        hotelData.append("bed", bed);

        console.log('this is the updted hotel data', [...hotelData]);

        try {
            const res = await updateHotel(auth.token, hotelData, hotelId)
            console.log(res.data)
            toast.success('hotel Edited successfully')
            Navigate('/dashboard')
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.log(error)
            toast.error(error.response.data)
        }


    }

    const handleImageChange = (e) => {
        e.preventDefault()
        console.log(e.target.files[0])
        setImage(URL.createObjectURL(e.target.files[0]))
        setValues({
            ...values,
            image: e.target.files[0],
        })

    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setValues({
            ...values,
            [name]: value
        })

    }
    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                <h2>
                    Edit Hotel
                </h2>
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <br />
                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label className="btn btn-outline-secondary btn-block m-2 text-left">
                                    Image
                                    <input type="file" name="image" onChange={handleImageChange} accept="image/*" hidden />

                                </label>
                                <input type="text" name="title" id="" onChange={handleChange} placeholder='Title' className='form-control m-2' value={title} />


                                <textarea type="text" name="content" id="" onChange={handleChange} placeholder='Content' className='form-control m-2' value={content} />

                                {location && location.length && <ReactGoogleAutocomplete
                                    className='form-control ml-2 mr-2'
                                    placeholder='Location'
                                    defaultValue={location}
                                    apiKey={config.apiKey}
                                    // onPlaceSelected={(place) => {
                                    //     setValues({ ...values, location: place.formatted_address })
                                    // }
                                    //     // setLocation(place.formatted_address);
                                    // }
                                    onPlaceSelected={(place) => {
                                        setValues({ ...values, location: place.formatted_address })
                                    }
                                    }
                                    style={{ height: '50px' }} />}


                                <input type="number" name="price" id="" onChange={handleChange} placeholder='Price' className='form-control m-2' value={price} />
                                {/* <input type="number" name="bed" id="" onChange={handleChange} placeholder='Bed' className='form-control m-2' value={bed} /> */}

                                <Select onChange={(value) => setValues({ ...values, bed: value })} value={bed} className='w-100 p-2'
                                    size='large'
                                    placeholder='Number fo Beds'>

                                    <Option key={1}> {1}</Option>
                                    <Option key={2}> {2}</Option>
                                    <Option key={3}> {3}</Option>
                                    <Option key={4}> {4}</Option>
                                </Select>

                            </div>

                            {from && (<DatePicker plcaeholder='From Date'
                                className='form-control m-2'
                                defaultValue={moment(from, 'YYYY-MM-DD')}
                                onChange={(date, dateString) => setValues({ ...values, from: dateString })}

                                //how does this work
                                disabledDate={(current) => current && current.valueOf() < moment().subtract(1, 'days')} />)}

                            {to && (<DatePicker
                                placeholder="To date"
                                className="form-control m-2"
                                defaultValue={moment(to, 'YYYY-MM-DD')}
                                onChange={(date, dateString) =>
                                    setValues({ ...values, to: dateString })
                                }
                                disabledDate={(current) =>
                                    current && current.valueOf() < moment().subtract(1, "days")
                                }
                            />)}


                            <button className="btn btn-outline-primary m-2 ">
                                Submit
                            </button>
                        </form>

                    </div>



                    <div className="col md-3">

                        <img src={image} alt="preview_image" className='img img-fluid m-2' />
                        <pre>{JSON.stringify(values, null, 4)}</pre>
                        {JSON.stringify(location)}
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditHotel