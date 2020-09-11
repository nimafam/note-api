const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    body: {
        type: String,
        trim: true,
        required: true
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Note', NoteSchema);