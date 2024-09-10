const productImageModel = require('../models/product_image')

exports.store_product_image = async (req,res,next) => {
    try {
        const product_image = await productImageModel.store(req.file,req.body)
        return res.send(product_image);
    } catch (error) {
        next(error);
    }
}

exports.get_product = async (req,res,next) => {
    try {
        const product_image = await productImageModel.get();
        return res.send(product_image);
    } catch (error) {
        next(error);      
    }
}

exports.get_product_by_id = async (req,res,next) => {
    try {
        const product_image = await productImageModel.get_id(req.params.id);
        return res.send(product_image);
    } catch (error) {
        next(error);
    }
}

exports.get_product_image_by_product_id = async (req,res,next)=> {
    try {
        const product_image = await productImageModel.get_product_id(req.params.product_id);
        return res.send(product_image);
    } catch (error) {
        next(error);
    }
}
exports.update_product = async (req,res,next) => {
    try {
        const product_image = await productImageModel.update(req.params.id,req.file,req.body);
        return res.send(product_image);
    } catch (error) {
        next(error);
    }
}

exports.delete_product_image = async (req,res,next) => {
    try {
        const product_image = await productImageModel.delete(req.params.id);
        return res.send(product_image);
    } catch (error) {
        next(error);
    }
}