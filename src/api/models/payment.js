const db = require("../../config/db");

exports.store = async (params) => {
  let message = "Something went wrong",
    code = 500,
    data = [];
  try {
    console.log(params.orderId); // Corrected property name
    // Assuming you need to store the data in the database
    // Example SQL query for inserting the payment record
    console.log(params)
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
