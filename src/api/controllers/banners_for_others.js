const banner_for_other_model = require('../models/banners_for_other');

exports.store_banners = async (req,res,next) => {
    try {
        const banner = await banner_for_other_model.store(req.file,req.body);
        return res.send(banner);
    } catch (error) {
        next(error);
    }
}

exports.get_banners = async (req,res,next) => {
    try {
        const banner = await banner_for_other_model.get();
        return res.send(banner);
    } catch (error) {
        next(error);
    }
}

exports.get_banners_by_banner_category = async (req,res,next) => {
    try {
        const banner = await banner_for_other_model.get_by_banner_category(req.params.banner_category);
        return res.send(banner);
    } catch (error) {
        next(error);
    }
}

exports.get_banners_by_id = async (req,res,next) => {
    try {
        const banner = await banner_for_other_model.get_by_id(req.params.id);
        return res.send(banner);
    } catch (error) {
        next(error);
    }
}
