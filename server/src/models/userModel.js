import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: 'Full name is  required'
    },

    email: {
        type: String,
        required: 'Email is required',
        unique: true,
    },
    password: {
        type: String,
        required: 'Password  is required',
        min: 6,
        max: 64,

    },
    confirmPassword: {
        type: String,
        required: 'confirm Password is required',
        min: 6,
        max: 64,

    },

    stripe_account_id: '',
    stripe_seller: {},
    stripeSession: {},
}, {
    timestamps: true
})



// userSchema.pre('save', function (next) {
//     let user = this
//     if (user.isModified('password') && user.isModified('confirmPassword')) {
//         return bcrypt.hash(user.password, 12, function (err, hash) {
//             if (err) {
//                 console.log('Bcrypt Hash Err', err)
//                 return next(err)
//             }

//             user.password = hash
//             return next(hash)
//         })
//     } else {
//         return next()
//     }
// })
// userSchema.methods.comparePassword = function (password, next) {
//     bcrypt.compare(password, this.password, function (error, match) {
//         if (error) {
//             return next(error, false)
//         }

//         return next(null, match)
//     })
// }

export default mongoose.model('User', userSchema)