const assest = require('../models/assest');

exports.store_assest = async (req,res,next) => {
    try {
        const assests = await assest.store(req.file,req.body);
        return res.send(assests);
    } catch (error) {
        next(error);
    }
}

exports.get_assests = async (req,res,next) => {
    try {
        const assests = await assest.get();
        return res.send(assests);
    } catch (error) {
        next(error);
    }
}
exports.get_single_assests = async (req,res,next) => {
    try {
        const assests = await assest.get__by_id(req.params.id);
        return res.send(assests);
    } catch (error) {
        next(error);
    }
}