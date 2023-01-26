
import Hotel from '../models/hotelModel.js'
import fs from 'fs'
export const create = (req, res) => {
    console.log(req.fields)
    console.log(req.files)

    try {
        let fields = req.fields
        let files = req.files

        let hotel = new Hotel(fields)
        hotel.postedBy = req.user._id

        if (files.image) {
            hotel.image.data = fs.readFileSync(files.image.path);
            hotel.image.contentType = files.image.type
        }

        const result = hotel.save()
        if (!result) {
            res.staus(400).send('Error saving the hotel')
        } else {
            res.status(200).send(result)
        }


    } catch (error) {
        console.log(error)
    }

}

export const getHotels = async (req, res) => {

    try {

        const allHotels = await Hotel.find({}).limit(24).select('-image.data').populate("postedBy", "id, name").exec()

        if (!allHotels) {
            res.status(404).json({ message: 'no hotels found' })
        }
        else {
            res.status(200).send(allHotels)
        }

    } catch (error) {
        console.log(error)
    }

}

export const showHotelImage = async (req, res) => {

    const id = req.params.hotelId
    console.logid

    const hotel = await Hotel.findById(id).exec()

    //send image to frontent by settiing the content type
    if (hotel && hotel.image && hotel.image.data !== null) {
        res.set('Content-Type', hotel.image.contentType)
        return res.status(200).send(hotel.image.data)
    }



}

export const sellerHotels = async (req, res) => {


    try {

        const allHotels = await Hotel.find({ postedBy: req.user._id }).limit(24).select('-image.data').populate("postedBy", "id, name").exec()

        if (!allHotels) {
            res.status(404).json({ message: 'no hotels posted by the seller' })
        }
        else {
            res.status(200).send(allHotels)
        }

    } catch (error) {
        console.log(error)
    }

}

export const deleteHotel = async (req, res) => {

    const id = req.params.hotelId


    console.log(id)
    try {

        const deletedHotel = await Hotel.findByIdAndDelete(id).exec()

        if (deletedHotel) {

            res.status(200).send('hotel deleted succesfully')
        } else {
            res.status(401).json({ message: 'error deleting the hotel' })
        }
    } catch (error) {
        console.log(error)
    }

}


export const getHotelById = async (req, res) => {

    const id = req.params.hotelId

    console.log(id)
    try {

        const hotel = await Hotel.findById(id).select('-image.data').exec()
        console.log(hotel)

        if (hotel) {

            res.status(200).send(hotel)
        } else {
            res.status(401).json({ message: 'error deleting the hotel' })
        }
    } catch (error) {
        console.log(error)
    }

}

export const updateHotel = async (req, res) => {


    const id = req.params.hotelId

    let fields = req.fields
    let files = req.files
    try {

        let data = { ...fields }


        //check if image is present before storing in database

        if (files.image) {
            let image = {}
            image.data = fs.readFileSync(files.image.path);
            image.contentType = files.image.type

            data.image = image
        }

        console.log(data)
        const hotel = await Hotel.findByIdAndUpdate(id, data, {
            new: true
        })


        //.select('-image.data)
        console.log(hotel)

        if (hotel) {

            res.status(200).send(hotel)
        } else {
            res.status(401).json({ message: 'updating hotel data failed' })
        }
    } catch (error) {
        console.log(error)
    }

}


