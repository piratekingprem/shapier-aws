const db = require("../../config/db");

exports.store_product = async (file, params) => {
  let message = "Something went wrong",
    code = 500,
    data = [];

  let image = file ? file.filename : null;
  let discount = params.discount ?? 0; // Assuming discount is a percentage
  let vandor_name = params.vandor_name ?? null;
  let assests_for = "product";
  let product_price = params.product_price ?? 0;
  let sale_price = product_price * (1 - discount / 100); // Calculate the sale price after discount
  let minimum_qauntity = params.minimum_qauntity ?? 1;
  let brand_id = params.brand_id ?? null;
  try {
    const assest = await db.query(
      `INSERT INTO assests(assests_image, assest_for) VALUES (?, ?)`,
      [image, assests_for]
    );

    if (!assest.affectedRows) {
      throw new Error("Error in inserting asset");
    }

    const product = await db.query(
      `INSERT INTO product(product, product_image, product_description, product_price, stock, vandor_name, discount, subcategory_id, sale_price, minimum_qauntity, per_base, brand_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        params.product,
        image,
        params.product_description,
        product_price,
        params.stock,
        vandor_name,
        discount,
        params.subcategory_id,
        sale_price,
        minimum_qauntity,
        params.per_base,
        brand_id
      ]
    );

    if (!product.affectedRows) {
      throw new Error("Error in creating product");
    }

    message = "Product is created successfully";
    code = 201;
    data = product;
  } catch (error) {
    message = error.message || error;
    code = 400;
    data = {};
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
            SELECT product.*, subcategories.subcategory_name, product_brands.product_brand_name from product
            LEFT JOIN subcategories ON product.subcategory_id = subcategories.subcategory_id 
            LEFT JOIN product_brands ON product.brand_id = product_brands.id
            ORDER BY product.created_at DESC`,
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

exports.get_product_by_search = async (query) =>{
  let message = "Something went wrong",
  code = 500,
  data = [];
try {
  const search = await db.query(
    `SELECT * FROM product WHERE product LIKE ? OR product_description LIKE ?`,
    [`%${query}%`, `%${query}%`]
  );

  if (!search.length) {
    message = "No Product Found";
    code = 400;
  } else {
    message = "Product fetched successfully";
    code = 200;
    data = search;
  }
} catch (error) {
  message = error.message || error;
}

return { message, code, data };
}
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

exports.get_product_by_subcategory_id = async (subcategory_id) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const product = await db.query(
      `SELECT product.*, subcategories.subcategory_name from product
    LEFT JOIN subcategories ON product.subcategory_id = subcategories.subcategory_id WHERE product.subcategory_id = ? ORDER BY product.created_at DESC`,
      [subcategory_id]
    );
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

exports.get_product_by_brands = async (brand_id) => {
  let message = "Something went wrong",
  code = 500,
  data = [];
  try {
    const product = await db.query(
      `  SELECT product.*, subcategories.subcategory_name, product_brands.product_brand_name from product
      LEFT JOIN subcategories ON product.subcategory_id = subcategories.subcategory_id 
      LEFT JOIN product_brands ON product.brand_id = product_brands.id
      WHERE product.brand_id = ?
      ORDER BY product.created_at DESC`,
      [brand_id]
    );
    (message = "Error in fetching the product"), (code = 400), (data = []);
    if (product.length) {
      message = "Product fetched successfully";
      code = 200;
      data = product;
    }
  } catch (error) {
    message = error;
  }

  return {message,code,data}
}
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
