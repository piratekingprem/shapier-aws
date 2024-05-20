const db = require("../../config/db");

exports.store = async (params) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const carts = await db.query(
      `INSERT INTO cart(user_id,product_id,quantity) VALUES (?,?,?)`,
      [params.user_id, params.product_id, params.quantity]
    );
    (message = "Error in creating the cart"), (code = 400), (data = []);
    if (carts.affectedRows) {
      (message = "Cart created successfully"), (code = 201), (data = carts);
    }
  } catch (error) {
    message = error;
  }
  return { message, code, data };
};
exports.get = async () => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const carts = await db.query(
      `
        SELECT cart.*, product.product, product.product_image, product.product_price, product.product_description from cart LEFT JOIN product ON cart.product_id = product.id  ORDER BY cart.created_at DESC`,
      []
    );
    (message = "cart is empty"), (code = 400), (data = []);
    if (carts.length) {
      (message = "carts fetched successfully"), (code = 200), (data = carts);
    }
  } catch (error) {
    message = error;
  }
  return { message, code, data };
};
exports.get_by_id = async (id) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const carts = await db.query(
      `  SELECT cart.*, product.product, product.product_image, product.product_price, product.product_description from cart LEFT JOIN product ON cart.product_id = product.id WHERE cart.id = ${id} ORDER BY cart.created_at DESC`,
      []
    );
    (message = "cart is empty"), (code = 400);
    if (carts.length) {
      (message = "carts fetched successfully"), (code = 200), (data = carts);
    }
  } catch (error) {
    message = error;
  }
  return { message, code, data };
};
exports.get_by_cart_user_id = async (userId) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const carts = await db.query(
      `SELECT cart.*, product.product, product.product_image, product.product_price, product.product_description from cart LEFT JOIN product ON cart.product_id = product.id WHERE cart.user_id = ${userId} ORDER BY cart.created_at DESC`
    );
    (message = "cart is empty"), (code = 400);
    if (carts.length) {
      (message = "carts fetched successfully"), (code = 200), (data = carts);
    }
  } catch (error) {
    message = error;
  }
  return { message, code, data };
};
exports.update = async (id, params) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const carts = await db.query(
      `UPDATE cart SET user_id = ?,product_id = ?,quantity = ? WHERE id=${id}`,
      [params.user_id, params.product_id, params.quantity]
    );
    (message = "cart is empty"), (code = 400), (data = []);
    if (carts.affectedRows) {
      (message = "cart updated successfully"), (code = 200), (data = carts);
    }
  } catch (error) {
    message = error;
  }
  return { message, code, data };
};
exports.delete = async (id) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const carts = await db.query(`DELETE FROM cart WHERE id=${id}`, []);
    (message = "Error in deleting cart"), (code = 400), (data = []);
    if (carts.affectedRows) {
      (message = "cart deleted successfully"), (code = 200), (data = carts);
    }
  } catch (error) {
    message = error;
  }
  return { message, code, data };
};
