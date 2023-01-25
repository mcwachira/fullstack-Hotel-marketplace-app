import express from 'express'
import fs from 'fs'
import * as dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import cookieParser from "cookie-parser"
import morgan from 'morgan'
import connectDb from '../config/db.js'
console.log(process.env.STRIPE_SECRET_KEY)

const app = express()

const PORT = process.env.PORT || 8000;


//connect our database
connectDb()

//for parsing application/json
app.use(express.json({ limit: '30mb', extended: true }));
//for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: '30mb', extended: true }))

//morgan fro logging
app.use(morgan('tiny'))


//enabling cors
app.use(cors())


//get cookies
app.use(cookieParser())
//router middleware
//fs.readFileSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)))

//import our routes
import stripeRouter from './routes/stripeRoute.js'
import authRouter from './routes/authRouter.js'


app.use('/api/v1', authRouter)
app.use('/api/v1', stripeRouter)

app.listen(PORT, (req, res) => {
    console.log(`app running on port ${PORT}`)
})