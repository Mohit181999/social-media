const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const newUser=new Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    followers:[
         String
     ],
     following:[
        String
     ]
});

module.exports=User=mongoose.model('user',newUser);