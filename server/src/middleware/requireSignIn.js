import jwt from 'jsonwebtoken'
import Hotel from '../models/hotelModel.js'

export const requireSignIn = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) return res.sendStatus(401)
    const token = authHeader.split(" ")[1]
    // console.log(token)
    const id = jwt.verify(token, process.env.JWT_SECRET)
    req.user = id
    console.log(req.user)
    next()
}


//this enable us to find the hotel owner and delete the hotel
export const hotelOwner = async (req, res, next) => {
    console.log(req.params.hotelId)
    let hotel = await Hotel.findById(req.params.hotelId).exec()
    console.log(hotel)

    let owner = hotel.postedBy._id.toString() === req.user._id.toString()

    if (!owner) {
        return res.status(403).send('unauthorized')
    }

    next()
}