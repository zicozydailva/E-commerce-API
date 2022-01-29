const User = require("../models/User")
const {StatusCodes} = require("http-status-codes")
const jwt = require("jsonwebtoken")
const {attachCookiesToRes} = require(".././utils")

const register = async (req, res) => {
    const user = await User.create(req.body)
    const tokenUser = {name: user.name, userId: user._id, role: user.role}
    attachCookiesToRes({res, user: tokenUser})    
    res.status(StatusCodes.CREATED).json({user:tokenUser})
}

const login = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        res.status(401).json("Please Provide email and password")
    }
    const user = await User.findOne({email})
    !user && res.status(400).json("Invalid credentails")

    const isPasswordCorrect = await user.comparePassword(password)
    !isPasswordCorrect && res.status(402).json("Wrong login credentials")

    const tokenUser = {name: user.name, userId: user._id, role: user.role}
    attachCookiesToRes({res, user: tokenUser})    
    res.status(StatusCodes.CREATED).json({user:tokenUser})
}

const logout = async (req, res) => {
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    res.status(200).json({msg: "USER LOGGED OUT"})
}

module.exports = {register, login, logout}