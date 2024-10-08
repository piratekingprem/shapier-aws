const products = require("../models/product");

exports.store_product = async (req, res, next) => {
  try {
    const product = await products.store_product(req.file,req.body);
    return res.send(product);
  } catch (error) {
    next(error);
  }
};

exports.get_product_id = async (req,res,next) =>{
  try {
    const product = await products.get_product_by_id(req.params.id);
    return res.send(product);
  } catch (error) {
    next(error);
  }
};
exports.get_product_by_brand_id = async (req,res,next) => {
  try {
    const product = await products.get_product_by_brands(req.params.brand_id);
    return res.send(product);
  } catch (error) {
    
  }
}
exports.get_subcategory_id = async (req,res,next) => {
  try {
    const product = await products.get_product_by_subcategory_id(req.params.subcategory_id);
    return res.send(product);
  } catch (error) {
    
  }
}

exports.get_product = async (req, res, next) => {
  try {
    const product = await products.get_product();
    return res.send(product);
  } catch (error) {
    next(error);
  }
};
exports.update_product = async (req,res,next)=>{
  try {
    const product = await products.update_product(req.params.id,req.file,req.body);
    return res.send(product);
  }
  catch (error) {
    next(error);
  }
}

exports.delete_product = async (req,res,next) =>{
  try {
    const product  = await products.delete_product(req.params.id);
    return res.send(product);
  } catch (error) {
    next(error);
  }
}