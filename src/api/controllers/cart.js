const cart = require('../models/cart');

exports.store_cart = async (req,res,next) =>{
    try{
        const carts = await cart.store(req.body);
        return res.send(carts);
    } catch (err){
        next(err);
    }
}
exports.get_cart = async (req,res,next) => {
    try {
        const carts = await cart.get();
        return res.send(carts);
    } catch (error) {
        next(error);
    }
}
exports.get_by_cart_id = async (req,res,next) => {
    try {
        const carts = await cart.get_by_id(req.params.id);
        return res.send(carts);
    } catch (error) {
        next(error)
    }
}
exports.get_by_cart_user_id = async (req,res,next) => {
    try {
        const carts = await cart.get_by_cart_user_id(req.params.userId);
        return res.send(carts);
    } catch (error) {
        next(error)
    }
}
exports.update_cart = async (req,res,next) => {
    try {
        const carts = await cart.update(req.params.id,req.body);
        return res.send(carts);
    } catch (error) {
        next(error);
    }
}
exports.delete_cart = async (req,res,next) => {
    try {
        const carts = await cart.delete(req.params.id);
        return res.send(carts);
    } catch (error) {
        next(error);
    }
}