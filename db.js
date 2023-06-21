const mongoose = require("mongoose");



const mongoURL = "mongodb+srv://amarasinghe:amarasinghe@cluster0.hpsswgu.mongodb.net/Royal_Garden";

// mongoose.connect(mongoURL , {useUnifiedTopology : true , useNewUrlParser : true})

// var connection = mongoose.connection

// connection.on('error' , ()=>{
//     console.log('MongoDB connection Fail')
// })

// connection.on('connected' , ()=> {
//     console.log('MongoDB connection Successful')
// })

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL);
    } catch(err) {
        console.log(err);
        console.log('MongoDB connection failed');
    }
}

module.exports = connectDB;