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
    res.send("show user");
    
}

const updateUser = async (req, res) => {
    res.send("updateuser");
    
}

const updateUserPassword = async (req, res) => {
    res.send("update user password");
    
}

module.exports = {getAllUsers, getSingleUser, updateUser, showCurrentUser, updateUserPassword}
