const product_brand = require('../models/product_brand');

exports.store_brand = async (req,res,next)=>{
    try {
        const product_brands = await product_brand.store(req.file,req.body);
        return res.send(product_brands)
    } catch (error) {
        next(error);
    }
}
exports.get_brand = async (req,res,next)=>{
    try {
        const product_brands = await product_brand.get();
        return res.send(product_brands)
    } catch (error) {
        next(error);
    }
}
exports.get_brand_by_id = async (req,res,next)=>{
    try {
        const product_brands = await product_brand.get_by_id(req.params.id);
        return res.send(product_brands)
    } catch (error) {
        next(error);
    }
}
exports.update_brand = async (req,res,next)=>{
    try {
        const product_brands = await product_brand.update(req.params.id,req.body);
        return res.send(product_brands);
    } catch (error) {
        next(error);
    }
}
exports.delete_brand = async (req,res,next)=>{
    try {
        const product_brands = await product_brand.delete(req.params.id);
        return res.send(product_brands)
    } catch (error) {
        next(error);
    }
}

