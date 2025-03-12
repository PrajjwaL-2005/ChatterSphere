import mongoose from "mongoose" ;

const postSchema = new mongoose.Schema({
    caption: String , 
    post:{
        id: String , 
        url: String,
    } , 
    type:{
        type: String , 
        required: true , 
    },

    owner: {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "User" ,
    } , 
    createdAt:{
        type : Data , 
        default : Date.now ,
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId , 
            ref : "user" , 

        },
    ],

    comments:[
        {
            user:{
                type : mongoose.Schema.Types.ObectId , 
                ref : "User" , 

            },
            name:{
                type: String , 
                required :true , 

            }, 
            comment :{
                type : String , 
                required : true , 

            },

        },
    ],
}) ;

export const Post  = mongoose.model("Post" , postSchema) ;
