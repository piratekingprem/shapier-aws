const db = require("../../config/db");

exports.store = async (params) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    console.log("params", params);
    console.log("params user id",params.userId)
    const payment_status = "complete";
    // const orders = await db.query(
    //   `INSERT INTO orders (order_id,user_id,total_amount,payment_mode,payment_status,bill_firstName,bil_lastName,bill_mobile,bill_address,bill_pincode,bill_city,bill_state,bill_email,gst_no) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[params.razorpay_order_id,params.]
    // );
    // const query = "INSERT INTO payment (order_id, payment_id, signature) VALUES (?, ?, ?)";
    // const values = [params.orderId, params.paymentId, params.signature];

    // // Assuming db.query is a function to execute SQL queries
    // const result = await db.query(query, values);

    // if (result.affectedRows > 0) {
    //   message = "Payment stored successfully";
    //   code = 200;
    //   data = { orderId: params.orderId, paymentId: params.paymentId, signature: params.signature };
    // }
  } catch (error) {
    message = error.message;
  }
  return { message, code, data };
};
