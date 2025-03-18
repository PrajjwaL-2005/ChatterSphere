import { Chat } from "../models/ChatModel.js";
import { Messages } from "../models/Messages.js";
import TryCatch from "../utlis/Trycatch.js";

export const sendMessage = TryCatch(async(req, res) => {
    const{revieverId , message} = req.body ;

    const senderId = req.user._id ;

    if(!recieverId) return res.status(400).json({
        message : "Please give reciever id" ,
    }) ;

    let chat = await Chat.findOne({
        users:{$all:[senderId , recieverId]} ,
    }) ;
    if(!chat ){
        chat = new Chat({
            users: [senderId , recieverId] ,
            latestMessage: {
                text: message , 
                sender : senderId ,
            },
        }) ;

        await chat.save() ;
    }

    const newMessage = new Messages({
        chatId: chat._id ,
        sender : senderId ,
        text : message ,
    }) ;

    await newMessage.save() 

    await chat.updateOne({
        latestMessage: {
            text: message, 
            sender : senderId , 

        },
    });

    res.status(201).json(newMessage) ;


}) ;

export const getAllMessages = TryCatch(async(req,res)=>{
    const {id} = req.params ;
    const userId = req.user._id ;

    const chat = await Chat.findOne({
        users:{$all:[userId , id ]} ,

    }) ;

    if(!chat ) return res.status(404).json({
        message:"No Chat with these Users" ,
    }) ;

    const messages = await Messages.find({
        chatId: chat._id ,
    }) ;
    res.json(messages) ;

}) ;

