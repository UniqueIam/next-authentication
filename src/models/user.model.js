import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please Provide the username'],
        unique:true
    },
    email:{
        type:String,
        required:[true,'Please Provide an Email'],
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiray:Date,
    verifyToken:String,
    verifyTokenExpiray:Date

})

const User = mongoose.models.users || mongoose.model("users",userSchema);

export default User;