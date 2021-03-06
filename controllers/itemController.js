const Item = require("../models/Item")
const catchAsync = require("../utils/catchAsync")

exports.get = catchAsync(async (req,res) => {

    const limit = req.query.limit || 20;
    const page = req.query.page || 1;
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.name) filter.name = {'$regex' : req.query.name, '$options' : 'i'}

    console.log(req.query);
    console.log(filter);


    const items = await Item.find(filter).limit(limit).skip(skip);
    res.json({
        status:"Success",
        results: items.length,
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
