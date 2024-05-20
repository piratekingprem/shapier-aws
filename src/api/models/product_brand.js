const { errorMonitor } = require('nodemailer/lib/xoauth2');
const db = require('../../config/db');

exports.get = async () =>{
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const product_brand = await db.query('SELECT * FROM product_brands',[]);
        message = 'NO Brands available', code = 400, data = [];
        if(product_brand.length){
            message = 'Brnads fetched successfully',
            code = 200,
            data = product_brand
        }
    } catch (error) {
        message = error;
    }

    return {message,code,data}
}

exports.store = async (file,params) => {
    let message = 'Something went wrong', code = 500, data = [];
    var image = null;
    if(file){
        image = file.filename
    }
    try {
        const product_brand = await db.query(`INSERT INTO product_brands(product_brand_name,product_image) VALUES (?,?)`,[params.product_brand_name,image])
        message = 'Error in creating the product brand',code = 400, data = [];
        if(product_brand.affectedRows){
            message = "Brand creted successfully";
            code = 201;
            data = product_brand
        }
    } catch (error) {
        message = error
    } 

    return {message,code,data}
}

exports.get_by_id = async (id) =>{
    let message = 'Something went wrong',code = 500, data = [];
    try {
        const product_brand = await db.query(`SELECT * FROM product_brands WHERE id=${id}`,[]);
        message = 'NO Brands available', code = 400, data = [];
        if(product_brand.length){
            message = 'Brnads fetched successfully',
            code = 200,
            data = product_brand
        }
    } catch (error) {
        message = error;
    }
    
    return {message,code,data};
}

exports.update = async (id,params)=>{
    let message = 'Something went wrong',code = 500;
    try {
        const product_brand = await db.query(`UPDATE product_brands SET product_brand_name = ?, product_image = ? WHERE id=${id}`,[params.product_brand_name,params.product_image])
        message = 'Errror in updating the product brands',code = 400, data = []
        if(product_brand.affectedRows){
            message = 'Successfully updated the brand',
            code = 200,
            data = product_brand
        }
    }
    catch(error){
        message = error
    }

    return {message,code,data};
}

exports.delete = async (id)=>{
    let message = 'Something went wrong',code = 500
    try {
        let product_brand = await db.query(`DELETE FROM product_brands WHERE id=${id}`,[]);
        message = 'Error in deleting the product brand',code = 400,data = [];
        if(product_brand.affectedRows){
            message = 'Successfully deleted the product brand',
            code = 200,
            data = product_brand
        }
    } catch (error) {
        message = error;
    }

    return {message,code,data};
}