const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        default: 'Computer Science'
    },
    instructor: {
        type: String,
        default: 'TBA'
    }
});

module.exports = mongoose.model('Course', courseSchema);
