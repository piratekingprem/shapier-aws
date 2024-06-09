const bannersModel = require('../models/banners');

exports.store_banners = async (req,res,next) => {
    try {
        const banner = await bannersModel.store(req.file,req.body);
        return res.send(banner);
    } catch (error) {
        next(error);
    }
}

exports.get_banners = async (req,res,next) => {
    try {
        const banner = await bannersModel.get();
        return res.send(banner);
    } catch (error) {
        next(error);
    }
}

exports.get_banners_by_banner_category = async (req,res,next) => {
    try {
        const banner = await bannersModel.get_by_banner_category(req.params.banner_category);
        return res.send(banner);
    } catch (error) {
        next(error);
    }
}

exports.get_banners_by_id = async (req,res,next) => {
    try {
        const banner = await bannersModel.get_by_id(req.params.id);
        return res.send(banner);
    } catch (error) {
        next(error);
    }
}
