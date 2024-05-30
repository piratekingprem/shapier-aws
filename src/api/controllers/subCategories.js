const subcategories = require('../models/subcategories');


exports.store = async (req,res,next) => {
    try {
        const subcategory = await subcategories.store_subcategory(req.body);
        return res.send(subcategory);
    } catch (error) {
        next(error);
    }
}

exports.get = async (req,res,next) => {
    try {
        const subcategory = await subcategories.get_subcategory();
        return res.send(subcategory);
    } catch (error) {
        next(error);
    }
}

exports.get_by_id = async (req,res,next)=>{
    try {
        const subcategory = await subcategories.get_subcategory_by_id(req.params.id);
        return res.send(subcategory);
    } catch (error) {
        next(error)
    }
}

exports.get_by_category_name = async (req,res,next)=> {
    try {
        const subcategory = await subcategories.get_subcategory_by_category_name(req.params.category_name)
        return res.send(subcategory);
    } catch (error) {
        next(error);
    }
}

// console.log(subcategories.get_subcategory_by_category_name)