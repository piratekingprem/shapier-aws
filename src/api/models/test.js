const db = require('../../config/db')

exports.get_test = async () => {
    let message = 'Something went wrong', code = 500, data = [];
    try{
        const test = await db.query(
            `SELECT * FROM test`,[0]
        );
        message = "No Test found", code = 404, data = [];
        if (test.length){
            message = "Test list fetched successfully";
            code =  200;
            data = test
        }
    } catch(err){
        message = err;
    }

    return {message, code, data};
}

exports.store_test = async (params) =>{
    let message = 'Something went wrong', code = 500, data = [];
    try{
        const test = await db.query(
            `INSERT into test(tester_name) VALUES (?)`,[params.tester_name]
        );
        
        message = 'Error in creating salary',code = 400, data = {};
        if(test.affectedRows){
            message = 'Test created succesfully',
            data = test,
            code = 201
        }
    }
    catch(err){
        message = err;
    }

    return { message, data, code};
}