const mongoose = require('mongoose');

// Project Schema 

const projectSchecma = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchecma);

module.exports = Project;