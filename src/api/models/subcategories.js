const db = require('../../config/db')

exports.store_subcategory = async (params) => {
    let message = "Something went wrong",code = 500,data = [];
    try {
        const subcategory = await db.query(
            `INSERT INTO subcategories(subcategory_name, category_id) VALUES (?,?)`,[params.subcategory_name, params.category_id]
        );
        message= "Error in creating the subcategory",code=400,data={};
        if(subcategory.affectedRows){
            message="Subcategory is created successfully",
            code= 201,
            data = subcategory
        }
    } catch (error) {
        message = error;
   }

   return {message,code,data}
}

exports.get_subcategory = async () => {
    let message = "Something went wrong",code = 500,data = [];
    try {
        const subcategory = await db.query(
            `SELECT subcategories.*, product_categories.product_category_name from subcategories
            LEFT JOIN product_categories ON subcategories.category_id = product_categories.id ORDER By subcategories.created_at ASC`,[]
        )
        message= "Error in getting the subcategory",code=400,data={};
        if(subcategory.length){
            message= "Subcategories is fetched",
            code=200,
            data=subcategory
        }
    }
    catch(error){
        message = error;
    }
    return {message,code,data}
}

exports.get_subcategory_by_id = async () => {
    let message = "Something went wrong" ,code = 500, data = []
    try {
        const subcategories = await db.query(
            `SELECT * from subcategories WHERE id= ?`,[id]
        )
        message="No subcateogory found" ,code = 400,data = [];
        if(subcategories.length){
            message= "Subcategories is fetched",
            code=200,
            data=subcategories
        }
    } catch (error) {
        message= error;
    }
    return {message,code,data};
}

exports.get_subcategory_by_category_name = async (category_name) => {
    let message = "Something went wrong",code = 500, data = []
    try {
        const subcategories = await db.query(
            `SELECT subcategories.*, product_categories.product_category_name from subcategories
            LEFT JOIN product_categories ON subcategories.category_id = product_categories.id WHERE product_category_name = ? ORDER By subcategories.created_at ASC`,[category_name]
        )
        message="No subcategory found",code = 400, data = [];
        if(subcategories.length){
            message= "Subcategories is fetched",
            code=200,
            data=subcategories
        }
    } catch (error) {
        message=error;
    }
    return {message,code,data}
}