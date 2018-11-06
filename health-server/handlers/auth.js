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

exports.signin = async function(req, res, next){
    try{
        const user = await db.User.findOne({
            email: req.body.email
        });
        const { id, email, username } = user;

        const shouldLogin = await user.comparePassword(req.body.password);
        // return res.status(200).json({
        //             message: req.body.password
        // });
        if(shouldLogin){
            const token = jwt.sign({
                id,
                email,
                username
            }, process.env.SECRET_KEY); //not including process.env.SECRET_KEY caused it to go to the catch block
            return res.status(200).json({
                id,
                email,
                username,
                token
            });

        }
        else{
            return next({
                status: 400,
                message: "Invalid username/password"
            });
        }
        
    } catch(err){
        err.message = "Invalid username/password catch";
        return next({status: 400, message: err.message});
    }
}

