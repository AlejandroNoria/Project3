const Item = require("../models/Item")
const catchAsync = require("../utils/catchAsync")

exports.getall = catchAsync(async (req,res) => {
    const items = await Item.find()
    res.json({
        status:"Success",
        data:items
    })

})

exports.create = catchAsync(async (req,res) => {
    const items = await Item.insertMany(req.body)
    res.json({
        status:"Success",
        data:items
    })
})

exports.update = catchAsync(async (req,res) => {
    const item = await Item.findByIdAndUpdate(req.params.id,req.body)
    res.json({
        status:"Success",
        data:item
    })
})

exports.delete = catchAsync(async (req,res) => {
    const item = await Item.findByIdAndDelete(req.params.id)
    res.json({
        status:"Success",
        data:null
    })
})
