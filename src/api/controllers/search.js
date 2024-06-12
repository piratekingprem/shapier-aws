const serchModel = require('../models/search');

exports.search_products =  async (req,res,next) => {
    try {
        const products = await serchModel.get_search_product(req.query.q);
        return res.send(products);
    } catch (error) {
        next(error);
    }
 
}