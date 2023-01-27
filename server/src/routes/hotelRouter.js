import express from 'express'
import { create, getHotels, showHotelImage, sellerHotels, deleteHotel, getHotelById, updateHotel, getUserHotelBookings, isAlreadyBooked } from '../controllers/hotelController.js'
import { requireSignIn, hotelOwner } from '../middleware/requireSignIn.js'

//formidable is when the api is recieving form data
import formidable from 'express-formidable'
const router = express.Router()

router.post('/create-hotel', requireSignIn, formidable(), create)
router.get('/hotels', getHotels)
router.get('/hotels/image/:hotelId', showHotelImage)
router.get('/seller-hotels', requireSignIn, sellerHotels)
router.get('/hotel/:hotelId', getHotelById)
router.put('/update-hotel/:hotelId', requireSignIn, hotelOwner, formidable(), updateHotel)
router.delete('/delete-hotel/:hotelId', requireSignIn, hotelOwner, deleteHotel)

//get user bookings

router.get('/user-hotel-bookings', requireSignIn, getUserHotelBookings)


//check if hotel is booked
router.get('/is-already-booked/:hotelId', requireSignIn, isAlreadyBooked)

export default router