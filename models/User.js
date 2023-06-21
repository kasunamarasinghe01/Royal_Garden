const mongoose =  require("mongoose");

const userSchema = mongoose.Schema({
    avatar:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
    firstName:{
        type: String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    phoneNumber:{
        type:Number
    },
    address:{
        type:String
    },
    street:{
        type:String
    },
    city:{
        type:String
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    role: {
        type: Array
    },
    salary:{
        type:Number
    },
    nic: {
        type: String
    },
    age: {
        type: String
    },
},

    {
        timestamps : true,
    }
);

const userModel = mongoose.model('User', userSchema)

module.exports = userModel