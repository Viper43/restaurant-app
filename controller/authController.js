const userModel = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// register
const registerController = async (req, res) => {
    try {
        const { username, email, password, address, phone } = req.body

        // validation
        if(!username || !email || !password || !phone) {
            res.status(500).send({
                success: false,
                message: 'Please provide all fields'
            })
        }
        // check existing user
        const existing = await userModel.findOne({email})
        if(existing) {
            res.status(500).send({
                success: false,
                message: 'Email already registered'
            })
        }

        // hashing
        const salt = bcrypt.genSaltSync(10)
        const hashedPass = await bcrypt.hash(password, salt)

        // register
        const user = await userModel.create({
            username,
            email,
            password:hashedPass,
            address, 
            phone
        })
        res.status(201).send({
            success: true,
            message: 'User successfully registered'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error occurred during registration',
            error
        })
    }
}

// login
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        // validation
        if(!email || !password ) {
            res.status(500).send({
                success: false,
                message: 'Please provide all fields'
            })
        }

        // check existing user
        const user = await userModel.findOne({email})
        if(!user) {
            res.status(500).send({
                success: false,
                message: 'Email not registered'
            })
        }

        // check valid password
        const isMatch = await bcrypt.compare(password, user.password)
        if( !isMatch ) {
            res.status(500).send({
                success: false,
                message: 'Incorrect Password'
            })
        }

        // token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '10m'})
        user.password = undefined

        res.status(200).send({
            success: true,
            message: 'User successfully logged in',
            token,
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error occurred during login',
            error
        })
    }
}

module.exports = { registerController, loginController }