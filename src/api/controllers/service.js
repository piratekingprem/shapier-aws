const serviceModel  = require('../models/service');

exports.store = async (req,res,next) => {
    try {
        const service = await serviceModel.store_service(req.file,req.body);
        return res.send(service);
    } catch (error) {
        next(error);   
    }
}

exports.get = async (req,res,next) => {
    try{
        const service = await serviceModel.get_service();
        return res.send(service);
    }catch (error) {
        next(error);
    }
}

exports.get_by_id = async (req,res,next) => {
    try {
        const service = await serviceModel.get_service_by_id(req.params.id);
        return res.send(service);
    } catch (error) {
        next(error);
    }
}