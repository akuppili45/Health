const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    },
    username: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre("save", async function(next){ //right before we run this document, run an async function
    try{
        if(!this.isModified("password")){//if you have not saved the password, dont' go and hash it again, if the password has not changed at all, don't mess with it
            return next();
        }
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();

    }catch(err){
        return next(err);
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
