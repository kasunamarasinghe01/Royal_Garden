const mongoose =  require("mongoose");

const roomSchema = mongoose.Schema({
    id:{
        type : Number , 
    },
    name : {
        type : String , 
        
    },
    maxcount : {
        type : Number ,
        required : true
    },
    phonenumber : {
        type : Number , 
        required : true
    },
    rentperday : {
        type : Number ,
        required : true
    },
    imgurl : [],

    currentbookings : [],

    type : {
        type : String,
        required : true
    },
    discription : {
        type : String,
        required : true
    },
    // role: {
    //     type: Array // ['Customer', 'Employee', 'Admin']
    // }
},

    {
        timestamps : true,
    }
);

const roomModel = mongoose.model('rooms', roomSchema)

module.exports = roomModel