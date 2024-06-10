const sellerController = require('../models/seller');

exports.store_seller  = async (req,res,next) => {
    try {
        const seller = await sellerController.store(req.body);
        return res.send(seller);
    } catch (error) {
        next(error);
    }
}

exports.get_seller = async (req,res,next) => {
    try {
        const seller  = await sellerController.get();
        console.log(process.env.RAZORPAY_API_SECRET);
        return res.send(seller);
    } catch (error) {
        next(error);
    }
}

exports.get_seller_by_id = async (Req,res,next) => {
    try {
        const seller = await sellerController.get_by_id(req.params.id);
        return res.send(seller);
    } catch (error) {
        next(seller);
    }
}