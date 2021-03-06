const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const mongoose = require('mongoose')
// const User = mongoose.model("User")
const Admin = mongoose.model("Admin")

module.exports = (req, res, next) => {
    const {authorization} = req.headers

    // authorization === Bearer kjkjjkjj;
    if(!authorization){
        return res.status(401).json({error: "You must be logged in"})
    }

    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if(err){
            return res.status(401).json({error: "You must be logged in"})
        }

        const {_id} = payload

        // User.findById(_id).then(userData => {
        //     req.user = userData
        //     next()
        // })

        Admin.findById(_id).then(adminData => {
            req.admin = adminData
            next()
        })
    })
}