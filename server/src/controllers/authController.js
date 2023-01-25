import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const register = async (req, res) => {

    console.log(req.body)
    const { fullName, email, password, confirmPassword } = req.body


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

export const login = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body

    try {


        if (!email || !password) {
            return res.status(400).json({ message: 'please  fill in all the fields' })
        }

        //check if user exist based on the  email
        const user = await User.findOne({ email }).exec()
        if (!user) {
            return res.status(400).json({ message: 'User with that email does not exist' })
        }

        //check if password is same as one in the database

        //check if password is correct

        let value = await bcrypt.compare(password, user.password)

        console.log(value)
        if (user && value === false) {
            return res.status(401).send({ error: 'Email and password do not match ' })
        }
        let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        })

        console.log(user)

        res.status(200).json({
            token, user
        })


    } catch (error) {
        console.log(error)
    }

}