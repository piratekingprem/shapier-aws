const db = require("../../config/db");

exports.store = async (params) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    const payment = await db.query(
      `INSERT INTO payments(razorpay_order_id, razorpay_payment_id, razorpay_signature) VALUES(?,?,?)`,
      [
        params.razorpay_order_id,
        params.razorpay_payment_id,
        params.razorpay_signature,
      ]
    );
    (message = "Error in creating payment"), (code = 400), (data = []);
    if (payment.affectedRows) {
        message = "Payment creted successfully";
        code = 201;
        data = payment;
    }
  } catch (error) {
    message = error;
  }
  return {message,code,data};
};
