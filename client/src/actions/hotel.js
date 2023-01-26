import axios from "axios"


export const createHotel = async (token, data) => await axios.post(
    `${process.env.REACT_APP_API}/create-hotel`,
    data,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
)


export const fetchHotels = async () => await axios.get(`${process.env.REACT_APP_API}/hotels`)




export const getSellerHotels = async (token) => await axios.get(
    `${process.env.REACT_APP_API}/seller-hotels`,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
)

export const deleteHotel = async (hotelId, token) => await axios.delete(
    `${process.env.REACT_APP_API}/delete-hotel/${hotelId}`,

    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
)


export const getHotelById = async (hotelId) => await axios.get(`${process.env.REACT_APP_API}/hotel/${hotelId}`)


export const updateHotel = async (token, data, hotelId) => await axios.put(
    `${process.env.REACT_APP_API}/update-hotel/${hotelId}`,
    data,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
)
