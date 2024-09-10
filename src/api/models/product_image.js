const db = require('../../config/db');

exports.store = async (file,params) => {
    let message = "Something went wrong", code = 500, data = [];
    let image = file ? file.filename : null;
    try {
        const product = await db.query(
            `INSERT INTO product_image (product_id,image_url) VALUES (?,?)`,[params.product_id,image]
        )
        message = "Error in adding product image",code = 400,data = []
        if(product.affectedRows){
            message = "Product image added successfully",code = 201,data = product
        }
    } catch (error) {
        message = error;
    }
    return {message,code,data};
}

exports.get = async () =>{
    let message = "Something went wrong", code = 500, data = [];
    try {
        const product = await db.query(
            `SELECT * FROM product_image`,[]
        );
        message = "No product image found",code = 400,data = []
        if(product.length){
            message = "Product image found",code = 200,data = product
        }
    } catch (error) {
        message = error
    }
    return {message,code,data};
}

exports.get_id = async (id) => {
    let message = "Something went wrong", code = 500, data = [];
    try {
        const product = await db.query(
            `SELECT * FROM product_image WHERE id = ${id}`,[]
        );
        message = "No product image found",code = 400,data  = [];
        if(product.length){
            message = "Product image found",code = 200,data = product
        }
    } catch (error) {
        message = error;
    }
    return {message ,code,data};
}

exports.get_product_id = async (product_id) => {
    let message = "Something went wrong", code = 500, data = [];
    try {
        const product = await db.query(
            `SELECT * FROM product_image WHERE product_id = ${product_id}`,[]
        )
        message = "No product image found",code = 400,data = []
        if(product.length){
            message = "Product image found",code = 200,data = product
        }
    } catch (error) {
        message = error;
    }
    return {message,code,data};
}
exports.update = async (id,file,params) => {
    let message = "Something went wrong", code = 500, data = [];
    let image = file ? file.filename : null;
    try {
        const product = await db.query(
            `UPDATE product_image SET product_id = ?,image_url = ? WHERE id = ${id}`,[params.product_id,image]
        )
        message = "Error in adding product image",code = 400,data = [];
        if(product.affectedRows){
            message = "Product image updated successfully",code = 201,data = product
        }
    } catch (error) {
        message = error
    }
    return {message,code,data};
}

exports.delete = async (id) => {
    let message = "Something went wrong",code = 500,data = [];
    try {
        const product  = await db.query(
            `DELETE from product_image WHERE id = ${id}`,[]
        )
        message = "Error in deleting product image",code = 400,data = [];
        if(product.affectedRows){
            message = "Product image deleted successfully",code = 200,data = product
        }
    } catch (error) {
        message = error;
    }

    return {message,code,data};
}