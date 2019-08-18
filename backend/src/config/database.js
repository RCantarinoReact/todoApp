const mongoose = require('mongoose')
const mongoUrl =  'URLBANCO'
mongoose.Promise = global.Promise

module.exports = mongoose.connect(mongoUrl, {useNewUrlParser: true})
