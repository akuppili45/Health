const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signup = async function (req, res, next) {
    try{
        const user = await db.User.create(req.body);
        const { id, email, username } = user;
        const token = jwt.sign({
            id,
            email,
            username
        }, process.env.SECRET_KEY);
        return res.status(200).json({
            id,
            email,
            username,
            token
        });
    }catch(err){
        if(err.code ===11000){
            err.message = "Sorry, username taken";
        }
        return next({
            status: 400,
            message: err.message
        });
    }
}

