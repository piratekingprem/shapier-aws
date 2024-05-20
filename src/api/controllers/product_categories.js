const product_category = require('../models/product_categories')

exports.get_product_categories = async (req,res,next) =>{
    try{
        const product_categories = await product_category.get_product_category()
        return res.send(product_categories)
    }catch(err){
        next(err)
    }
}

exports.store_product_categories = async (req,res,next) =>{
    try {
        const product_categories = await product_category.store_product_categories(req.body);
        return res.send(product_categories)
    } catch (error) {
        next(error)
    }
}

exports.get_product_category_by_id = async (req,res,next) =>{
    try {
        const product_categories = await product_category.get_product_category_by_id(req.params.id);
        return res.send(product_categories)
    } catch (error) {
        next(error);
    }
}

exports.update_product_category = async (req,res,next) =>{
    try {
        const product_categories = await product_category.update_product_categories(req.params.id,req.body)
        return res.send(product_categories)
    } catch (error) {
        next(error)
    }
}

exports.delete_product_category = async (req,res,next) =>{
    try {
        const product_categories = await product_category.delete_product_categories(req.params.id);
        return res.send(product_categories)
    } catch (error) {
        next(error);
    }
}