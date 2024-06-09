const db = require('../../config/db')

exports.store = async (params) => {
    let message = "Something is wrong", code = 500, data = [];
    try {
        const zip = await db.query(
            `INSERT INTO zip_check(zip) VALUES(?)`,[params.zip]
        );
        message = "Error in creating user", code = 404, data = [];
        if(zip.affectedRows){
            message = "Zip creted successfully",
            code = 201,
            data = zip
        }
    } catch (error) {
        message = error;
    }
    return {message,code,data};
}
exports.get = async () => {
    let message = "Something is wrong", code = 500, data = [];
    try {
        const zip = await db.query(
            `SELECT * FROM zip_check`,[]
        );
        message = "NO zip code found", code = 404, data = [];
        if(zip.length){
            message = "Zip fetched successfully",
            code = 200,
            data = zip
        }
    } catch (error) {
        message = error;
    }
    return {message,code,data};
}
exports.check_zip = async (zip) => {
    let message = "Something is wrong", code = 500, data = [],availbility = 0;
    try {
        const zips = await db.query(
            `SELECT * FROM zip_check WHERE zip = ${zip}`,[]
        );
        message = "NO zip code found", code = 404, data = [],availbility = 0;
        if(zips.length){
            message = "Zip fetched successfully",
            code = 200,
            data = zips,
            availbility = 1
        }
    } catch (error) {
        message = error;
    }
    return {message,code,data,availbility};
}