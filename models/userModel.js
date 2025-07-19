const mongoose = require("mongoose");

// schema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "User Name is required"]
        },
        email:{
            type: String,
            required: [true, "Email Id is required"],
            unique: true
        },
        password:{
            type: String,
            required: [true, "Password is required"]
        },
        address:{
            type: Array
        },
        phone:{
            type: Number,
            required: [true, "Password is required"]
        },
        usertype: {
            type: String,
            required: [true, 'Usertype is required'],
            default: 'client',
            enum: ['client', 'admin', 'vendor', 'driver']
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("User", userSchema);
