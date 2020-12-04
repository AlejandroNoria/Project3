const bcrypt = require("bcryptjs")
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"First Name is required"]
    },
    lastName:{
        type:String,
        required:[true,"Last Name is required"]
    },

    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"account with this email is already being used"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        select:false
    },

    cart:[
        {
           item:{
               type:mongoose.Schema.ObjectId,
               ref:"Item"

           },
           quantity:Number,



        }


    ]

})

userSchema.pre("save", async function(next){
    if(!this.password) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

userSchema.methods.comparePasswords = async function(candidate,actual){
    return await bcrypt.compare(candidate,actual)
}




const User = mongoose.model("User",userSchema);
module.exports = User;
