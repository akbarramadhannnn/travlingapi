const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    rating: {
        type: Number
    },
    nama: {
        type: String
    },
    review: {
        type: String
    },
    gambar: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('Comment', commentSchema)