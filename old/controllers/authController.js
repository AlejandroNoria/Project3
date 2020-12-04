const User = require("../models/User")
const catchAsync = require("../utils/catchAsync")
const jwt = require("jsonwebtoken")
const {promisify} = require("util")


const issueToken = id => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRY
    })


}

const sendToken = (user,req,res) => {
    const token = issueToken(user._id);
    res.cookie("jwt",token,{
        expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRY * 1000 * 60 * 60 * 24),
        secure:req.secure || req.headers["x-forwarded-proto"] === "https",
        httpOnly:true
    })
    user.password = undefined
    res.json({
        status:"Success",
        token,
        data:user
    })
}



exports.getAll = catchAsync( async (req,res)=>{

    const users = await User.find()
    res.json({
        status:"Success",
        data:users
    })
})

exports.create = catchAsync( async (req,res) => {

    const user = await User.create(req.body)
    sendToken(user,req,res)

})

exports.getOne = catchAsync( async (req,res) => {
    if(!req.body.email && req.body.id) return res.json({
        status:"fail",
        message:"Please Include filters"
    })
    const filters = {}
    if(req.body.email) filters.email = req.body.email;
    if(req.body.id) filters._id = req.body.id;
    const user = await User.findOne(filters)
    res.json({
        status:"Success",
        data:user
    })

})

exports.update = catchAsync( async (req,res) => {
    const user = await User.findOneAndUpdate({
            _id: req.params.id
        },
        req.body

    )
    res.json({
        status:"Success",
        data:user
    })




})

exports.delete = catchAsync( async (req,res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    res.json({
        status:"Success",
        data:user
    })

})

exports.protect = catchAsync( async (req,res,next) => {
    const header = req.headers.authorization
    let token;
    if(header && header.startsWith("Bearer")) token = header.split(" ")[1]
    else if(req.cookies.jwt) token = req.cookies.jwt
    else return res.json({
            status:"fail",
            message:"You are not logged in, please log in to continue"
        })
    const data = await promisify(jwt.verify)(token,process.env.JWT_SECRET)
    const user = await User.findById(data.id)
    if(!user) return res.json({
        status:"fail",
        message:"You are not logged in, please log in to continue"
    })
    req.user = user
    next()

})
exports.login = catchAsync( async (req,res) => {
    const {email,password} = req.body;
    if(!email && !password) return res.json({
        status:"fail",
        message:"Please include email and password"
    })
    const user = await User.findOne({email}).select("+password")
    if(!user || !( await user.comparePasswords(password,user.password))) return res.json({
        status:"fail",
        message:"email and password is not correct"
    })
    // Send json web token
    sendToken(user,req,res)
})

exports.logOut = catchAsync(async (req,res) => {
    res.cookie("jwt","logged out",{
        expires:new Date(Date.now() + 10000),
        httpOnly:true
    })
    res.json({
        status:"Success",
        message:"You are now logged out"
    })


})
