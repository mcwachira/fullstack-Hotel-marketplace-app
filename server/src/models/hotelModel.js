import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const hotelSchema = new mongoose.Schema({

    title: {
        type: String,
        required: 'title is  required'
    },

    content: {
        type: String,
        required: 'content is required',
        max: 10000,

    },

    location: {
        type: String,
        required: 'location is  required'
    },
    price: {
        type: Number,
        required: 'price  is required',
        trim: true,
    },
    postedBy: {
        type: ObjectId,
        ref: 'User'
    },
    image: {
        data: Buffer,
        contentType: String
    },
    from: {
        type: Date,
    },
    to: {
        type: Date,
    },

    bed: {
        type: Number,
    },

}, {
    timestamps: true
})



export default mongoose.model('Hotel', hotelSchema)