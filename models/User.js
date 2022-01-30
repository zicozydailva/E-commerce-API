const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, " Name field is required"]
    },
    email: {
        type: String,
        required: [true, "Email field is required"],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Please provide valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password field is required"],
        minlength: 6
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
})

userSchema.pre("save", async function() {
    if(!this.isModidifed('password')) return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
userSchema.methods.comparePassword = async function(userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch;
}
module.exports = mongoose.model("User", userSchema);