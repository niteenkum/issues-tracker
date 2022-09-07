const mongoose = require('mongoose');

// Issue Schema For Project
const IssueSchecma = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },labels:[ {
        type: String,
        required: true
    }],author:{
        type: String,
        required: true
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
}, {
    timestamps: true
});

const Issue = mongoose.model('Issue', IssueSchecma);

module.exports = Issue;