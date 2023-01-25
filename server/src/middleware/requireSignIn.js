import jwt from 'jsonwebtoken'

export const requireSignIn = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) return res.sendStatus(401)
    const token = authHeader.split(" ")[1]
    // console.log(token)
    const id = jwt.verify(token, process.env.JWT_SECRET)
    req.user = id
    // console.log(id)
    next()
}