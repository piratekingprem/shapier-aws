const request_serviceModel = require('../models/request_service');

exports.store_request_service = async (req,res,next) => {
    try {
        const request_service = await request_serviceModel.store(req.body);
        return res.send(request_service);
    } catch (error) {
        next(error);
    }
}

exports.get_request_service = async (req,res,next) => {
    try {
        const request_service = await request_serviceModel.get();
        return res.send(request_service);
    } catch (error) {
        next(error);
    }
}

exports.get_by_id_request_service = async (req,res,next) => {
    try {
        const request_service = await request_serviceModel.get_by_id(req.params.id);
        return res.send(request_service);
    } catch (error) {
        next(error);
    }
}