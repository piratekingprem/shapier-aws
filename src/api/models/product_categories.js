const db = require("../../config/db");

exports.store_product_categories = async (params) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const product_categories = await db.query(
      `INSERT INTO product_categories(product_category_name) VALUES (?)`,
      [params.product_category_name]
    );
    (message = "Error in creating the product category"),
      (code = 400),
      (data = []);
    if (product_categories.affectedRows) {
      (message = "Categories of product created successfully"),
        (code = 201),
        (data = product_categories);
    }
  } catch (error) {
    message = error;
  }

  return { message, code, data };
};

exports.get_product_category = async () => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const product_categories = await db.query(
      `SELECT * FROM product_categories`
    );
    (message = "Error in getting the product category"),
      (code = 400),
      (data = []);
    if (product_categories.length) {
      message = "categories of product fetched successfully";
      code = 200;
      data = product_categories;
    }
  } catch (error) {
    message = error;
  }

  return { message, code, data };
};
exports.get_product_category_by_id = async (id) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const product_categories = await db.query(
      `SELECT * FROM product_categories WHERE id=${id}`,
      []
    );
    (message = "Error in getting the product category"),
      (code = 400),
      (data = []);
    if (product_categories.length) {
      message = "categories of product fetched successfully";
      code = 200;
      data = [];
    }
  } catch (error) {
    message = error;
  }

  return { message, code, data };
};

exports.update_product_categories = async (id, params) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const product_categories = await db.query(
      `UPDATE product_categories SET product_category_name = ? WHERE id = ${id}`,
      [params.product_category_name]
    );
  } catch (error) {
    message = error;
  }

  return { message, code, data };
};

exports.delete_product_categories = async (id) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const product_categories = await db.query(
      `DELETE FROM product_categories WHERE id = ${id}`,
      []
    );
    (message = "Error in creating the product categories"),
      (code = 400),
      (data = []);
    if (product_categories.affectedRows) {
      (message = "Category deleted successfully"), (code = 200), (data = []);
    }
  } catch (error) {
    message = error;
  }

  return { message, code, data };
};
