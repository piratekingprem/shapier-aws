const tests = require('../models/test');

exports.get_test = async(req,res,next) =>{
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const test = await tests.get_test();
        return res.send(test);
    } catch (error) {
        next(error);
    }

    return {message,code,data}
}

exports.store_test = async(req,res,next) =>{
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const test = await tests.store_test(req.body);
        return res.send(test);
    } catch (err) {
        next(err)
    }

    return {message,code,data};
}