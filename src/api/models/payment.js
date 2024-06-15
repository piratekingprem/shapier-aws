const db = require("../../config/db");

exports.store = async (params) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const payment_status = "complete";
    const total_amount = +params.amount;
    const paymentMode = params.paymentMode;
    const gst_no = params.gst_no ?? null;
    const productIds = params.productIds;
    for (let productId of productIds) {
      await db.query(
        `INSERT INTO orders_product (order_id, product_id) VALUES (?, ?)`,
        [params.razorpay_order_id, productId]
      );
    }
    const orders = await db.query(
      `INSERT INTO orders (order_id,user_id,total_amount,payment_mode,payment_status,bill_firstName,bil_lastName,bill_mobile,bill_address,bill_pincode,bill_city,bill_state,bill_email,gst_no) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        params.razorpay_order_id,
        params.userId,
        total_amount,
        paymentMode,
        payment_status,
        params.billingInfo.firstName,
        params.billingInfo.lastName,
        params.billingInfo.phone,
        params.billingInfo.address,
        params.billingInfo.pincode,
        params.billingInfo.city,
        params.billingInfo.state,
        params.billingInfo.email,
        gst_no,
      ]
    );
    (message = "Error in creating the product brand"),
      (code = 400),
      (data = []);
    if (product_brand.affectedRows) {
      message = "order creted successfully";
      code = 201;
      data = orders;
    }
  } catch (error) {
    message = error.message;
  }
  return { message, code, data };
};

exports.get = async () => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const order = await db.query(
      `SELECT 
        o.*,
        GROUP_CONCAT(p.product SEPARATOR ', ') AS product_names
      FROM 
        orders o
      JOIN 
        orders_product op ON o.order_id = op.order_id
      JOIN 
        product p ON op.product_id = p.id
      GROUP BY 
        o.id`,[]
);
    (message = "NO order available"), (code = 400), (data = []);
    if (order.length) {
      message = "order fetched successfully";
      code = 200;
      data = order
    }
  } catch (error) {
    message = error;
  }

  return {message,code,data};
};
