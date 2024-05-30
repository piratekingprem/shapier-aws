const db = require("../../config/db");

exports.store_product = async (file, params) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  var image = null;
  var discount = params.discount ?? null;
  var vandor_name = params.vandor_name ?? null;
  var assests_for = "product";
  if (file) {
    image = file.filename;
  }

  try {
    const assest = await db.query(
      `INSERT INTO assests(assests_image,assest_for) VALUES (?,?)`,
      [image, assests_for]
    );
    const product = await db.query(
      `INSERT INTO product(product,product_image,product_description, product_price,stock,vandor_name,discount,subcategory_id) VALUES (?,?,?,?,?,?,?,?)`,
      [
        params.product,
        image,
        params.product_description,
        params.product_price,
        params.stock,
        vandor_name,
        discount,
        params.subcategory_id,
      ]
    );
    (message = "Error in creating product"), (code = 400), (data = {});
    if (product.affectedRows) {
      (message = "Product is created successfully"),
        (code = 201),
        (data = product);
    }
  } catch (error) {
    message = error;
  }

  return { message, code, data };
};

exports.get_product = async () => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const product = await db.query(
      `
            SELECT product.*, subcategories.subcategory_name from product
            LEFT JOIN subcategories ON product.subcategory_id = subcategories.subcategory_id ORDER BY product.created_at DESC`,
      []
    );
    (message = "No Product Found"), (code = 400), (data = []);
    if (product.length) {
      (message = "Product list is fetched successfully"),
        (code = 200),
        (data = product);
    }
  } catch (error) {
    message = error;
  }

  return { message, code, data };
};

exports.get_product_by_id = async (id) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const product = await db.query(`SELECT * from product WHERE id = ?`, [id]);
    (message = "Error in fetching the product"), (code = 400), (data = []);
    if (product.length) {
      message = "Product fetched successfully";
      code = 200;
      data = product;
    }
  } catch (error) {
    message = error;
  }

  return { message, code, data };
};
exports.update_product = async (id, file, params) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  var image = null;
  var discount = params.discount ?? null;
  var vandor_name = params.vandor_name ?? null;
  var assests_for = "product";
  if (file) {
    image = file.filename;
  }
  try {
    const product = await db.query(
      `UPDATE product SET product = ?,product_image = ?, product_description = ?, product_price = ?,stock = ?,vandor_name = ?,discount = ?,subcategory_id  = ? WHERE id = ${id}`,
      [
        params.product,
        image,
        params.product_description,
        params.product_price,
        params.stock,
        vandor_name,
        discount,
        params.subcategory_id,
      ]
    );

    (message = "Error in updating the product"), (code = 400), (data = []);

    if (product.affectedRows) {
      message = "The product is been updated successfully";
      code = 200;
      data = product;
    }
  } catch (error) {
    message = error;
  }

  return { message, code, data };
};

exports.delete_product = async (id) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const product = await db.query(`DELETE FROM product WHERE id = ${id}`, []);
    (message = "Error in updating the product"), (code = 400), (data = []);
    if (product.affectedRows) {
      (message = "The product is been deleted successfully"),
        (code = 200),
        (data = product);
    }
  } catch (error) {
    message = error;
  }
  return { message, code, data };
};
