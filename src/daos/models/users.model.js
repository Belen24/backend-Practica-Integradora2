import mongoose from "mongoose";

const usersCollection = "users";

const usersSchema = new mongoose.Schema({
    first_name:{
        required:true,
        type:String
    },
    last_name:String,
    email:{
        required:true,
        type:String,
    },
    age:Number,
    password:{
        required:true,
        type:String
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"carts"
    },
    role:{
        type:String,
        required:true,
        enum:["user","admin"],
        default:"user"
    }
});

export const UserModel = mongoose.model(usersCollection,usersSchema);