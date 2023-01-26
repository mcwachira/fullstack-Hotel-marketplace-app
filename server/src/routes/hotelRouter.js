import express from 'express'
import { create, getHotels, showHotelImage, sellerHotels, deleteHotel, getHotelById, updateHotel } from '../controllers/hotelController.js'
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



export default router