const mongoose = require('mongoose')
const mongoUrl =  'mongodb+srv://cantarino:crcwifi123@cluster0-isxtc.mongodb.net/todoDB?retryWrites=true&w=majority&readPreference=secondary&ssl=true'
mongoose.Promise = global.Promise

module.exports = mongoose.connect(mongoUrl, {useNewUrlParser: true})
