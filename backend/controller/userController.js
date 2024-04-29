const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


// @desc  Register User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req,res) => {
    const {name,email,password} = req.body;
    if(!name || !email || !password) {
        res.status(400)
        throw new Error ('Please add all the fields');
    }

    // Check if user exist
    const userExists = await User.findOne({email});
    if(userExists) {
        res.status(400)
        throw new Error ('User Already exists with this email');
    }

    // HASH Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const user = await User.create({
        name,email,password:hashedPassword
    })

    if(user) {
        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

// @desc  Authenticate User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user && bcrypt.compare(password,user.password)) {
        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

// @desc  Get User data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req,res) => {
    res.status(200) 
    res.json(req.user)
})


const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'15d'})
}


module.exports = {registerUser,loginUser,getMe}