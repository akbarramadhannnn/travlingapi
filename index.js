require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { getComment, addComment, editComment, gambarComment, deleteComment, showComment } = require('./controllers/Comment')
const port = process.env.PORT

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('terkoneksi'))
.catch(e => console.log(e))

app.use(bodyParser.json())
app.get('/api/comment', getComment)
app.get('/api/comment/:_id', showComment)
app.post('/api/comment/add', addComment)
app.put('/api/comment/edit/:_id', editComment)
app.get('/api/comment/gambar/:_id', gambarComment)
app.delete('/api/comment/delete/:_id', deleteComment)

app.listen(port, (req,res) => {
    console.log(`server run port ${port}`)
})