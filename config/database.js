//Set up mongoose connection
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/note-api', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
}, (error) => {
    if(error){
        console.error(error)
    } else {
        console.log('Connected to DB')
    }
});
mongoose.Promise = global.Promise;

module.exports = mongoose;
