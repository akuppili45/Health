const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    calories: {
        type: Number, 
        required: true
    },
    carbs: {
        type: Number, 
        required: true
    },
    protein: {
        type: Number,
        required: true
    }
});

