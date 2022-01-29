const User = require("../models/User")
const {StatusCodes} = require("http-status-codes")
const jwt = require("jsonwebtoken")
const {createJWT} = require(".././utils")

const register = async (req, res) => {
    const user = await User.create(req.body)
    const tokenUser = {name: user.name, userId: user._id, role: user.role}

    // const token = jwt.sign(tokenUser,)
    const token = createJWT({payload: tokenUser})

    res.status(StatusCodes.CREATED).json({user:tokenUser, token})
}

const login = async (req, res) => {
    res.send("login")
}

const logout = async (req, res) => {
    res.send("logout")
}

module.exports = {register, login, logout}