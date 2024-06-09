const zip_check = require('../models/zip_check');

exports.store_zip = async (req,res,next) => {
    try {
        const zips = await zip_check.store(req.body);
        return res.send(zips);
    } catch (error) {
        next(error)
    }
}

exports.get_all_zips = async (req,res,next) => {
    try {
        const zips = await zip_check.get();
        return res.send(zips);
    } catch (error) {
        next(error);
    }
}
exports.check_zip_code = async (req,res,next) => {
    try {
        const zips = await zip_check.check_zip(req.params.zip);
        return res.send(zips);
    } catch (error) {
        next(error);
    }
}