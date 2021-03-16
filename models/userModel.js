const mongoose = require('mongoose');
//  mongo table created
const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: Number,
        default: 0
    },

    cart: {
        type: Array,
        default: []
    }

}, {
    timestamps: true
});

// database "ecommerce" ato created with collection name "user" 
module.exports = mongoose.model('Users', userSchema);
