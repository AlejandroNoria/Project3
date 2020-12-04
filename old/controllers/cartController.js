const catchAsync = require("../utils/catchAsync")
const User = require("../models/User")

const Item = require("../models/Item")


const updateQuantity = async (initial,final,item,req,res) => {
    const delta = initial - final;
    const newInventory = item.quantity + delta;
    if(newInventory < 0) {
        req.user.cart.forEach(i => {
            if(i.item != req.body.item )return;
            i.quantity = item.quantity
            item.quantity = 0;
        })
    }
    else item.quantity = newInventory
    await req.user.save()
    await item.save()

    return res.json({
        status:"Success",
        data:{
            remaining:item.quantity,
            cart:req.user.cart
        }
    })

}

const findItem = async (id)=> {
    let message = "";
    const storeItem = await Item.findById(id)
    if(!storeItem) message = "Item does not exists";

    else if(!storeItem.quantity) message = "No more left in stock"

    const data =  {
        item:storeItem,
        message

    }
    return data;
}

exports.get = (req,res) => {
    res.json({
        status:"Success",
        data:req.user.cart
    })
}

exports.add = catchAsync(async (req,res) => {
    const data = await findItem(req.body.item)
    if(data.message)return res.json({
        status:"fail",
        message:data.message
    })
    let original = 0;
    let final = 0;
    const index = req.user.cart.findIndex(item => {
        console.log(item.item == req.body.item);
        return item.item == req.body.item
    }

    )
    if(index < 0) {
        final = req.body.quantity;

        req.user.cart.push({
            item: req.body.item,
            quantity: req.body.quantity

        })
    }
    else {
        original = req.user.cart[index].quantity;
        req.user.cart[index].quantity += req.body.quantity
        final += req.body.quantity
    }

    await updateQuantity(original,final,data.item,req,res)
})

exports.delete = catchAsync(async (req,res) => {
    const data = await findItem(req.body.item)
    if(data.message)return res.json({
        status:"fail",
        message:data.message
    })
    let original = 0;

    req.user.cart = req.user.cart.filter(item => {
        if(item.item == req.body.item){
            original = item.quantity
            return null
        }
        else return item
    })
    await updateQuantity(original,0,data.item,req,res)

})

exports.update = catchAsync( async  (req,res) => {
    const data = await findItem(req.body.item)
    if(data.message)return res.json({
        status:"fail",
        message:data.message
    })
    let original = 0;

    req.user.cart = req.user.cart.filter(item => {

        if(item.item == req.body.item){
            original = item.quantity
            item.quantity = req.body.quantity
        }
        if(!item.quantity) return null
        else return item
    })
    await updateQuantity(original,req.body.quantity,data.item,req,res)



})
