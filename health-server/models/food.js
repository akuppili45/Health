const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    calories: {
        type: Number, 
        required: true,
        unique: true
    },
    carbs: {
        type: Number, 
        required: true,
        unique: true
    },
    protein: {
        type: Number,
        required: true
    }
});

