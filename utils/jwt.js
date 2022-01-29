const jwt = require("jsonwebtoken")

const createJWT = ({payload}) => {
    const token = jwt.sign(payload,  process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_LIFETIME})
    return token
}

const isTokenValid = ({token}) => jwt.verify(token, process.env.JWT_SECRET_KEY)


module.exports = {createJWT, isTokenValid}