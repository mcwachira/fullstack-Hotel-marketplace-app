import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
export const register = async (req, res) => {

    console.log(req.body)
    const { fullName, email, password, confirmPassword } = req.body
    console.log(confirmPassword)

    if (!fullName || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'please  fill in all the fields' })
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'password entered are not the same' })
    }
    //check if user with email exist
    //.exec() enables us to get a promise back

    const emailExist = await User.findOne({ email }).exec()
    if (emailExist) {

        return res.status(409).json({ message: 'email already in use' })

    }

    //hash both the password and confirm password
    const hashedPassword = await bcrypt.hash(password, 10)
    const hashedConfirmedPassword = await bcrypt.hash(confirmPassword, 10)
    const newUser = {
        'fullName': fullName,
        'email': email,
        'password': hashedPassword,
        'confirmPassword': hashedConfirmedPassword


    }

    try {

        await User.create(newUser)
        console.log(newUser)
        if (newUser) {
            res.status(201).json({ message: 'new user created' })
        }

    } catch (error) {
        console.log(error)
    }
}