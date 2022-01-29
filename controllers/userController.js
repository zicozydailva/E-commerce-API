const User = require("../models/User");


const getAllUsers = async (req, res) => {
    const user = await User.find({role: "user"}).select("-password")
    // NOTE: the "select()" mongoose method was used to remove the password in this case 
    res.status(200).json(user)
}


const getSingleUser = async (req, res) => {
    const user = await User.findOne({_id: req.params.id}).select("-password")
    !user && res.status(404).json(`No user with Id: ${req.params.id}`)

    res.status(200).json(user)
}

const showCurrentUser = async (req, res) => {
    res.status(200).json({user: req.user})
}

const updateUser = async (req, res) => {
    res.send("updateuser");
    
}

const updateUserPassword = async (req, res) => {
    const {oldPassword, newPassword} = req.body 
    if(!oldPassword || !newPassword) {
        res.status(401).json("Please Provide both values")
    }
    const user = await User.findOne({_id: req.user.userId})

    const isPasswordCorrect = await user.comparePassword(oldPassword)
    !(isPasswordCorrect) && res.status(403).json("Invalid Login Credentails...wrong password")

    user.password = newPassword

    await user.save()
    res.status(200).json({msg: "password updated successfully!!"})
}

module.exports = {getAllUsers, getSingleUser, updateUser, showCurrentUser, updateUserPassword}
