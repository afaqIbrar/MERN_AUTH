const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')


const protect = asyncHandler( async (req,res,next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            //veryify token
            const ver = jwt.verify(token,process.env.JWT_SECRET)
            //get User from the token and exclude the password
            req.user = await User.findById(ver.id).select('-password')
            next()

        } catch(err) {
            console.log(err)
            res.status(401)
            throw new Error('Not Authorized');
        }
    }
    if(!token) {
        res.status(401)
        throw new Error ('Not Authorized, no token')
    }
})

module.exports = {protect}