const formidable = require('formidable')
const Comment = require('../models/Comment')
const fs = require('fs')

exports.getComment = async(req,res) => {
    try {
        const result = await Comment.find().select('_id rating nama review')
        return res.status(200).json({
            result
        })
    } catch (e) {
        return res.json({
            "message": e
        })
    }
}

exports.showComment = async(req,res) => {
    const { _id } = req.params 
    try {
        const result = await Comment.find({_id}).select('_id rating nama review')
        return res.status(200).json({
            result
        })
    } catch (e) {
        return res.json({
            "message": e
        })
    }
}

exports.addComment = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        const { rating, nama, review } = fields
        let comment = new Comment()
        comment.rating = rating
        comment.nama = nama
        comment.review = review
        if(files) {
            comment.gambar.data = fs.readFileSync(files.gambar.path)
            comment.gambar.contentType = files.gambar.type
        }
        comment.save((err,result) => {
            if(err) {
                return res.status(400).json({
                    "message": err
                })
            }
            return res.status(200).json({
                "message": " add success"
            })
        })
    })
}

exports.editComment = (req,res) => {
    const { _id } = req.params

    Comment.findOne({_id}).exec((err, oldComment) => {
        let form = new formidable.IncomingForm()
        form.keepExtensions = true
        form.parse(req, (err, fields, files) => {
            const { rating, nama, review } = fields
            oldComment.rating = rating
            oldComment.nama = nama
            oldComment.review = review
            if(files) {
                oldComment.gambar.data = fs.readFileSync(files.gambar.path)
                oldComment.gambar.contentType = files.gambar.type
            }
            oldComment.save((err,result) => {
                if(err) {
                    return res.status(400).json({
                        "message": err
                    })
                }
                return res.status(200).json({
                    "message": "edit success"
                })
            })
        })
    })
}

exports.gambarComment = async (req,res) => {
    const { _id } = req.params
    try {
        const gambar = await Comment.findOne({_id}).select('gambar')
        res.set('Content-Type', gambar.gambar.contentType)
        return res.send(gambar.gambar.data)
    } catch (e) {
        return res.json({
            error: e
        })
    }
}

exports.deleteComment = async (req,res) => {
    const { _id } = req.params
    try {
        await Comment.findOneAndDelete({_id})
        return res.json({
            "message": "delete success"
        })
    } catch (e) {
        return res.json({
            error: e
        })
    }
}